import type { FlatConfigItem } from '../types';

import { GLOB_SRC_ALL } from '../globs';
import { loadPlugin } from '../utils';

const pluginUnoCSS =
  await loadPlugin<typeof import('@unocss/eslint-plugin')>('@unocss/eslint-plugin');

export async function unocss(): Promise<FlatConfigItem[]> {
  const files = [...GLOB_SRC_ALL].flat();

  return [
    {
      name: 'unocss/plugin',
      files: files,
      plugins: { ...pluginUnoCSS.configs.flat.plugins, unocss: pluginUnoCSS },
    },
    {
      ...pluginUnoCSS.configs.flat,
      name: 'unocss/config',
      files: files,
      plugins: {},
      rules: {
        ...pluginUnoCSS.configs.flat.rules,
        'unocss/order': 'warn',
        'unocss/order-attributify': 'warn',
      },
    },
  ] satisfies FlatConfigItem[];
}
