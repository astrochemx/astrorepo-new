import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import type { Linter } from 'eslint';
import type { ConfigArray } from 'typescript-eslint';
import type { Awaitable, FlatConfigItem } from './types';

/** @see https://github.com/toss/es-toolkit/blob/main/src/predicate/isPlainObject.ts */
export function isPlainObject(value: unknown): value is Record<PropertyKey, any> {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const proto = Object.getPrototypeOf(value) as typeof Object.prototype | null;
  const hasObjectPrototype =
    proto === null ||
    proto === Object.prototype ||
    // Required to support node:vm.runInNewContext({})
    Object.getPrototypeOf(proto) === null;
  if (!hasObjectPrototype) {
    return false;
  }
  return Object.prototype.toString.call(value) === '[object Object]';
}

/** @see https://github.com/toss/es-toolkit/blob/main/src/_internal/isUnsafeProperty.ts */
export function isUnsafeProperty(key: PropertyKey): boolean {
  return key === '__proto__';
}

/** @see https://github.com/toss/es-toolkit/blob/main/src/object/merge.ts */
export function mergeDeep<T extends Record<PropertyKey, any>, S extends Record<PropertyKey, any>>(
  target: T,
  source: S,
): T & S {
  const sourceKeys = Object.keys(source) as (keyof S)[];
  for (const sourceKey of sourceKeys) {
    const key = sourceKey;
    if (isUnsafeProperty(key)) {
      continue;
    }
    const sourceValue = source[key];
    const targetValue = target[key];
    if (isArray(sourceValue)) {
      if (isArray(targetValue)) {
        target[key] = mergeDeep(targetValue, sourceValue);
      } else {
        target[key] = mergeDeep([], sourceValue);
      }
    } else if (isPlainObject(sourceValue)) {
      if (isPlainObject(targetValue)) {
        target[key] = mergeDeep(targetValue, sourceValue);
      } else {
        target[key] = mergeDeep({}, sourceValue);
      }
    } else if (targetValue === undefined || sourceValue !== undefined) {
      target[key] = sourceValue;
    }
  }
  return target;
}

/** Check if the object is an array. */
export const isArray = (value: unknown): value is unknown[] => Array.isArray(value);

/**
 * Mimic `CommonJS` `__dirname` and `__filename` variables in `ES Modules`.
 * Provides `__filename` and `__dirname` by consuming `import.meta.url`.
 *
 * @param {string | import('url').URL} importMetaUrl
 */
export function getNames(importMetaUrl: string | import('url').URL): {
  __filename: string;
  __dirname: string;
} {
  const __filename = fileURLToPath(importMetaUrl);
  const __dirname = dirname(__filename);
  return { __filename, __dirname };
}

/** Extract rules from ESLint flat config. */
export function extractRules(
  config: FlatConfigItem | FlatConfigItem[],
): NonNullable<FlatConfigItem['rules']> {
  return Array.isArray(config)
    ? Object.assign({}, ...config.map((cfg) => cfg.rules ?? {}))
    : (config.rules ?? {});
}

/**
 * Map optional sections to the ESLint configs.
 *
 * @param {import('eslint').Linter.Config
 *   | import('typescript-eslint').ConfigArray[number]} [options]
 * @param {import('eslint').Linter.Config[]
 *   | import('typescript-eslint').ConfigArray
 *   | import('eslint').Linter.Config[]
 *   | import('typescript-eslint').ConfigArray} config
 *   The inferred type of X cannot be named without a reference to Y. This is
 *   likely not portable. A type annotation is necessary. Workarounds:
 * @see https://github.com/microsoft/TypeScript/issues/47663#issuecomment-1519138189
 * @see https://github.com/microsoft/TypeScript/issues/42873#issuecomment-2041368364
 */
export function mapOptionsToConfigs(
  options: Linter.Config | ConfigArray[number],
  config: Linter.Config[] | ConfigArray | Linter.Config | ConfigArray[number],
): Linter.Config[] | ConfigArray | Linter.Config | ConfigArray[number] {
  return isArray(config)
    ? config.map((cfg) => mergeDeep(cfg, options))
    : mergeDeep(config, options);
}

