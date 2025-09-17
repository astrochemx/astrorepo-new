import type { FlatConfigItem } from '../types';

import { GLOB_ASTRO_ALL, GLOB_SRC_JTS, GLOB_SVELTE_ALL, GLOB_VUE } from '../globs';
import { pluginCommand, pluginCommandConfig } from '../modules';

export async function command(): Promise<FlatConfigItem[]> {
  const files = [...GLOB_ASTRO_ALL, GLOB_SRC_JTS, GLOB_SVELTE_ALL, GLOB_VUE];

  return [
    {
      name: 'command/plugin',
      files: files,
      plugins: { command: pluginCommand },
    },
    {
      ...pluginCommandConfig(),
      name: 'command/config',
      files: files,
      rules: {
        ...pluginCommandConfig().rules,
      },
    },
  ] satisfies FlatConfigItem[];
}
