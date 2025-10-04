import type { FlatConfigItem } from '../types';

import { GLOB_PKG_JSON, GLOB_PKG_JSON5, GLOB_PKG_JSON_ALL, GLOB_PKG_JSONC } from '../globs';
import { extractRules, loadPlugin } from '../utils';

const [pluginJSON, pluginJSONC, pluginPackageJSON] = await Promise.all([
  loadPlugin<typeof import('@eslint/json')>('@eslint/json'),
  loadPlugin<typeof import('eslint-plugin-jsonc')>('eslint-plugin-jsonc'),
  loadPlugin<typeof import('eslint-plugin-package-json')>('eslint-plugin-package-json'),
] as const);

const jsonRecommendedRules = extractRules(pluginJSONC.configs['flat/recommended-with-json']);
const json5RecommendedRules = extractRules(pluginJSONC.configs['flat/recommended-with-json5']);
const jsoncRecommendedRules = extractRules(pluginJSONC.configs['flat/recommended-with-jsonc']);
const prettierRules = extractRules(pluginJSONC.configs['flat/prettier']);

export async function packageJSON(): Promise<FlatConfigItem[]> {
  const files = [GLOB_PKG_JSON_ALL];
  const filesJSON = [GLOB_PKG_JSON];
  const filesJSON5 = [GLOB_PKG_JSON5];
  const filesJSONC = [GLOB_PKG_JSONC];

  return [
    {
      name: 'package-json/plugin',
      files: files,
      plugins: { 'json': pluginJSON, 'jsonc': pluginJSONC, 'package-json': pluginPackageJSON },
    },
    {
      name: 'package-json/config/json',
      files: filesJSON,
      language: 'json/json',
      rules: {
        ...jsonRecommendedRules,
      },
    },
    {
      name: 'package-json/config/json5',
      files: filesJSON5,
      language: 'json/json5',
      rules: {
        ...json5RecommendedRules,
      },
    },
    {
      name: 'package-json/config/jsonc',
      files: filesJSONC,
      language: 'json/jsonc',
      rules: {
        ...jsoncRecommendedRules,
      },
    },
    {
      name: 'package-json/overrides',
      files: files,
      rules: {
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off',
        'strict': 'off',
        ...prettierRules,
        ...pluginPackageJSON.configs.recommended.rules,
        'package-json/order-properties': 'off',
      },
    },
  ] satisfies FlatConfigItem[];
}
