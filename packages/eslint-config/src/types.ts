/** biome-ignore-all lint/complexity/noBannedTypes: noBannedTypes */

import type { Linter } from 'eslint';

import type { RuleOptions } from '../gen/typegen';

export type { ConfigNames } from '../gen/typegen';

/** A type that can be an array or a single item. */
export type Arrayable<T> = T | T[];

/** A type that can be awaited. Promise<T> or T. */
export type Awaitable<T> = Promise<T> | T;

/**
 * ESLint Flat Config item with relaxed `plugins` and `rules` type definitions.
 *
 * @see [Configure ESLint](https://eslint.org/docs/latest/use/configure)
 */
export type FlatConfigItem = Omit<Linter.Config, 'plugins' | 'rules'> & {
  /**
   * An object containing a name-value mapping of plugin names to plugin
   * objects.
   *
   * When `files` is specified, these plugins are only available to the matching
   * files.
   */
  plugins?: Record<string, any> | undefined;

  /**
   * An object containing the configured rules.
   *
   * When `files` or `ignores` are specified, these rule configurations are only
   * available to the matching files.
   */
  rules?: Rules | undefined;
};

export type Rules = Record<string, Linter.RuleEntry<any> | undefined> & RuleOptions;

export interface OptionsFactory {
  astro?: boolean;
  command?: boolean;
  comments?: boolean;
  compat?: boolean;
  cspell?: boolean;
  css?: boolean;
  deMorgan?: boolean;
  ignores?: string[];
  imports?: boolean;
  jsdoc?: boolean;
  json?: boolean;
  jsonSchemaValidator?: boolean;
  markdown?: boolean;
  math?: boolean;
  mdx?: boolean;
  node?: boolean;
  packageJSON?: boolean;
  perfectionist?: boolean;
  prettier?: boolean;
  promise?: boolean;
  react?: boolean;
  regexp?: boolean;
  security?: boolean;
  toml?: boolean;
  typescript?: boolean;
  unicorn?: boolean;
  unocss?: boolean;
  unusedImports?: boolean;
  vue?: boolean;
  warnings?: boolean;
  yaml?: boolean;
}

export interface OptionsFiles {
  /** An array of `glob` patterns. */
  files?: string[];
}
