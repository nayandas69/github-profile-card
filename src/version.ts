/**
 * Single source of truth for the app version (matches package.json).
 * Resolves package.json next to this module first, then cwd (serverless / monorepos).
 */

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

function readPackageVersion(): string {
  const moduleDir = dirname(fileURLToPath(import.meta.url));
  const candidates = [
    join(moduleDir, '../package.json'),
    join(moduleDir, '../../package.json'),
    join(process.cwd(), 'package.json'),
  ];
  for (const p of candidates) {
    if (!existsSync(p)) continue;
    const v = (JSON.parse(readFileSync(p, 'utf8')) as { version?: string }).version;
    if (typeof v === 'string' && v.length > 0) return v;
  }
  throw new Error('Could not read version from package.json');
}

export const APP_VERSION = readPackageVersion();
