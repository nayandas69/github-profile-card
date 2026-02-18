/**
 * Tests for text formatting and number utilities.
 * Covers kFormat and escapeXml functions.
 * (wrapText was removed -- bio uses single-line truncation in card.ts)
 *
 * @author Nayan Das <https://github.com/nayandas69>
 */

import { describe, it, expect } from 'vitest';
import { kFormat, escapeXml } from '../src/utils/format';

/* -------------------------------------------------- */
/*  kFormat - compact number formatting               */
/* -------------------------------------------------- */
describe('kFormat', () => {
  it('returns plain number below 1000', () => {
    expect(kFormat(0)).toBe('0');
    expect(kFormat(1)).toBe('1');
    expect(kFormat(999)).toBe('999');
  });

  it('formats thousands with k suffix', () => {
    expect(kFormat(1000)).toBe('1k');
    expect(kFormat(1500)).toBe('1.5k');
    expect(kFormat(9999)).toBe('10k');
    expect(kFormat(100_000)).toBe('100k');
  });

  it('formats millions with M suffix', () => {
    expect(kFormat(1_000_000)).toBe('1M');
    expect(kFormat(1_500_000)).toBe('1.5M');
    expect(kFormat(10_000_000)).toBe('10M');
  });
});

/* -------------------------------------------------- */
/*  escapeXml - SVG/XML-safe string encoding          */
/* -------------------------------------------------- */
describe('escapeXml', () => {
  it('escapes ampersands', () => {
    expect(escapeXml('a & b')).toBe('a &amp; b');
  });

  it('escapes angle brackets', () => {
    expect(escapeXml('<script>')).toBe('&lt;script&gt;');
  });

  it('escapes quotes', () => {
    expect(escapeXml(`"hello" 'world'`)).toBe('&quot;hello&quot; &#39;world&#39;');
  });

  it('returns empty string unchanged', () => {
    expect(escapeXml('')).toBe('');
  });

  it('leaves normal text untouched', () => {
    expect(escapeXml('Hello World')).toBe('Hello World');
  });
});

// wrapText tests removed -- function was unused dead code.
// Bio display uses single-line truncation at 40 chars (see card.ts).
