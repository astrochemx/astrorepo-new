import type { FlatConfigItem } from '../types';

import { GLOB_SRC } from '../globs';
import { loadPlugin } from '../utils';

const pluginPromise =
  await loadPlugin<typeof import('eslint-plugin-promise')>('eslint-plugin-promise');

export async function promise(): Promise<FlatConfigItem[]> {
  const files = [...GLOB_SRC];

  return [
    {
      name: 'promise/plugin',
      files: files,
      plugins: { promise: pluginPromise },
    },
    {
      ...pluginPromise.configs['flat/recommended'],
      name: 'promise/config',
      files: files,
    },
  ] satisfies FlatConfigItem[];
}
