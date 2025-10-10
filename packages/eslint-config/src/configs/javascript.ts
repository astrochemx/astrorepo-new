import pluginJS from '@eslint/js';
import globals from 'globals';

import type { FlatConfigItem } from '../types';

import { GLOB_SRC_JS } from '../globs';

export async function javascript(): Promise<FlatConfigItem[]> {
  const files = [GLOB_SRC_JS];

  return [
    {
      name: 'javascript/parser',
      files: files,
      languageOptions: {
        ecmaVersion: 'latest',
        globals: {
          ...globals.browser,
          ...globals.es2026,
          ...globals.node,
          ...globals.serviceworker,
          ...globals['shared-node-browser'],
          document: 'readonly',
          navigator: 'readonly',
          window: 'readonly',
        },
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          ecmaVersion: 'latest',
          sourceType: 'module',
        },
        sourceType: 'module',
      },
    },
    {
      name: 'javascript/rules',
      files: files,
      rules: pluginJS.configs.recommended.rules,
    },
    {
      name: 'javascript/overrides',
      files: files,
      rules: {
        'no-explicit-any': 'off',
        'no-require-imports': 'off',
        'no-unsafe-argument': 'off',
        'no-unsafe-assignment': 'off',
        'no-unsafe-call': 'off',
        'no-unsafe-member-access': 'off',
        'no-unsafe-return': 'off',
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off',
        'prefer-nullish-coalescing': 'off',
        'require-await': 'off',
      },
    },
  ];
}
