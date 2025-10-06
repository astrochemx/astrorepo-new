import type { FlatConfigItem } from '../types';

import { GLOB_ASTRO_ALL, GLOB_SRC_JTS, GLOB_SVELTE_ALL, GLOB_VUE } from '../globs';
import { loadPlugin } from '../utils';

const pluginSecurity =
  await loadPlugin<typeof import('eslint-plugin-security')>('eslint-plugin-security');

export async function security(): Promise<FlatConfigItem[]> {
  const files = [...GLOB_ASTRO_ALL, GLOB_SRC_JTS, GLOB_SVELTE_ALL, GLOB_VUE];

  return [
    {
      name: 'security/plugin',
      files: files,
      plugins: { security: pluginSecurity },
    },
    {
      ...pluginSecurity.configs.recommended,
      name: 'security/config',
      files: files,
    },
  ] satisfies FlatConfigItem[];
}
