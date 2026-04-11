/**
 * Tests for theme resolution and SVG icon rendering.
 * Covers resolveColors(), the themes map, and the icon() helper.
 *
 * @author Nayan Das <https://github.com/nayandas69>
 */

import { describe, it, expect } from 'vitest';
import { themes, resolveColors } from '../src/utils/themes';
import { icons, icon } from '../src/utils/icons';

/* -------------------------------------------------- */
/*  themes map                                        */
/* -------------------------------------------------- */
describe('themes', () => {
  it('has a default theme', () => {
    const def = themes['default'];
    expect(def).toBeDefined();
    expect(def!.bg).toBeTruthy();
    expect(def!.title).toBeTruthy();
    expect(def!.text).toBeTruthy();
    expect(def!.icon).toBeTruthy();
    expect(def!.border).toBeTruthy();
  });

  it('has all 56 built-in themes organized by category', () => {
    const expected = [
      // Default
      'default',
      // Dark themes
      'dark',
      'dracula',
      'monokai',
      'nord',
      'github_dark',
      'slate',
      'midnight',
      'highcontrast',
      // Light themes
      'pearl',
      'ice',
      'sand',
      // Pastel themes
      'pastel_peach',
      'pastel_mint',
      'pastel_lavender',
      'pastel_lemon',
      'pastel_rose',
      // Material Design themes
      'mui_blue',
      'mui_indigo',
      'mui_teal',
      'mui_deep_purple',
      'mui_orange',
      'mui_red',
      // VSCode themes
      'vscode_dark_plus',
      'vscode_light',
      'vscode_monokai_pro',
      'vscode_night_owl',
      'vscode_palenight',
      // Brand themes
      'twitter',
      'discord',
      'spotify',
      'github_light',
      'youtube',
      'instagram',
      // Neon/Vibrant themes
      'radical',
      'cyberpunk',
      'synthwave',
      'oceanic',
      'mint',
      'royal',
      // Natural/Warm themes
      'gruvbox',
      'merko',
      'forest',
      'rose',
      'sunset',
      'lavender',
      'ember',
      'tokyonight',
      'onedark',
      'cobalt',
      // AMOLED themes
      'amoled_blue',
      'amoled_green',
      'amoled_purple',
      // Grayscale themes
      'grayscale_light',
      'grayscale_mid',
      'grayscale_dark',
    ];
    for (const name of expected) {
      expect(themes[name]).toBeDefined();
    }
    expect(Object.keys(themes).length).toBe(56);
  });

  it('each theme has all 5 color properties', () => {
    for (const [name, theme] of Object.entries(themes)) {
      expect(theme.bg, `${name}.bg`).toBeDefined();
      expect(theme.title, `${name}.title`).toBeDefined();
      expect(theme.text, `${name}.text`).toBeDefined();
      expect(theme.icon, `${name}.icon`).toBeDefined();
      expect(theme.border, `${name}.border`).toBeDefined();
    }
  });
});

/* -------------------------------------------------- */
/*  resolveColors                                     */
/* -------------------------------------------------- */
describe('resolveColors', () => {
  it('returns the default theme when no theme is specified', () => {
    const colors = resolveColors({});
    expect(colors.bg).toBe(themes['default']!.bg);
    expect(colors.title).toBe(themes['default']!.title);
  });

  it('returns the correct named theme', () => {
    const colors = resolveColors({ theme: 'dracula' });
    expect(colors.bg).toBe(themes['dracula']!.bg);
    expect(colors.title).toBe(themes['dracula']!.title);
  });

  it('falls back to default for unknown theme names', () => {
    const colors = resolveColors({ theme: 'nonexistent_theme_xyz' });
    expect(colors.bg).toBe(themes['default']!.bg);
  });

  it('overrides individual colors over a base theme', () => {
    const colors = resolveColors({
      theme: 'dark',
      bg_color: 'ff0000',
      title_color: '00ff00',
    });
    // Overridden values
    expect(colors.bg).toBe('ff0000');
    expect(colors.title).toBe('00ff00');
    // Non-overridden values fall through from the dark theme
    expect(colors.text).toBe(themes['dark']!.text);
    expect(colors.icon).toBe(themes['dark']!.icon);
    expect(colors.border).toBe(themes['dark']!.border);
  });

  it('applies all 5 color overrides at once', () => {
    const colors = resolveColors({
      bg_color: '111111',
      title_color: '222222',
      text_color: '333333',
      icon_color: '444444',
      border_color: '555555',
    });
    expect(colors.bg).toBe('111111');
    expect(colors.title).toBe('222222');
    expect(colors.text).toBe('333333');
    expect(colors.icon).toBe('444444');
    expect(colors.border).toBe('555555');
  });
});

/* -------------------------------------------------- */
/*  icons map                                         */
/* -------------------------------------------------- */
describe('icons', () => {
  it('has all required icon paths', () => {
    const expected: (keyof typeof icons)[] = ['star', 'commit', 'pr', 'issue', 'repo', 'x'];
    for (const name of expected) {
      expect(icons[name]).toBeDefined();
      expect(icons[name]).toContain('<path');
    }
  });
});

/* -------------------------------------------------- */
/*  icon() renderer                                   */
/* -------------------------------------------------- */
describe('icon()', () => {
  it('renders a valid SVG element for a regular icon', () => {
    const svg = icon('star', 'ffffff');
    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
    expect(svg).toContain('fill="#ffffff"');
    expect(svg).toContain('viewBox="0 0 16 16"');
  });

  it('renders the X icon with 24x24 viewBox and fill', () => {
    const svg = icon('x', 'abcdef');
    expect(svg).toContain('fill="#abcdef"');
    expect(svg).toContain('viewBox="0 0 24 24"');
  });

  it('uses default size of 16', () => {
    const svg = icon('repo', '000000');
    expect(svg).toContain('width="16"');
    expect(svg).toContain('height="16"');
  });

  it('respects a custom size parameter', () => {
    const svg = icon('commit', 'ff0000', 24);
    expect(svg).toContain('width="24"');
    expect(svg).toContain('height="24"');
  });

  it('returns empty string for unknown icon name', () => {
    // Cast to bypass type check for testing edge case
    const svg = icon('nonexistent' as keyof typeof icons, '000000');
    expect(svg).toBe('');
  });
});
