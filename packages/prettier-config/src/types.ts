import type { PluginConfig as SortImportsOptions } from '@ianvs/prettier-plugin-sort-imports';
import type { Config as PrettierConfig, Options as PrettierOptions } from 'prettier';
import type { Options as JSDocOptions } from 'prettier-plugin-jsdoc';
import type { MultilineArrayOptions } from 'prettier-plugin-multiline-arrays';
import type { NginxOptions } from 'prettier-plugin-nginx';
import type { ShParserOptions as SHOptions } from 'prettier-plugin-sh';
import type { SqlOptions } from 'prettier-plugin-sql';
import type { PluginConfig as SvelteOptions } from 'prettier-plugin-svelte';
import type { PluginOptions as TailwindCSSOptions } from 'prettier-plugin-tailwindcss';
import type { PrettierTaploOptions as TOMLOptions } from 'prettier-plugin-toml';

export type OverridesObject<T extends object = object> = Omit<
  NonNullable<PrettierConfig['overrides']>[number],
  'options'
> & {
  options?: PrettierOptions & T;
};

export type OverridesArray<T extends object = object> = OverridesObject<T>[];

export type Overrides<T extends object = object> = {
  overrides?: OverridesArray<T>;
};

export type FullConfig = PrettierOptions & AllPluginOptions & Overrides<AllPluginOptions>;

export type AllPluginOptions = Partial<
  AstroOptions &
    JSDocOptions &
    MultilineArrayOptions &
    NginxOptions &
    SHOptions &
    SortImportsOptions &
    SqlOptions &
    SvelteOptions &
    TailwindCSSOptions &
    TOMLOptions &
    XMLOptions
>;

export type {
  JSDocOptions,
  MultilineArrayOptions,
  NginxOptions,
  PrettierConfig,
  PrettierOptions,
  SHOptions,
  SortImportsOptions,
  SqlOptions,
  SvelteOptions,
  TailwindCSSOptions,
  TOMLOptions,
};

export interface AstroOptions {
  /** @default false */
  astroAllowShorthand?: boolean;
  /** @default 'markup | styles' */
  astroSortOrder?: string;
}

export interface INIOptions {
  /** @default false */
  iniSpaceAroundEquals?: boolean;
  /** @default 80 */
  printWidth?: number;
  /** @default 2 */
  tabWidth?: number;
}

export interface XMLOptions {
  /** @default true */
  bracketSameLine?: boolean;
  /** @default 80 */
  printWidth?: number;
  /** @default false */
  singleAttributePerLine?: boolean;
  /** @default 2 */
  tabWidth?: number;
  /** @default 'preserve' */
  xmlQuoteAttributes?: 'preserve' | 'double' | 'single';
  /** @default true */
  xmlSelfClosingSpace?: boolean;
  /** @default false */
  xmlSortAttributesByKey?: boolean;
  /** @default 'strict' */
  xmlWhitespaceSensitivity?: 'strict' | 'ignore' | 'preserve';
}
