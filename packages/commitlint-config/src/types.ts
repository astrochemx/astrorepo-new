import type { ParserPreset, UserConfig } from '@commitlint/types';

export type CommitlintConfig = Exclude<UserConfig, 'parserPreset'> & {
  parserPreset: Exclude<ParserPreset, 'parserOpts'> & { parserOpts: ParserOptions };
};

/** @see https://github.com/conventional-changelog/conventional-changelog/blob/master/packages/conventional-commits-parser/src/types.ts */
export interface ParserOptions {
  /** Breaking changes header pattern. */
  breakingHeaderPattern?: RegExp;
  /** Character used to comment out a line. */
  commentChar?: string;
  /** Pattern to match other fields. */
  fieldPattern?: RegExp;
  /**
   * Used to define what capturing group of `headerPattern` captures what header
   * part. The order of the array should correspond to the order of
   * `headerPattern`'s capturing group.
   */
  headerCorrespondence?: string[];
  /** Used to match header pattern. */
  headerPattern?: RegExp;
  /** The prefixes of an issue. E.g.: in `gh-123`, `gh-` is the prefix. */
  issuePrefixes?: string[];
  /** Used to define if `issuePrefixes` should be considered case sensitive. */
  issuePrefixesCaseSensitive?: boolean;
  /** Used to define what capturing group of `mergePattern`. */
  mergeCorrespondence?: string[];
  /**
   * Pattern to match merge headers. E.g.: branch merge, GitHub or GitLab like
   * pull requests headers. When a merge header is parsed, the next line is used
   * for conventional header parsing.
   */
  mergePattern?: RegExp;
  /** Keywords for important notes. This value is case **insensitive**. */
  noteKeywords?: string[];
  /**
   * A function that takes `noteKeywordsSelection` and returns a `RegExp` to be
   * matched against the notes.
   */
  notesPattern?(text: string): RegExp;
  /** Keywords to reference an issue. This value is case **insensitive**. */
  referenceActions?: string[];
  /**
   * Used to define what capturing group of `revertPattern` captures what
   * reverted commit fields. The order of the array should correspond to the
   * order of `revertPattern`'s capturing group.
   */
  revertCorrespondence?: string[];
  /** Pattern to match what this commit reverts. */
  revertPattern?: RegExp;
}
