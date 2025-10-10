import { defineConfig } from 'eslint/config';

import type { FlatConfigItem } from '../types';

import { hasTypeScript } from '../env';
import { GLOB_SRC_JSX } from '../globs';
import { loadPlugin } from '../utils';

const [pluginReact, pluginReactCompiler, pluginReactHooks, pluginReactRefresh] = await Promise.all([
  loadPlugin<typeof import('@eslint-react/eslint-plugin')>('@eslint-react/eslint-plugin'),
  loadPlugin<typeof import('eslint-plugin-react-compiler')>('eslint-plugin-react-compiler'),
  loadPlugin<typeof import('eslint-plugin-react-hooks')>('eslint-plugin-react-hooks'),
  loadPlugin<typeof import('eslint-plugin-react-refresh')>('eslint-plugin-react-refresh'),
] as const);

export async function react(): Promise<FlatConfigItem[]> {
  const files = [...GLOB_SRC_JSX];

  const useTypeScript = hasTypeScript();

  const pluginReactConfig = useTypeScript
    ? pluginReact.configs['recommended-typescript']
    : pluginReact.configs.recommended;
  const pluginReactPlugins = pluginReact.configs.all.plugins;

  return [
    ...defineConfig({
      name: 'react-hooks/plugin-&-config',
      files: files,
      extends: ['react-hooks/recommended'],
      plugins: {
        'react-hooks': pluginReactHooks,
      },
    }),
    {
      name: 'react/plugin',
      files: files,
      plugins: {
        ...pluginReactConfig.plugins,
        '@eslint-react': pluginReactPlugins['@eslint-react'],
        '@eslint-react/debug': pluginReactPlugins['@eslint-react/debug'],
        '@eslint-react/dom': pluginReactPlugins['@eslint-react/dom'],
        '@eslint-react/hooks-extra': pluginReactPlugins['@eslint-react/hooks-extra'],
        '@eslint-react/naming-convention': pluginReactPlugins['@eslint-react/naming-convention'],
        '@eslint-react/web-api': pluginReactPlugins['@eslint-react/web-api'],
      },
      settings: {
        ...pluginReactConfig.settings,
        react: { importSource: 'react', polymorphicPropName: 'as', version: 'detect' },
      },
    },
    {
      name: 'react/parser',
      files: files,
      languageOptions: {
        ecmaVersion: 'latest',
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
      ...pluginReactConfig,
      name: 'react/config',
      files: files,
    },
    {
      name: 'react-compiler/plugin',
      files: files,
      plugins: {
        ...pluginReactCompiler.configs.recommended.plugins,
        'react-compiler': pluginReactCompiler,
      },
    },
    {
      ...pluginReactCompiler.configs.recommended,
      name: 'react-compiler/config',
      files: files,
      plugins: {},
    },
    {
      name: 'react-refresh/plugin',
      files: files,
      plugins: {
        ...pluginReactRefresh.configs.recommended.plugins,
        'react-refresh': pluginReactRefresh,
      },
    },
    {
      ...pluginReactRefresh.configs.recommended,
      name: 'react-refresh/config',
      files: files,
      plugins: {},
    },
  ] satisfies FlatConfigItem[];
}
