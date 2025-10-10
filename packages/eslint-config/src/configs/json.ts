import type { FlatConfigItem } from '../types';

import { hasPrettier } from '../env';
import {
  GLOB_JSON,
  GLOB_JSON5,
  GLOB_JSON_ALL,
  GLOB_JSON_AS_JSONC,
  GLOB_JSONC,
  GLOB_PKG_JSON_ALL,
} from '../globs';
import { extractRules, loadPlugin } from '../utils';

const [pluginJSON, pluginJSONC, parserJSONC] = await Promise.all([
  loadPlugin<typeof import('@eslint/json')>('@eslint/json'),
  loadPlugin<typeof import('eslint-plugin-jsonc')>('eslint-plugin-jsonc'),
  loadPlugin<typeof import('jsonc-eslint-parser')>('jsonc-eslint-parser'),
] as const);

const jsonRecommendedRules = extractRules(pluginJSONC.configs['flat/recommended-with-json']);
const json5RecommendedRules = extractRules(pluginJSONC.configs['flat/recommended-with-json5']);
const jsoncRecommendedRules = extractRules(pluginJSONC.configs['flat/recommended-with-jsonc']);
const prettierRules = extractRules(pluginJSONC.configs['flat/prettier']);

export async function json(): Promise<FlatConfigItem[]> {
  const files = [GLOB_JSON_ALL];
  const filesJSON = [GLOB_JSON];
  const filesJSON5 = [GLOB_JSON5];
  const filesJSONC = [...GLOB_JSON_AS_JSONC, GLOB_JSONC];
  const filesAll = [...files, ...filesJSON, ...filesJSONC, ...filesJSON5];

  const usePrettier = hasPrettier();

  return [
    {
      name: 'json/plugin',
      files: filesAll,
      ignores: [GLOB_PKG_JSON_ALL],
      plugins: { json: pluginJSON, jsonc: pluginJSONC },
    },
    {
      name: 'json/config',
      files: filesAll,
      ignores: [GLOB_PKG_JSON_ALL],
      languageOptions: {
        parser: parserJSONC,
      },
    },
    {
      name: 'json/config/json',
      files: filesJSON,
      ignores: [...GLOB_JSON_AS_JSONC, GLOB_PKG_JSON_ALL],
      language: 'json/json',
      rules: {
        ...jsonRecommendedRules,
      },
    },
    {
      name: 'json/config/json5',
      files: filesJSON5,
      language: 'json/json5',
      rules: {
        ...json5RecommendedRules,
      },
    },
    {
      name: 'json/config/jsonc',
      files: filesJSONC,
      language: 'json/jsonc',
      rules: {
        ...jsoncRecommendedRules,
      },
    },
    {
      name: 'json/overrides',
      files: files,
      ignores: [GLOB_PKG_JSON_ALL],
      rules: {
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off',
        'strict': 'off',
        ...pluginJSON.configs.recommended.rules,
        ...(usePrettier ? prettierRules : {}),
      },
    },
  ] satisfies FlatConfigItem[];
}
