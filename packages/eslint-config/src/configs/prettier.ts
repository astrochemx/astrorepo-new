import type { FlatConfigItem } from '../types';

import { GLOB_SRC_ALL } from '../globs';
import { pluginPrettier, pluginPrettierRecommended } from '../modules';

export async function prettier(): Promise<FlatConfigItem[]> {
  const files = [...GLOB_SRC_ALL].flat();

  return [
    {
      name: 'prettier/plugin',
      files: files,
      plugins: { prettier: pluginPrettier },
    },
    {
      ...pluginPrettierRecommended,
      name: 'prettier/config',
      files: files,
    },
  ] satisfies FlatConfigItem[];
}
