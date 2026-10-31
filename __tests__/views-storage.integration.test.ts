import { execFile, execFileSync, spawn, type ChildProcess } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { createServer, type Server } from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { promisify } from 'node:util';
import { expect, it } from 'vitest';
import {
  incrementProfileViews,
  MAX_PROFILE_VIEW_COUNTERS,
  ProfileViewAdmissionLimitError,
} from '../src/services/views.js';

const execFileAsync = promisify(execFile);

/** Encode synthetic commands for redis-cli's pipe mode, avoiding shell arguments and limits. */
function encodeCommand(args: string[]): string {
  return `*${args.length}\r\n${args.map((arg) => `$${Buffer.byteLength(arg)}\r\n${arg}\r\n`).join('')}`;
}

/** Wait for the isolated local Redis instance; fail promptly if startup fails. */
async function waitForRedis(socket: string, child: ChildProcess): Promise<void> {
  for (let attempt = 0; attempt < 100; attempt++) {
    if (child.exitCode !== null) throw new Error('Test Redis server exited during startup');
    try {
      const { stdout } = await execFileAsync('redis-cli', ['-s', socket, 'PING'], {
        timeout: 1000,
      });
      if (stdout.trim() === 'PONG') return;
    } catch {
      await delay(50);
    }
  }
  throw new Error('Test Redis server did not become ready');
}

it('enforces the 100000 counter limit against a stateful Redis server', async () => {
  expect(MAX_PROFILE_VIEW_COUNTERS).toBe(100_000);
  const directory = mkdtempSync(join(tmpdir(), 'profile-redis-'));
  const socket = join(directory, 'redis.sock');
  let redis: ChildProcess | undefined;
  let bridge: Server | undefined;

  try {
    redis = spawn(
      'redis-server',
      [
        '--port',
        '0',
        '--unixsocket',
        socket,
        '--unixsocketperm',
        '700',
        '--save',
        '',
        '--appendonly',
        'no',
        '--dir',
        directory,
      ],
      { stdio: 'ignore' }
    );
    await new Promise<void>((resolve, reject) => {
      redis!.once('spawn', resolve);
      redis!.once('error', reject);
    });
    await waitForRedis(socket, redis);

    // The SDK speaks Upstash REST. This test-only bridge forwards its actual
    // commands to the isolated Redis process and returns the real Redis results.
    bridge = createServer(async (request, response) => {
      try {
        let body = '';
        for await (const chunk of request) body += String(chunk);
        const parsed: unknown = JSON.parse(body);
        if (!Array.isArray(parsed)) throw new Error('Expected Redis command array');
        const pipelined = Array.isArray(parsed[0]);
        const commands: unknown[] = pipelined ? parsed : [parsed];
        const results = await Promise.all(
          commands.map(async (command) => {
            if (!Array.isArray(command) || command[0] !== 'eval')
              throw new Error('Unexpected command');
            const args = command.map(String);
            const { stdout } = await execFileAsync('redis-cli', ['-s', socket, '--json', ...args], {
              timeout: 5000,
            });
            return { result: JSON.parse(stdout) as unknown };
          })
        );
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(pipelined ? results : results[0]));
      } catch (error) {
        response.writeHead(500, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: String(error) }));
      }
    });
    await new Promise<void>((resolve, reject) => {
      bridge!.once('error', reject);
      bridge!.listen(0, '127.0.0.1', resolve);
    });
    const address = bridge.address();
    if (!address || typeof address === 'string') throw new Error('Missing test bridge address');
    process.env['UPSTASH_REDIS_REST_URL'] = `http://127.0.0.1:${address.port}`;
    process.env['UPSTASH_REDIS_REST_TOKEN'] = 'test-only-token';

    // Concurrent admissions share one budget, while admitted counters remain usable.
    const admissions = await Promise.allSettled(
      Array.from({ length: 20 }, (_, i) => incrementProfileViews(`candidate${i}`))
    );
    expect(admissions.filter((result) => result.status === 'fulfilled')).toHaveLength(10);
    expect(admissions.filter((result) => result.status === 'rejected')).toHaveLength(10);
    for (const result of admissions) {
      if (result.status === 'rejected')
        expect(result.reason).toBeInstanceOf(ProfileViewAdmissionLimitError);
    }
    const admittedIndex = admissions.findIndex((result) => result.status === 'fulfilled');
    expect(await incrementProfileViews(`candidate${admittedIndex}`)).toBe(2);
    await expect(incrementProfileViews('blocked')).rejects.toBeInstanceOf(
      ProfileViewAdmissionLimitError
    );
    execFileSync('redis-cli', ['-s', socket, 'HSET', 'profile-views:v2', ':admission-start', '0']);
    expect(await incrementProfileViews('next-window')).toBe(1);

    // Reset synthetic state, then leave one slot free and fill the last slot.
    execFileSync('redis-cli', ['-s', socket, 'DEL', 'profile-views:v2']);
    const commands: string[] = [];
    for (let start = 0; start < MAX_PROFILE_VIEW_COUNTERS - 1; start += 1000) {
      const fields: string[] = [];
      for (let i = start; i < Math.min(start + 1000, MAX_PROFILE_VIEW_COUNTERS - 1); i++) {
        fields.push(`user${i}`, '1');
      }
      commands.push(encodeCommand(['HSET', 'profile-views:v2', ...fields]));
    }
    execFileSync('redis-cli', ['-s', socket, '--pipe'], {
      input: commands.join(''),
      timeout: 20_000,
    });
    expect(await incrementProfileViews('last-slot')).toBe(1);
    expect(
      execFileSync('redis-cli', ['-s', socket, '--raw', 'HLEN', 'profile-views:v2'], {
        encoding: 'utf8',
      }).trim()
    ).toBe('100002');

    await expect(incrementProfileViews('one-too-many')).rejects.toThrow(
      'Profile view count unavailable'
    );
    expect(await incrementProfileViews('USER0')).toBe(2);
    expect(
      execFileSync(
        'redis-cli',
        ['-s', socket, '--raw', 'HEXISTS', 'profile-views:v2', 'one-too-many'],
        { encoding: 'utf8' }
      ).trim()
    ).toBe('0');
    expect(
      execFileSync('redis-cli', ['-s', socket, '--raw', 'HGET', 'profile-views:v2', 'user0'], {
        encoding: 'utf8',
      }).trim()
    ).toBe('2');
    expect(
      execFileSync('redis-cli', ['-s', socket, '--raw', 'HLEN', 'profile-views:v2'], {
        encoding: 'utf8',
      }).trim()
    ).toBe('100002');
  } finally {
    if (bridge?.listening) await new Promise<void>((resolve) => bridge!.close(() => resolve()));
    if (redis && redis.exitCode === null && redis.pid) {
      const stopped = new Promise<void>((resolve) => redis!.once('exit', () => resolve()));
      redis.kill('SIGTERM');
      await stopped;
    }
    rmSync(directory, { recursive: true, force: true });
  }
}, 30_000);
