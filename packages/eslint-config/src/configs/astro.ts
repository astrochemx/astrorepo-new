import path from 'node:path';
import globals from 'globals';

import type { FlatConfigItem } from '../types';

import { hasTypeScript } from '../env';
import { GLOB_ASTRO, GLOB_SRC_JS, GLOB_SRC_TS } from '../globs';
import { extractRules, loadPlugin } from '../utils';

const [parserAstro, pluginAstro, pluginJSXA11y, { parser: parserTS }] = await Promise.all([
  loadPlugin<typeof import('astro-eslint-parser')>('astro-eslint-parser'),
  loadPlugin<typeof import('eslint-plugin-astro')>('eslint-plugin-astro'),
  loadPlugin<typeof import('eslint-plugin-jsx-a11y')>('eslint-plugin-jsx-a11y'),
  loadPlugin<typeof import('typescript-eslint')>('typescript-eslint'),
] as const);

const astroRecommendedRules = extractRules(pluginAstro.configs['flat/recommended']);
const astroJSXA11yRecommendedRules = extractRules(pluginAstro.configs['flat/jsx-a11y-recommended']);

export async function astro(): Promise<FlatConfigItem[]> {
  const files = [GLOB_ASTRO];
  const filesJS = [`${GLOB_ASTRO}/${GLOB_SRC_JS}`];
  const filesTS = [`${GLOB_ASTRO}/${GLOB_SRC_TS}`];
  const filesAll = [...files, ...filesJS, ...filesTS];

  const useTypeScript = hasTypeScript();

  return [
    {
      name: 'astro/plugin',
      files: filesAll,
      plugins: {
        'astro': pluginAstro,
        'jsx-a11y': pluginJSXA11y,
      },
    },
    {
      name: 'astro/parser',
      files: files,
      languageOptions: {
        ecmaVersion: 'latest',
        globals: {
          ...globals.es2026,
          ...globals.node,
          ...globals.serviceworker,
          ...globals['shared-node-browser'],
          'astro/astro': true,
          ...pluginAstro.environments.astro.globals,
        },
        parser: parserAstro,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          ecmaVersion: 'latest',
          sourceType: 'module',
          ...(useTypeScript
            ? {
                // extraFileExtensions: ['.astro'],
                // projectService: true,
                parser: parserTS,
                tsconfigRootDir: path.normalize(process.cwd()),
              }
            : {}),
        },
        sourceType: 'module',
      },
      processor: useTypeScript ? 'astro/client-side-ts' : 'astro/astro',
    },
    {
      name: 'astro/javascript',
      files: filesJS,
      languageOptions: {
        ecmaVersion: 'latest',
        globals: {
          ...globals.browser,
          ...globals.es2026,
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
      rules: {
        'prettier/prettier': 'off',
      },
    },
    useTypeScript
      ? {
          name: 'astro/typescript',
          files: filesTS,
          languageOptions: {
            ecmaVersion: 'latest',
            globals: {
              ...globals.browser,
              ...globals.es2026,
              ...globals.serviceworker,
            },
            parser: parserTS,
            parserOptions: {
              ecmaFeatures: {
                jsx: true,
              },
              ecmaVersion: 'latest',
              project: null,
              projectService: false,
              sourceType: 'module',
              tsconfigRootDir: path.normalize(process.cwd()),
            },
            sourceType: 'module',
          },
          rules: {
            'prettier/prettier': 'off',
          },
        }
      : {},
    {
      name: 'astro/rules',
      files: filesAll,
      rules: {
        ...astroRecommendedRules,
        ...astroJSXA11yRecommendedRules,
      },
    },
  ] satisfies FlatConfigItem[];
}
