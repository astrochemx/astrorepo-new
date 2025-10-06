import type { FlatConfigItem } from '../types';

import { GLOB_PKG_JSON, GLOB_PKG_JSON5, GLOB_PKG_JSON_ALL, GLOB_PKG_JSONC } from '../globs';
import { extractRules, loadPlugin } from '../utils';

const [pluginJSONC, pluginNodeDependencies, pluginPackageJSON, parserJSONC] = await Promise.all([
  loadPlugin<typeof import('eslint-plugin-jsonc')>('eslint-plugin-jsonc'),
  loadPlugin<typeof import('eslint-plugin-node-dependencies')>('eslint-plugin-node-dependencies'),
  loadPlugin<typeof import('eslint-plugin-package-json')>('eslint-plugin-package-json'),
  loadPlugin<typeof import('jsonc-eslint-parser')>('jsonc-eslint-parser'),
] as const);

const jsonRecommendedRules = extractRules(pluginJSONC.configs['flat/recommended-with-json']);
const json5RecommendedRules = extractRules(pluginJSONC.configs['flat/recommended-with-json5']);
const jsoncRecommendedRules = extractRules(pluginJSONC.configs['flat/recommended-with-jsonc']);
const nodeDependenciesRules = extractRules(pluginNodeDependencies.configs['flat/recommended']);
const prettierRules = extractRules(pluginJSONC.configs['flat/prettier']);

export async function packageJSON(): Promise<FlatConfigItem[]> {
  const files = [GLOB_PKG_JSON_ALL];
  const filesJSON = [GLOB_PKG_JSON];
  const filesJSON5 = [GLOB_PKG_JSON5];
  const filesJSONC = [GLOB_PKG_JSONC];

  return [
    {
      name: 'node-dependencies/plugin',
      files: files,
      plugins: { 'node-dependencies': pluginNodeDependencies },
    },
    {
      name: 'node-dependencies/config',
      files: files,
      languageOptions: {
        parser: parserJSONC,
      },
      rules: {
        ...nodeDependenciesRules,
      },
    },
    {
      name: 'package-json/plugin',
      files: files,
      plugins: { 'jsonc': pluginJSONC, 'package-json': pluginPackageJSON },
    },
    {
      name: 'package-json/parser',
      files: files,
      languageOptions: {
        parser: parserJSONC,
      },
    },
    {
      name: 'package-json/config/json',
      files: filesJSON,
      rules: {
        ...jsonRecommendedRules,
      },
    },
    {
      name: 'package-json/config/json5',
      files: filesJSON5,
      rules: {
        ...json5RecommendedRules,
      },
    },
    {
      name: 'package-json/config/jsonc',
      files: filesJSONC,
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
