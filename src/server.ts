/**
 * Node.js HTTP server entrypoint.
 * Uses @hono/node-server to run the Hono app on a standard Node.js server.
 * This file is only used for local development and self-hosted deployments.
 * For Vercel, use the serverless handler export in api/index.ts instead.
 *
 * Environment variables are loaded automatically via the --env-file=.env
 * flag in the "dev" and "start" scripts (Node.js 20.6+ feature).
 *
 * @author Nayan Das <https://github.com/nayandas69>
 */

import { serve } from '@hono/node-server';
import http from 'http';
import app from './app.js';

/** Base port to listen on (defaults to 3000) */
const rawPort = process.env['PORT'];
const parsedPort = rawPort !== undefined ? Number(rawPort) : 3000;
const basePort = Number.isFinite(parsedPort) && parsedPort > 0 ? parsedPort : 3000;

/** Graceful shutdown handler */
function handleShutdown() {
  console.log('Received shutdown signal. Gracefully shutting down...');
  process.exit(0);
}

/**
 * Finds an available port by attempting to bind to sequential ports
 * if the base port is already in use.
 */
function findAvailablePort(port: number): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = http.createServer();

    server.once('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE') {
        void findAvailablePort(port + 1).then(resolve, reject);
      } else {
        reject(err);
      }
    });

    server.once('listening', () => {
      server.close(() => resolve(port));
    });

    server.listen(port);
  });
}

/**
 * Start the server on an available port
 */
(async () => {
  try {
    const availablePort = await findAvailablePort(basePort);

    serve({ fetch: app.fetch, port: availablePort }, () => {
      console.log(`GitHub Profile Card API running on http://localhost:${availablePort}`);
      console.log(`Environment: ${process.env['NODE_ENV'] || 'development'}`);

      if (availablePort !== basePort) {
        console.warn(
          `Port ${basePort} was in use, using ${availablePort} instead. Set PORT env var to use a specific port.`
        );
      }
    });

    // Handle graceful shutdown
    process.on('SIGTERM', handleShutdown);
    process.on('SIGINT', handleShutdown);

    // Handle uncaught exceptions
    process.on('uncaughtException', (err) => {
      console.error('Uncaught Exception:', err);
      process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
      process.exit(1);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();
