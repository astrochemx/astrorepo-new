import type { Addon, CheckOptions, DepFieldOptions, PackageMode } from 'taze';

export interface TazeCheckOptions extends CheckOptions {
  /** Array of custom addons. */
  addons?: Addon[];
  /** Show all packages up to date info. */
  all?: boolean;
  /** Number of concurrent requests. */
  concurrency?: number;
  /** Specify the current working directory. */
  cwd?: string;
  /**
   * Fields in package.json to be checked. Example: `{ dependencies: true,
   * devDependencies: true, peerDependencies: false }`.
   */
  depFields?: DepFieldOptions;
  /** Exclude dependencies to be checked. This overrides the `include` options. */
  exclude?: string | string[];
  /** Exit with code `1` if outdated dependencies are found. */
  failOnOutdated?: boolean;
  /** Force fetching from server, bypassing local cache. */
  force?: boolean;
  /** Check and update global packages. */
  global?: boolean;
  /** Group dependencies by source in the output. */
  group?: boolean;
  /** Ignore dependencies from other workspaces in a monorepo. */
  ignoreOtherWorkspaces?: boolean;
  /** Paths to ignore when searching for `package.json` files. */
  ignorePaths?: string | string[];
  /** Only included dependencies will be checked for updates. */
  include?: string | string[];
  /** Include locked `dependencies` and `devDependencies`. */
  includeLocked?: boolean;
  /** Install packages automatically after bumping. */
  install?: boolean;
  /** Enable interactive `CLI` mode. */
  interactive?: boolean;
  /** Logging level for output. */
  loglevel?: 'debug' | 'error' | 'info' | 'silent' | 'warn';
  /** The mode of version range resolution. */
  mode?: 'default' | 'latest' | 'major' | 'minor' | 'newest' | 'next' | 'patch';
  /** Show package compatibility with the current `Node.js` version. */
  nodecompat?: boolean;
  /** Override version bumping mode for individual packages. */
  packageMode?: Record<string, PackageMode>;
  /** Include `peerDependencies` in the update process. */
  peer?: boolean;
  /** Recursively search subdirectories for `package.json` files. */
  recursive?: boolean;
  /** Suppress all non-essential output. */
  silent?: boolean;
  /** Sorting order for outdated dependencies. */
  sort?: 'diff-asc' | 'diff-desc' | 'name-asc' | 'name-desc' | 'time-asc' | 'time-desc';
  /** Show time difference between the current and updated version. */
  timediff?: boolean;
  /** Update packages immediately after bumping. */
  update?: boolean;
  /** Write updates to `package.json` file. */
  write?: boolean;
}
