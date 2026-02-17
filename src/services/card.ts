/**
 * SVG card renderer.
 * Takes profile data and theme options, and outputs a complete SVG string
 * that can be served as an image or embedded in Markdown.
 *
 * @author Nayan Das <https://github.com/nayandas69>
 */

import type { CardOptions, LanguageStat, UserProfile, UserStats } from '../types/index.js';
import { escapeXml, icon, kFormat, resolveColors } from '../utils/index.js';

/**
 * Renders a GitHub profile card as an SVG string.
 *
 * @param user  - User profile (name, avatar, bio, etc.)
 * @param stats - Aggregated stats (stars, commits, repos, PRs, issues)
 * @param langs - Top programming languages with sizes and colors
 * @param opts  - Visual customization (theme, colors, compact mode)
 * @returns     Complete SVG markup as a string
 */
export function renderCard(
  user: UserProfile,
  stats: UserStats,
  langs: LanguageStat[],
  opts: CardOptions = {}
): string {
  // Validate inputs
  if (!user?.login) throw new Error('Invalid user data: missing login');
  if (!stats) throw new Error('Invalid stats data');

  // Resolve theme colors (base theme + user overrides)
  const c = resolveColors(opts);
  const hideBorder = opts.hide_border ?? false;
  const compact = opts.compact ?? false;

  /**
   * [Fix] Issue #3 Bug 3 - Determine which sections to render based on
   * the `fields` query param. When `fields` is null (not provided) or
   * contains "all", every section is shown (backwards-compatible default).
   * Otherwise only the sections explicitly listed are rendered.
   * Previously `fields` only controlled data fetching; the card always
   * rendered both stats and languages regardless of the user's request.
   */
  const fields = opts.fields ?? null;
  const showAll = !fields || fields.has('all');
  const showStats = showAll || fields.has('stats');
  const showLanguages = showAll || fields.has('languages') || fields.has('langs');

  /* --- Escape user-provided text for safe SVG embedding --- */
  const name = escapeXml(user.name || user.login);
  const uname = escapeXml(user.login);
  const bioRaw = !compact && user.bio ? escapeXml(user.bio) : '';
  // Single-line bio: truncate at 40 characters with ellipsis if longer
  const bioLine = bioRaw ? (bioRaw.length > 40 ? bioRaw.slice(0, 40) + '\u2026' : bioRaw) : '';
  const pronouns = !compact && user.pronouns ? escapeXml(user.pronouns) : '';
  const avatarSource = user.avatarDataUrl || user.avatarUrl;
  const avatar = avatarSource?.replace(/&/g, '&amp;') || 'data:image/svg+xml,%3Csvg%3E%3C/svg%3E';
  const twitter = !compact && user.twitter ? escapeXml(user.twitter) : '';

  /* --- Layout constants --- */
  const W = 500; // Card width
  const P = 22; // Padding
  const avatarSize = 72;
  const barWidth = W - P * 2; // Language bar spans full width minus padding
  const infoX = P + avatarSize + 16; // X offset for text next to avatar

  /**
   * [Fix] Issue #3 Bug 4 - Dynamically calculate the card height based on
   * which optional content sections are present (bio lines, pronouns,
   * twitter handle, stats row, language bar + labels).
   * Previously H was hardcoded to 200px which clipped content when users
   * had long bios, pronouns, or a twitter handle displayed simultaneously.
   *
   * Layout stacking (top to bottom):
   *   - Top padding (P = 22)
   *   - Avatar + name/username block (avatarSize = 72)
   *   - Gap after avatar section (12)
   *   - Stats row if shown (~40: icons + labels)
   *   - Gap before language section (12)
   *   - "Top Languages" heading + bar (8) + gap (8) = ~24
   *   - Language labels row (~16)
   *   - Bottom padding (P = 22)
   */
  // Extra vertical space when the X/Twitter handle is shown
  let cursorY = P + avatarSize + (twitter ? 20 : 12); // After avatar + name section

  // Account for bio lines rendered in the avatar-adjacent area
  // (bio renders beside the avatar, but if it's long it may push the
  // content area taller than the avatar itself -- we account for that later)

  // Stats row height
  if (showStats) {
    cursorY += 40; // icon row (16) + stat-label below (24)
  }

  // Gap between stats and language section
  if (showStats && showLanguages) {
    cursorY += 12;
  }

  // Language section: heading (18) + bar (8) + gap between bar and labels (8)
  if (showLanguages) {
    cursorY += 18 + 8;
    // Language labels (only in non-compact mode with languages present)
    if (!compact && langs.length > 0) {
      cursorY += 20; // labels row
    }
  }

  // Bottom padding
  cursorY += P;

  const H = Math.max(cursorY, compact ? 120 : 160); // Minimum height for visual balance

  const barY = H - (!compact && langs.length > 0 ? 40 : 24); // Y position of the language bar
  const labelY = H - 16; // Y position of the language labels

  /* --- Language bar segments (proportional widths) --- */
  const totalSize = langs.reduce((sum, l) => sum + l.size, 0) || 1;
  let offset = 0;
  const langRects = langs
    .map((lang) => {
      const w = (lang.size / totalSize) * barWidth;
      const r = `<rect x="${P + offset}" y="${barY}" width="${w}" height="8" fill="${lang.color}"/>`;
      offset += w;
      return r;
    })
    .join('');

  /**
   * [Fix] Issue #3 Bug 5 - Two-pass fit-all label layout.
   *
   * Previously labels were evenly spaced by `barWidth / langs.length`, so
   * long names like "TypeScript 45%" would overlap the next label. The first
   * attempted fix skipped labels that overflowed, but that hid languages
   * entirely (e.g. "Jupyter Notebook 4%" disappeared).
   *
   * New approach (two-pass fit-all):
   *   Pass 1 - Try rendering all labels at full name length. If the total
   *            estimated width fits within barWidth, use them as-is.
   *   Pass 2 - If they don't fit, progressively reduce the max allowed
   *            name characters (uniformly across all labels) until they fit.
   *            Minimum name length is 2 chars + ellipsis (e.g. "Ty...").
   *
   * Rules:
   *   - Every language is ALWAYS shown (never hidden/skipped)
   *   - Percentage is NEVER truncated (e.g. "41%" always visible)
   *   - Only the language name gets shortened when needed
   *   - All labels share the same max name length for uniform appearance
   *   - The colored dot is always present
   */
  const CHAR_WIDTH = 6.2; // Approximate width per character at font-size 10px
  const DOT_GAP = 18; // Colored circle (r=4 -> 8px) + padding to text start
  const LABEL_PAD = 8; // Minimum padding between adjacent labels
  const MIN_NAME_LEN = 2; // Shortest a name can be truncated to (+ ellipsis)

  /**
   * Builds label text for a language, truncating the name to maxNameLen
   * characters if it exceeds that limit. Returns the display string.
   */
  function buildLabelText(name: string, pct: string, maxNameLen: number): string {
    if (name.length <= maxNameLen) return `${name} ${pct}%`;
    return `${name.slice(0, maxNameLen)}\u2026 ${pct}%`;
  }

  /**
   * Estimates the total pixel width needed to render all labels at a
   * given maxNameLen. Used by the two-pass loop to find the best fit.
   */
  function estimateTotalWidth(maxNameLen: number): number {
    return langs.reduce((total, lang) => {
      const pct = ((lang.size / totalSize) * 100).toFixed(0);
      const text = buildLabelText(lang.name, pct, maxNameLen);
      return total + DOT_GAP + text.length * CHAR_WIDTH + LABEL_PAD;
    }, 0);
  }

  let langLabels = '';
  if (!compact && langs.length > 0) {
    // Find the longest language name to use as the starting point
    const longestName = Math.max(...langs.map((l) => l.name.length));

    // Pass 1 & 2: Start from full length, shrink until labels fit
    let maxNameLen = longestName;
    while (maxNameLen > MIN_NAME_LEN && estimateTotalWidth(maxNameLen) > barWidth) {
      maxNameLen--;
    }

    // Render all labels at the computed maxNameLen (every label is shown)
    let labelX = P;
    langLabels = langs
      .map((lang) => {
        const pct = ((lang.size / totalSize) * 100).toFixed(0);
        const labelText = buildLabelText(lang.name, pct, maxNameLen);
        const textWidth = labelText.length * CHAR_WIDTH;
        const slotWidth = DOT_GAP + textWidth + LABEL_PAD;

        const cx = labelX + 5; // Circle center x
        const tx = labelX + DOT_GAP - 5; // Text start x
        const svg = `<circle cx="${cx}" cy="${labelY}" r="4" fill="${lang.color}"/><text x="${tx}" y="${labelY + 4}" class="lang">${labelText}</text>`;
        labelX += slotWidth; // Advance cursor for the next label
        return svg;
      })
      .join('');
  }

  /* --- Vertical positions for profile info --- */
  const nameY = P + 22;
  const usernameY = nameY + 18;
  const bioY = usernameY + 14;
  const twitterY = bioLine ? bioY + 16 : usernameY + 16;

  /* --- Font stack --- */
  const fontFamily =
    'ui-sans-serif, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial';
  // Push the stats row down when the X handle is visible, so it doesn't overlap
  const headerY = P + avatarSize + (twitter ? 20 : 12);
  const statLabelY = 28;

  /* --- Build the SVG --- */
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="optimizeLegibility" image-rendering="optimizeQuality">
    <title>${name}'s GitHub Stats</title>
    <defs>
      <clipPath id="a"><circle cx="${P + avatarSize / 2}" cy="${P + avatarSize / 2}" r="${avatarSize / 2}"/></clipPath>
      <clipPath id="b"><rect x="${P}" y="${barY}" width="${barWidth}" height="8" rx="4"/></clipPath>
    </defs>
    <style>
      *{font-family:${fontFamily},sans-serif}
      .bg{fill:#${c.bg}}
      .title{font-size:18px;font-weight:700;fill:#${c.title}}
      .user{font-size:12px;fill:#${c.text};opacity:.7}
      ${compact ? '' : `.bio{font-size:11px;fill:#${c.text};opacity:.65}.tw{font-size:11px;fill:#${c.text};opacity:.7}.lang{font-size:10px;fill:#${c.text}}`}
      .stat{font-size:14px;font-weight:700;fill:#${c.text}}
      .stat-label{font-size:9px;font-weight:600;fill:#${c.text};opacity:.55;text-transform:uppercase;letter-spacing:.6px}
      .sec{font-size:9px;font-weight:600;fill:#${c.text};opacity:.5;text-transform:uppercase;letter-spacing:.6px}
    </style>
    <rect class="bg" width="${W}" height="${H}" rx="10" stroke="${hideBorder ? 'none' : `#${c.border}`}" stroke-width="1"/>
    <circle cx="${P + avatarSize / 2}" cy="${P + avatarSize / 2}" r="${avatarSize / 2 + 2}" fill="none" stroke="#${c.border}" stroke-width="1" opacity=".6"/>
    <image href="${avatar}" x="${P}" y="${P}" width="${avatarSize}" height="${avatarSize}" clip-path="url(#a)"/>
    <text x="${infoX}" y="${nameY}" class="title">${name}</text>
    <text x="${infoX}" y="${usernameY}" class="user">@${uname}${pronouns ? ` · ${pronouns}` : ''}</text>
    ${!compact && bioLine ? `<text x="${infoX}" y="${bioY}" class="bio">${bioLine}</text>` : ''}
    ${!compact && twitter ? `<g transform="translate(${infoX},${twitterY - 9})">${icon('x', c.icon, 11)}<text x="14" y="9" class="tw">@${twitter}</text></g>` : ''}
    ${/* [Fix] Issue #3 Bug 3 - Only render the stats row when showStats is true */ ''}
    ${
      showStats
        ? `<g transform="translate(${P},${headerY})">
      <g>
        ${icon('star', c.icon, 16)}<text x="20" y="12" class="stat">${kFormat(stats.stars)}</text>
        <text x="0" y="${statLabelY}" class="stat-label">Stars</text>
      </g>
      <g transform="translate(100,0)">
        ${icon('commit', c.icon, 16)}<text x="20" y="12" class="stat">${kFormat(stats.commits)}</text>
        <text x="0" y="${statLabelY}" class="stat-label">Commits (${stats.commitYear})</text>
      </g>
      <g transform="translate(220,0)">
        ${icon('issue', c.icon, 16)}<text x="20" y="12" class="stat">${kFormat(stats.issues)}</text>
        <text x="0" y="${statLabelY}" class="stat-label">Issues</text>
      </g>
      <g transform="translate(320,0)">
        ${icon('repo', c.icon, 16)}<text x="20" y="12" class="stat">${kFormat(stats.repos)}</text>
        <text x="0" y="${statLabelY}" class="stat-label">Repos</text>
      </g>
      <g transform="translate(405,0)">
        ${icon('pr', c.icon, 16)}<text x="20" y="12" class="stat">${kFormat(stats.prs)}</text>
        <text x="0" y="${statLabelY}" class="stat-label">PRs</text>
      </g>
    </g>`
        : ''
    }
    ${/* [Fix] Issue #3 Bug 3 - Only render the language bar and labels when showLanguages is true */ ''}
    ${
      showLanguages
        ? `<text x="${P}" y="${barY - 8}" class="sec">Top Languages</text>
    <rect x="${P}" y="${barY}" width="${barWidth}" height="8" rx="4" fill="#${c.text}" opacity=".1"/>
    <g clip-path="url(#b)">${langRects}</g>
    ${langLabels}`
        : ''
    }
  </svg>`;
}
