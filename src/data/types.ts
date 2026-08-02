import type { Localized } from '../i18n/types';

export type AppId = 'atlas' | 'journey' | 'words' | 'stories' | 'compass' | 'cayce';
export type AppLanguage = 'en' | 'zh-Hant' | 'zh-Hans';

/** What a visitor would actually be doing, each scored independently on a
 * 0-10 scale. Used both for the grid's filter chips and for the small
 * per-app radar chart shown in its detail section. */
export interface AppModeScores {
  reflecting: number;
  exploring: number;
  reading: number;
}

export interface SuiteApp {
  id: AppId;
  order: number;
  name: Localized<string>;
  tagline: Localized<string>;
  blurb: Localized<string>;
  detail: Localized<string[]>;
  goodFor: Localized<string[]>;
  notFor: Localized<string>;
  tags: Localized<string[]>;
  languages: AppLanguage[];
  installable: boolean;
  accent: string;
  accentDark: string;
  /** Emoji fallback mark — used only when `iconSrc` isn't set. */
  mark: string;
  /** Path to the app's own real icon (copied from its repo's public/icons),
   * shown instead of the emoji `mark` when present. */
  iconSrc?: string;
  url: string;
  repo: string;
  status: 'live' | 'coming-soon';
  modes: AppModeScores;
  /** Rough time investment — shown next to the radar chart, since two apps
   * can share an identical mode shape (e.g. two pure self-assessment
   * quizzes) but differ a lot in how long they take. */
  timeEstimate: Localized<string>;
}
