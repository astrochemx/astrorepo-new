import type { FlatConfigItem } from '../types';

import { GLOB_SRC_ALL } from '../globs';
import { pluginUnoCSS } from '../modules';

export async function unocss(): Promise<FlatConfigItem[]> {
  const files = [...GLOB_SRC_ALL].flat();

  return [
    {
      name: 'unocss/plugin',
      files: files,
      plugins: { unocss: pluginUnoCSS },
    },
    {
      ...pluginUnoCSS.configs.flat,
      name: 'unocss/config',
      files: files,
      rules: {
        ...pluginUnoCSS.configs.flat.rules,
        'unocss/order': 'warn',
        'unocss/order-attributify': 'warn',
      },
    },
  ] satisfies FlatConfigItem[];
}
