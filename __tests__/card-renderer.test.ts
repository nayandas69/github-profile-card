/**
 * Tests for the SVG card renderer.
 * Validates output structure, theming, and edge cases.
 *
 * @author Nayan Das <https://github.com/nayandas69>
 */

import { describe, it, expect } from 'vitest';
import { renderCard } from '../src/services/card';
import type { UserProfile, UserStats, LanguageStat } from '../src/types';

/* -------------------------------------------------- */
/*  Shared mock data                                  */
/* -------------------------------------------------- */

/** Minimal mock user profile for testing */
const mockUser: UserProfile = {
  login: 'testuser',
  name: 'Test User',
  avatarUrl: 'https://avatars.githubusercontent.com/u/12345?v=4',
  avatarDataUrl: null,
  bio: 'Open source developer and coffee lover',
  pronouns: 'they/them',
  twitter: 'testuser',
};

/** Minimal mock stats for testing */
const mockStats: UserStats = {
  stars: 1234,
  repos: 56,
  prs: 78,
  issues: 90,
  commits: 2500,
  commitYear: new Date().getUTCFullYear(),
};

/** Minimal mock language data for testing */
const mockLangs: LanguageStat[] = [
  { name: 'TypeScript', size: 50000, color: '#3178c6' },
  { name: 'Python', size: 30000, color: '#3572A5' },
  { name: 'Rust', size: 20000, color: '#dea584' },
];

/* -------------------------------------------------- */
/*  renderCard tests                                  */
/* -------------------------------------------------- */
describe('renderCard', () => {
  it('returns a valid SVG string', () => {
    const svg = renderCard(mockUser, mockStats, mockLangs);
    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
  });

  it("includes the user's display name", () => {
    const svg = renderCard(mockUser, mockStats, mockLangs);
    expect(svg).toContain('Test User');
  });

  it('includes the username with @ prefix', () => {
    const svg = renderCard(mockUser, mockStats, mockLangs);
    expect(svg).toContain('@testuser');
  });

  it('includes formatted stats', () => {
    const svg = renderCard(mockUser, mockStats, mockLangs);
    // 1234 -> "1.2k"
    expect(svg).toContain('1.2k');
    // 2500 -> "2.5k"
    expect(svg).toContain('2.5k');
  });

  it('displays the commit year in the Commits label', () => {
    const svg = renderCard(mockUser, mockStats, mockLangs);
    const year = new Date().getUTCFullYear();
    expect(svg).toContain(`Commits (${year})`);
  });

  it('includes language names', () => {
    const svg = renderCard(mockUser, mockStats, mockLangs);
    expect(svg).toContain('TypeScript');
    expect(svg).toContain('Python');
    expect(svg).toContain('Rust');
  });

  it('includes bio text when not compact', () => {
    const svg = renderCard(mockUser, mockStats, mockLangs, { compact: false });
    expect(svg).toContain('Open source developer and coffee lover');
  });

  it('truncates long bios to a single line with ellipsis', () => {
    const longBio: UserProfile = {
      ...mockUser,
      bio: 'This is a really long biography that definitely exceeds the forty character limit',
    };
    const svg = renderCard(longBio, mockStats, mockLangs, { compact: false });
    // Should contain the first 40 characters followed by an ellipsis
    expect(svg).toContain('This is a really long biography that def\u2026');
    // Should NOT contain the full untruncated bio
    expect(svg).not.toContain('forty character limit');
  });

  it('hides bio in compact mode', () => {
    const svg = renderCard(mockUser, mockStats, mockLangs, { compact: true });
    expect(svg).not.toContain('Open source developer');
  });

  it('applies a named theme', () => {
    const svg = renderCard(mockUser, mockStats, mockLangs, { theme: 'dark' });
    // The dark theme uses bg: "151515"
    expect(svg).toContain('#151515');
  });

  it('applies custom color overrides', () => {
    const svg = renderCard(mockUser, mockStats, mockLangs, {
      bg_color: 'ff0000',
    });
    expect(svg).toContain('#ff0000');
  });

  it('hides border when hide_border is true', () => {
    const svg = renderCard(mockUser, mockStats, mockLangs, {
      hide_border: true,
    });
    expect(svg).toContain('stroke="none"');
  });

  it('falls back to login when name is null', () => {
    const noName: UserProfile = { ...mockUser, name: null };
    const svg = renderCard(noName, mockStats, mockLangs);
    expect(svg).toContain('testuser');
  });

  it('omits the language section when there are no languages', () => {
    const svg = renderCard(mockUser, mockStats, []);
    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
    expect(svg).not.toContain('Top Languages');
  });
});
