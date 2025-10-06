import type { FlatConfigItem } from '../types';

import {
  GLOB_ASTRO,
  GLOB_ASTRO_JS,
  GLOB_ASTRO_TS,
  GLOB_SRC_JS,
  GLOB_SRC_TS,
  GLOB_SVELTE,
  GLOB_SVELTE_JS,
  GLOB_SVELTE_TS,
  GLOB_VUE,
} from '../globs';
import { loadPlugin } from '../utils';

const pluginJSDoc = await loadPlugin<typeof import('eslint-plugin-jsdoc')>('eslint-plugin-jsdoc');

export async function jsdoc(): Promise<FlatConfigItem[]> {
  const filesJS = [GLOB_ASTRO_JS, GLOB_SRC_JS, GLOB_SVELTE_JS];
  const filesTS = [GLOB_ASTRO, GLOB_ASTRO_TS, GLOB_SRC_TS, GLOB_SVELTE, GLOB_SVELTE_TS, GLOB_VUE];
  const filesAll = [...filesJS, ...filesTS];

  return [
    {
      name: 'jsdoc/plugin',
      files: filesAll,
      plugins: { jsdoc: pluginJSDoc },
    },
    {
      ...pluginJSDoc.configs['flat/contents'],
      ...pluginJSDoc.configs['flat/logical'],
      ...pluginJSDoc.configs['flat/stylistic'],
      name: 'jsdoc/plugin/javascript',
      files: filesJS,
    },
    {
      ...pluginJSDoc.configs['flat/contents-typescript'],
      ...pluginJSDoc.configs['flat/logical-typescript'],
      ...pluginJSDoc.configs['flat/stylistic-typescript'],
      name: 'jsdoc/plugin/typescript',
      files: filesTS,
    },
    {
      name: 'jsdoc/overrides',
      files: filesAll,
      rules: {
        'jsdoc/check-line-alignment': ['off'],
        'jsdoc/lines-before-block': ['off'],
        'jsdoc/tag-lines': ['warn', 'never', { endLines: 1, startLines: 1 }],
      },
    },
  ] satisfies FlatConfigItem[];
}
