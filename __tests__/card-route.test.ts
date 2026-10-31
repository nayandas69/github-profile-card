import { describe, expect, it, vi } from 'vitest';

const { getProfileData } = vi.hoisted(() => ({ getProfileData: vi.fn() }));
vi.mock('../src/services/index.js', () => ({ getProfileData, renderCard: vi.fn() }));
import app from '../src/app.js';

describe('card route errors', () => {
  it.each([
    [new Error('User not found'), 404, 'GitHub user "octocat" not found'],
    [
      new Error('GitHub API rate limit exceeded'),
      429,
      'GitHub API rate limit exceeded. Please try again later.',
    ],
    [new Error('GitHub API error (503)'), 503, 'GitHub API error. Please try again later.'],
    [
      new Error('GITHUB_TOKEN is missing'),
      500,
      'Server configuration error. Please contact the administrator.',
    ],
    [new Error('sensitive internal detail'), 500, 'An unexpected error occurred'],
    [{ message: 'sensitive internal detail' }, 500, 'An unexpected error occurred'],
  ])('handles failures without disclosing internal details', async (failure, status, message) => {
    getProfileData.mockRejectedValueOnce(failure);
    const response = await app.request('/card/octocat');
    expect(response.status).toBe(status);
    expect(await response.json()).toEqual({ error: message });
  });
});
