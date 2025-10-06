import path from 'node:path';
import globals from 'globals';

import type { FlatConfigItem } from '../types';

import { hasTypeScript } from '../env';
import { GLOB_SRC_JS, GLOB_SRC_JTS } from '../globs';
import { extractRules, loadPlugin } from '../utils';

const {
  configs: configsTS,
  parser: parserTS,
  plugin: pluginTS,
} = await loadPlugin<typeof import('typescript-eslint')>('typescript-eslint');

// @ts-expect-error: types
const tsESLintRecommendedRules = extractRules(configsTS.recommended ?? {});
// @ts-expect-error: types
const tsESLintRecommendedTypeCheckedRules = extractRules(configsTS.recommendedTypeChecked ?? {});
// @ts-expect-error: types
const tsESLintStylisticRules = extractRules(configsTS.stylistic ?? {});
// @ts-expect-error: types
const tsESLintStylisticTypeCheckedRules = extractRules(configsTS.stylisticTypeChecked ?? {});

export async function typescript(): Promise<FlatConfigItem[]> {
  const files = [GLOB_SRC_JTS];
  const useTypeScript = hasTypeScript();

  return useTypeScript
    ? ([
        {
          name: 'typescript/plugin',
          files: files,
          plugins: {
            '@typescript-eslint': pluginTS,
          },
        },
        {
          name: 'typescript/parser',
          files: files,
          languageOptions: {
            ecmaVersion: 'latest',
            globals: {
              ...globals.browser,
              ...globals.es2026,
              ...globals.node,
              ...globals['shared-node-browser'],
              document: 'readonly',
              navigator: 'readonly',
              window: 'readonly',
            },
            parser: parserTS,
            parserOptions: {
              ecmaFeatures: {
                jsx: true,
              },
              ecmaVersion: 'latest',
              extraFileExtensions: ['.astro', '.mdx', '.svelte', '.vue'],
              projectService: {
                allowDefaultProject: [GLOB_SRC_JS.replace('**/*', './*')],
                defaultProject: path.normalize(path.resolve(process.cwd(), 'tsconfig.json')),
              },
              sourceType: 'module',
              tsconfigRootDir: path.normalize(process.cwd()),
            },
            sourceType: 'module',
          },
        },
        {
          name: 'typescript/rules',
          files: files,
          rules: {
            ...tsESLintRecommendedRules,
            ...tsESLintStylisticRules,
            ...tsESLintRecommendedTypeCheckedRules,
            ...tsESLintStylisticTypeCheckedRules,
          },
        },
        {
          name: 'typescript/overrides',
          files: files,
          rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-require-imports': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/no-unused-expressions': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/prefer-nullish-coalescing': 'off',
            '@typescript-eslint/require-await': 'off',
          },
        },
      ] satisfies FlatConfigItem[])
    : [];
}
