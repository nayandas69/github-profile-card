/**
 * Hono application definition.
 * Defines all HTTP routes for the GitHub Profile Card API.
 * Separated from the server entrypoint so it can be imported
 * for testing or deployed as a serverless function.
 *
 * @author Nayan Das <https://github.com/nayandas69>
 */

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { getProfileData, renderCard } from './services/index.js';
import { themes } from './utils/themes.js';

/** Create the Hono app instance */
const app = new Hono();

/* --- Middleware --- */

// Enable CORS so cards can be embedded anywhere
app.use('*', cors());

// Logger middleware for debugging and monitoring
app.use('*', async (c, next) => {
  const start = Date.now();
  await next();
  const duration = Date.now() - start;
  console.log(`[${c.req.method}] ${c.req.path} - ${c.res.status} - ${duration}ms`);
});

/* --- Helper Functions --- */

/** Validates GitHub username format (alphanumeric, hyphens, underscores) */
function isValidGitHubUsername(username: string): boolean {
  return /^[a-zA-Z0-9_-]{1,39}$/.test(username);
}

/** Validates hex color format (with or without #) */
function isValidHexColor(color: string): boolean {
  return /^#?[0-9a-fA-F]{6}$/.test(color);
}

/* --- Routes --- */

/**
 * GET /
 * API information and available themes listing.
 */
app.get('/', (c) => {
  return c.json({
    name: 'GitHub Profile Card API',
    version: '0.1.1',
    author: 'Nayan Das (https://github.com/nayandas69)',
    usage: 'GET /card/:username',
    themes: Object.keys(themes),
    repository: 'https://github.com/nayandas69/github-profile-card',
  });
});

/**
 * GET /card/:username
 * Generates and returns an SVG profile card for the given GitHub username.
 *
 * Query parameters:
 *   - theme: Theme name (e.g. "github_dark", "dracula")
 *   - title_color, text_color, icon_color, bg_color, border_color: Hex colors (without #)
 *   - hide_border: "true" to remove the card border
 *   - compact: "true" to hide bio, pronouns, twitter, and language labels
 *   - fields: Comma-separated list ("languages", "stats", "all")
 */
app.get('/card/:username', async (c) => {
  try {
    const username = c.req.param('username');

    // Validate username format
    if (!username || !isValidGitHubUsername(username)) {
      return c.json(
        {
          error:
            'Invalid GitHub username. Username must be 1-39 characters and contain only alphanumeric characters, hyphens, or underscores.',
        },
        400
      );
    }

    const query = c.req.query();

    // Validate color parameters if provided
    const colorParams = ['title_color', 'text_color', 'icon_color', 'bg_color', 'border_color'];
    for (const param of colorParams) {
      const color = query[param];
      if (color && !isValidHexColor(color)) {
        return c.json({ error: `Invalid hex color for ${param}: ${color}` }, 400);
      }
    }

    // Parse optional fields filter
    const fields = query['fields']
      ? new Set(
          query['fields']
            .split(',')
            .map((v) => v.trim().toLowerCase())
            .filter(Boolean)
        )
      : null;

    // Determine if we need to fetch language data
    const includeLanguages =
      !fields || fields.has('all') || fields.has('languages') || fields.has('langs');

    // Fetch profile data (with multi-layer caching)
    const data = await getProfileData(username, { includeLanguages });

    /**
     * Render the SVG card with optional theme/color overrides.
     * [Fix] Issue #3 Bug 3 - Pass the parsed `fields` set to renderCard()
     * so it can conditionally show/hide the stats row and language section.
     * Previously `fields` was parsed here but never forwarded, so the card
     * always rendered every section regardless of what the user requested.
     */
    const svg = renderCard(data.user, data.stats, data.languages, {
      theme: query['theme'],
      title_color: query['title_color'],
      text_color: query['text_color'],
      icon_color: query['icon_color'],
      bg_color: query['bg_color'],
      border_color: query['border_color'],
      hide_border: query['hide_border'] === 'true',
      compact: query['compact'] === 'true',
      fields,
    });

    // Return SVG with aggressive caching headers
    return c.body(svg, 200, {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=0, s-maxage=1800, stale-while-revalidate=1800',
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      const message = err.message;

      // GitHub API user not found error
      if (message.includes('User not found')) {
        return c.json({ error: `GitHub user "${c.req.param('username')}" not found` }, 404);
      }

      // GitHub API rate limit error
      if (message.includes('API rate limit exceeded')) {
        return c.json({ error: 'GitHub API rate limit exceeded. Please try again later.' }, 429);
      }

      // GitHub token missing error
      if (message.includes('GITHUB_TOKEN')) {
        console.error('GITHUB_TOKEN not configured');
        return c.json(
          { error: 'Server configuration error. Please contact the administrator.' },
          500
        );
      }

      // Other GitHub API errors
      if (message.includes('GitHub API error')) {
        return c.json({ error: 'GitHub API error. Please try again later.' }, 503);
      }

      return c.json({ error: message }, 500);
    }

    return c.json({ error: 'An unexpected error occurred' }, 500);
  }
});

/**
 * GET /health
 * Simple health check endpoint for monitoring and uptime pings.
 */
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default app;
