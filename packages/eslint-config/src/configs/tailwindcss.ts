import type { FlatConfigItem } from '../types';

import { GLOB_SRC_ALL } from '../globs';
import { loadPlugin } from '../utils';

const pluginBetterTailwindCSS = await loadPlugin<typeof import('eslint-plugin-better-tailwindcss')>(
  'eslint-plugin-better-tailwindcss',
);

export async function tailwind(options: TailwindOptions = {}): Promise<FlatConfigItem[]> {
  const { entryPoints: cssEntryPoints = [] } = options;

  const files = [...GLOB_SRC_ALL];

  return [
    {
      name: 'tailwind/plugin',
      files: files,
      plugins: { 'better-tailwindcss': pluginBetterTailwindCSS },
    },
    {
      name: 'tailwind/parser',
      files: files,
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
    },
    {
      ...pluginBetterTailwindCSS.configs['recommended-warn']?.rules,
      name: 'tailwind/config',
      files: files,
    },
    ...cssEntryPoints.map((ep) => ({
      files: ep.files,
      settings: {
        'better-tailwindcss': {
          entryPoint: ep.entryPoint,
        },
      },
    })),
  ] satisfies FlatConfigItem[];
}

export interface TailwindOptions {
  entryPoints?: CSSEntrypointsOptions[];
}

export interface CSSEntrypointsOptions {
  /**
   * An array of glob patterns indicating the files that the configuration
   * object should apply to. If not specified, the configuration object applies
   * to all files.
   */
  files: Array<string | string[]>;
  /**
   * The path to the entry file of the css based Tailwind v4 config (eg:
   * `src/global.css`).
   */
  entryPoint: string;
}
