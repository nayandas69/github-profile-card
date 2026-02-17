/**
 * Type definitions for the GitHub Profile Card API.
 * All interfaces used across the application are centralized here
 * to keep the codebase type-safe and consistent.
 *
 * @author Nayan Das <https://github.com/nayandas69>
 */

/** GitHub user profile information displayed on the card */
export interface UserProfile {
  login: string;
  name: string | null;
  avatarUrl: string;
  /** Base64-encoded data URL of the avatar for SVG embedding */
  avatarDataUrl?: string | null;
  bio: string | null;
  pronouns: string | null;
  twitter: string | null;
}

/** Aggregated stats from the user's GitHub activity */
export interface UserStats {
  stars: number;
  repos: number;
  prs: number;
  issues: number;
  commits: number;
  /**
   * [Fix] Issue #3 Bug 6 - The year the commit count belongs to.
   * The GitHub contributionsCollection query is scoped to a single
   * calendar year, so the card must display which year the number
   * refers to (e.g. "Commits (2026)") to avoid confusion.
   */
  commitYear: number;
}

/** A single programming language entry with usage size and color */
export interface LanguageStat {
  name: string;
  /** Total bytes of code in this language */
  size: number;
  /** Hex color string (e.g. "#3178c6") */
  color: string;
}

/** Combined profile data returned by the GitHub fetcher */
export interface ProfileData {
  user: UserProfile;
  stats: UserStats;
  languages: LanguageStat[];
}

/** Options for customizing the card appearance */
export interface CardOptions {
  theme?: string;
  title_color?: string;
  text_color?: string;
  icon_color?: string;
  bg_color?: string;
  border_color?: string;
  hide_border?: boolean;
  compact?: boolean;
  /**
   * [Fix] Issue #3 Bug 3 - Optional set of field names the user requested
   * via the `?fields=` query param (e.g. "languages", "stats", "all").
   * When provided, renderCard() uses this to conditionally hide sections
   * the user did not ask for. Previously fields only controlled data
   * fetching but the card always rendered every section regardless.
   */
  fields?: Set<string> | null;
}
