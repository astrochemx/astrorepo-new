import type { FlatConfigItem } from '../types';

import { GLOB_SRC } from '../globs';
import { loadPlugin } from '../utils';

const pluginRegExp =
  await loadPlugin<typeof import('eslint-plugin-regexp')>('eslint-plugin-regexp');

export async function regexp(): Promise<FlatConfigItem[]> {
  const files = [...GLOB_SRC];

  return [
    {
      name: 'regexp/plugin',
      files: files,
      plugins: { regexp: pluginRegExp },
    },
    {
      ...pluginRegExp.configs['flat/recommended'],
      name: 'regexp/config',
      files: files,
    },
  ] satisfies FlatConfigItem[];
}
