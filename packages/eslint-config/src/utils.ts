import type { Linter } from 'eslint';
import type { Awaitable } from 'eslint-flat-config-utils';

import { FlatCompat } from '@eslint/eslintrc';
import pluginJsEslint from '@eslint/js';

import type { Arrayable, FlatConfigItem } from './types';

/** Combine array and non-array ESLint Flat Configs into a single array. */
export async function combine(
  ...configs: Awaitable<FlatConfigItem | FlatConfigItem[]>[]
): Promise<FlatConfigItem[]> {
  const promises = configs.map((c) => Promise.resolve(c));
  const resolved = await Promise.all(promises);
  return resolved.flat();
}

/** Extract rules from a ESLint Flat Configs. */
export function extractRules(
  ...configs: Arrayable<{ [key: number | string | symbol]: any; rules?: FlatConfigItem['rules'] }>[]
): FlatConfigItem['rules'] {
  const flat = configs.flat();
  return Object.assign({}, ...flat.map((cfg) => cfg.rules ?? {}));
}

/** Extract rules from a ESLint Flat Configs. */
export async function extractRulesAsync(
  ...configs: Awaitable<FlatConfigItem | FlatConfigItem[]>[]
): Promise<FlatConfigItem['rules']> {
  const promises = configs.map((c) => Promise.resolve(c));
  const resolved = await Promise.all(promises);
  const flat = resolved.flat();
  return Object.assign({}, ...flat.map((cfg) => cfg.rules ?? {}));
}

/** Create compatibility class for working with ESLint configs. */
export function flatCompat(
  baseDirectory: string,
  resolvePluginsRelativeTo?: string,
  recommendedConfig: Linter.LegacyConfig = pluginJsEslint.configs.recommended,
  allConfig: Linter.LegacyConfig = pluginJsEslint.configs.all,
): FlatCompat {
  return new FlatCompat({
    allConfig,
    baseDirectory,
    recommendedConfig,
    ...(resolvePluginsRelativeTo ? { resolvePluginsRelativeTo } : {}),
  });
}

/**
 * Allow you to parse various types of files with ESLint.
 *
 * @see https://github.com/antfu/eslint-config/blob/main/src/utils.ts
 * @see https://github.com/so1ve/eslint-parser-plain/blob/main/src/index.ts
 */
export const parserPlain = {
  meta: {
    name: 'parser-plain',
  },
  parseForESLint: (
    code: string,
  ): {
    ast: {
      body: readonly [];
      comments: readonly [];
      loc: {
        readonly end: number;
        readonly start: 0;
      };
      range: readonly [0, number];
      tokens: readonly [];
      type: string;
    };
    scopeManager: null;
    services: {
      isPlain: boolean;
    };
    visitorKeys: {
      Program: readonly [];
    };
  } => ({
    ast: {
      body: [] as const,
      comments: [] as const,
      loc: { end: code.length, start: 0 } as const,
      range: [0, code.length] as const,
      tokens: [] as const,
      type: 'Program',
    },
    scopeManager: null,
    services: { isPlain: true },
    visitorKeys: {
      Program: [] as const,
    },
  }),
};

export type InteropModuleDefault<T> = T extends { default: infer U } ? U : T;

export async function interopDefault<T>(mod: Awaitable<T>): Promise<InteropModuleDefault<T>> {
  const resolved = await mod;
  return (resolved as any).default || resolved;
}

export async function loadPlugin<T = unknown>(name: string): Promise<InteropModuleDefault<T>> {
  const mod = await import(name).catch((error) => {
    console.error(error.message ?? error);
    throw new Error(`Failed to load ESLint Plugin '${name}'. Please, install it!`);
  });
  return interopDefault(mod);
}

export function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}
