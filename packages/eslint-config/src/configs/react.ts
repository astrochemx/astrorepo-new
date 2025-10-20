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
    ? (pluginReact.configs['recommended-typescript'] as FlatConfigItem)
    : (pluginReact.configs.recommended as FlatConfigItem);

  const pluginReactPlugins = (pluginReact.configs.all as FlatConfigItem).plugins ?? {};

  const pluginReactSettings = {
    importSource: 'react',
    polymorphicPropName: 'as',
    version: 'detect',
  };

  return [
    {
      name: 'react/plugin',
      files: files,
      plugins: {
        ...pluginReactConfig.plugins,
        '@eslint-react': pluginReactPlugins['@eslint-react'],
        '@eslint-react/dom': pluginReactPlugins['@eslint-react/dom'],
        '@eslint-react/hooks-extra': pluginReactPlugins['@eslint-react/hooks-extra'],
        '@eslint-react/naming-convention': pluginReactPlugins['@eslint-react/naming-convention'],
        '@eslint-react/web-api': pluginReactPlugins['@eslint-react/web-api'],
      },
      settings: {
        ...pluginReact.configs.all.settings,
        ...pluginReactConfig.settings,
        'react': pluginReactSettings,
        'react-x': pluginReactSettings,
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
      name: 'react-hooks/plugin',
      files: files,
      plugins: {
        ...pluginReactHooks.configs.flat['recommended-latest']?.plugins,
        'react-hooks': pluginReactHooks,
      },
    },
    {
      ...pluginReactHooks.configs.flat['recommended-latest'],
      name: 'react-hooks/config',
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
