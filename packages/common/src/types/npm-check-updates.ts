import type { RcOptions } from 'npm-check-updates';

/**
 * A function that selects the upgrade target for a dependency.
 *
 * @param packageName The name of the dependency.
 * @param versionRange A parsed SemVer object of the upgraded version. See:
 *   https://git.coolaj86.com/coolaj86/semver-utils.js#semverutils-parse-semverstring.
 * @returns {'greatest'
 *   | 'latest'
 *   | 'minor'
 *   | 'newest'
 *   | 'patch'
 *   | 'semver'
 *   | `@${string}`}
 */
export type NCUTargetFunction = (
  /** The name of the dependency. */
  packageName: string,

  /**
   * A parsed SemVer object of the upgraded version.
   *
   * @see https://git.coolaj86.com/coolaj86/semver-utils.js#semverutils-parse-semverstring
   */
  versionRange: SemVer | SemVer[],
) => VersionRange;

type VersionRange = 'greatest' | 'latest' | 'minor' | 'newest' | 'patch' | 'semver' | `@${string}`;

/** Corrected options for `npm-check-updates`. */
export interface NCUConfig extends Omit<RcOptions, 'pre'> {
  /**
   * Include pre-release versions (e.g. `-alpha.0`, `-beta.5`, `-rc.2`).
   *
   * Automatically set to `1` when `--target` is `newest` or `greatest`, or when
   * the current version is a pre-release.
   *
   * @default 0
   */
  pre: boolean | number;
}

interface SemVer {
  /** The build metadata. */
  build?: string;
  /** The major version. */
  major?: string;
  /** The minor version. */
  minor?: string;
  /** The comparison operator (e.g., >=, <=). */
  operator?: string;
  /** The patch version. */
  patch?: string;
  /** The release identifier (pre-release tags). */
  release?: string;
  /** The full semantic version. */
  semver?: string;
  /** The raw version string. */
  version?: string;
}
