import globals from 'globals';

import type { FlatConfigItem } from '../types';

import { GLOB_SRC_JSX } from '../globs';
import { loadPlugin } from '../utils';

const pluginJSXA11y =
  await loadPlugin<typeof import('eslint-plugin-jsx-a11y')>('eslint-plugin-jsx-a11y');

export async function jsxA11y(): Promise<FlatConfigItem[]> {
  const files = [...GLOB_SRC_JSX];

  return [
    {
      name: 'jsx-a11y/plugin',
      files: files,
      plugins: { 'jsx-a11y': pluginJSXA11y },
      settings: {
        'jsx-a11y': {
          attributes: {
            for: ['htmlFor', 'for'],
          },
          components: {},
          polymorphicPropName: 'as',
        },
      },
    },
    {
      name: 'jsx-a11y/parser',
      files: files,
      languageOptions: {
        ...pluginJSXA11y.flatConfigs.recommended.languageOptions,
        ecmaVersion: 'latest',
        globals: {
          ...globals.browser,
          ...globals.serviceworker,
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
      ...pluginJSXA11y.flatConfigs.recommended,
      name: 'jsx-a11y/config',
      files: files,
      plugins: {},
    },
  ] satisfies FlatConfigItem[];
}
