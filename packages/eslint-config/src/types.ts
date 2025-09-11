/** biome-ignore-all lint/complexity/noBannedTypes: noBannedTypes */

import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin';
import type { Linter } from 'eslint';
import type { TSConfig } from './modules';
import type { ConfigNames, RuleOptions } from './typegen';

/** A type that can be an array or a single item. */
export type Arrayable<T> = T | T[];

/** A type that can be awaited. Promise<T> or T. */
export type Awaitable<T> = T | Promise<T>;

export type Rules = Record<string, Linter.RuleEntry<any> | undefined> & RuleOptions;

export type { ConfigNames };

/**
 * Relax `plugins` and `rules` type limitations, as many plugins do not have the
 * correct type information yet.
 */
export type FlatConfigItem = Omit<Linter.Config | TSConfig[number], 'plugins' | 'rules'> & {
  /**
   * An object containing a name-value mapping of plugin names to plugin
   * objects. When `files` is specified, these plugins are only available to the
   * matching files.
   *
   * @see [Using plugins in your configuration](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-plugins-in-your-configuration)
   */
  plugins?: Record<string, any>;

  /**
   * An object containing the configured rules. When `files` or `ignores` are
   * specified, these rule configurations are only available to the matching
   * files.
   */
  rules?: Rules;
};

export interface Options {
  astro?: boolean;
  command?: boolean;
  ignores?: string[];
  perfectionist?: boolean;
  typescript?: boolean;
  warnings?: boolean;
}

export interface OptionsExtraFileExtension {
  /** Additional file extensions to process. */
  extraFileExtensions?: string[];
}

export interface OptionsFiles {
  /** Glob patterns to override the predefined `files` option. */
  files?: string[];
}

export interface OptionsIgnores {
  /** Glob patterns to exclude from processing. */
  ignores?: string[];
}

export interface OptionsJsx {
  /** Enable JSX syntax. */
  jsx?: boolean;
}

export interface OptionsOverrides {
  /** Overrides for rules. */
  overrides?: FlatConfigItem['rules'];
}

export interface OptionsSvelte {
  /** Path to svelte config file. */
  svelteConfig?: string;
}

export interface OptionsTypeAware {
  /** Enable type-aware parsing. */
  typeAware?: boolean;
}

export interface OptionsTypeScript {
  /** Glob patterns for files that should be type aware. */
  filesTypeAware?: string[];
  /**
   * Glob patterns for files that should not be type aware.
   *
   * @default ['**\/*.md\/**', '**\/*.astro/*.ts']
   */
  ignoresTypeAware?: string[];
  /** Additional parser options for TypeScript. */
  parserOptions?: Partial<NonNullable<TSConfig[number]['languageOptions']>['parserOptions']>;
  /** Overrides for type aware rules. */
  overridesTypeAware?: FlatConfigItem['rules'];
  /**
   * Relative path to a `tsconfig.json` file to use instead of TypeScript's
   * default project configuration. It takes in a string path that will be
   * resolved relative to the `tsconfigRootDir`.
   *
   * @default './tsconfig.json'
   * @see https://typescript-eslint.io/linting/typed-linting
   * @see https://typescript-eslint.io/packages/parser#defaultproject
   */
  tsconfigPath?: string;
  /**
   * Absolute path of your project's root directory.
   *
   * @default process.cwd()
   *
   * @see https://typescript-eslint.io/linting/typed-linting
   * @see https://typescript-eslint.io/packages/parser#tsconfigrootdir
   */
  tsconfigRoot?: string;
  /** When this options is provided, type aware rules will be enabled. */
  typeAware?: boolean;
}

export interface OptionsUseTypeScript {
  /** Use TypeScript */
  useTypeScript?: boolean;
}

export interface OptionsUseStylistic {
  /** Use Stylistic ESLint */
  useStylistic?: boolean | StylisticCustomizeOptions;
}