/**
 * `FlatCompat` compatibility class for working with ESLint `extend`'ed configs.
 *
 * @param {string | import('url').URL} importMetaUrl
 */
export function flatCompat(
  importMetaUrl: string | import('url').URL,
  resolvePluginsRelativeTo?: string,
): FlatCompat {
  return new FlatCompat({
    baseDirectory: getNames(importMetaUrl).__dirname, // process.cwd()
    ...(resolvePluginsRelativeTo !== undefined && {
      resolvePluginsRelativeTo: resolvePluginsRelativeTo,
    }),
    allConfig: js.configs.all,
    recommendedConfig: js.configs.recommended,
  });
}

/**
 * @see https://github.com/antfu/eslint-config/blob/main/src/utils.ts
 * @see https://www.npmjs.com/package/eslint-parser-plain
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
    scopeManager: undefined;
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
    scopeManager: undefined,
    services: { isPlain: true },
    visitorKeys: {
      Program: [] as const,
    },
  }),
};

/** Combine array and non-array configs into a single array. */
export async function combine(
  ...configs: Awaitable<FlatConfigItem | FlatConfigItem[]>[]
): Promise<FlatConfigItem[]> {
  const resolved = await Promise.all(configs);
  return resolved.flat();
}

/**
 * Rename plugin prefixes in a rule object. Accepts a map of prefixes to rename.
 *
 * @example
 *   ```ts
 *   import { renameRules } from '@antfu/eslint-config';
 *
 *   export default [
 *     {
 *       rules: renameRules(
 *         {
 *           '@typescript-eslint/indent': 'error',
 *         },
 *         { '@typescript-eslint': 'ts' },
 *       ),
 *     },
 *   ];
 *   ```;
 */
export function renameRules(
  rules: Record<string, any>,
  map: Record<string, string>,
): Record<string, any> {
  return Object.fromEntries(
    Object.entries(rules).map(([key, value]) => {
      for (const [from, to] of Object.entries(map)) {
        if (key.startsWith(`${from}/`)) {
          return [to + key.slice(from.length), value];
        }
      }
      return [key, value];
    }),
  );
}

/**
 * Rename plugin names in the flat configs array.
 *
 * @example
 *   ```ts
 *   import { renamePluginInConfigs } from '@antfu/eslint-config';
 *   import someConfigs from './some-configs';
 *
 *   export default renamePluginInConfigs(someConfigs, {
 *     '@typescript-eslint': 'ts',
 *     'import-x': 'import',
 *   });
 *   ```;
 */
export function renamePluginInConfigs(
  configs: FlatConfigItem[],
  map: Record<string, string>,
): FlatConfigItem[] {
  return configs.map((i) => {
    const clone = { ...i };
    if (clone.rules) {
      clone.rules = renameRules(clone.rules, map);
    }
    if (clone.plugins) {
      clone.plugins = Object.fromEntries(
        Object.entries(clone.plugins).map(([key, value]) => {
          if (key in map) {
            return [map[key], value];
          }
          return [key, value];
        }),
      );
    }
    return clone;
  });
}

/** Extract module type with interoperability for CJS `module.exports`. */
export type InteropModuleDefault<T> = T extends { default: infer U } ? U : T;

/** Get package's default export. */
export async function interopDefault<T>(mod: Awaitable<T>): Promise<InteropModuleDefault<T>> {
  const resolved = await mod;
  return (resolved as any).default || resolved;
}

export async function loadPlugin<T = unknown>(name: string): Promise<T> {
  const mod = await import(name).catch((error) => {
    console.error(error);
    throw new Error(`Failed to load ESLint plugin '${name}'. Please install it!`);
  });
  return interopDefault(mod) as Promise<T>;
}

export async function getTypeScriptParser(): Promise<
  (typeof import('typescript-eslint'))['parser']
> {
  const ts = await loadPlugin<typeof import('typescript-eslint')>('typescript-eslint');
  return ts.parser;
}
