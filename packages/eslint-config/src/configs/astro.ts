import path from 'node:path';
import { hasTypeScript } from '../env';
import { GLOB_ASTRO, GLOB_SRC_JS, GLOB_SRC_TS } from '../globs';
import { globals, parserAstro, parserTS, pluginAstro, pluginJSxAlly } from '../modules';
import type { FlatConfigItem } from '../types';
import { extractRules } from '../utils';

const astroRecommendedRules = extractRules(pluginAstro.configs['flat/recommended']);
const astroJsxAllyRecommendedRules = extractRules(pluginAstro.configs['flat/jsx-a11y-recommended']);

export async function astro(): Promise<FlatConfigItem[]> {
  const files = [GLOB_ASTRO];
  const filesJS = [`${GLOB_ASTRO}/${GLOB_SRC_JS}`];
  const filesTS = [`${GLOB_ASTRO}/${GLOB_SRC_TS}`];
  const useTypeScript = hasTypeScript();

  return [
    {
      name: 'astro/plugin',
      files: [...files, ...filesJS, ...filesTS],
      plugins: {
        'astro': pluginAstro,
        'jsx-a11y': pluginJSxAlly,
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
                /* extraFileExtensions: ['.astro'], projectService: true, */ parser: parserTS,
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
      files: [...files, ...filesJS, ...filesTS],
      rules: {
        ...astroRecommendedRules,
        ...astroJsxAllyRecommendedRules,
      },
    },
  ] satisfies FlatConfigItem[];
}
