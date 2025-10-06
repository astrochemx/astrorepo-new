import type { FlatConfigItem } from '../types';

import { GLOB_SRC } from '../globs';
import { loadPlugin } from '../utils';

const [pluginComments, pluginCommentsConfigs] = await Promise.all([
  loadPlugin<typeof import('@eslint-community/eslint-plugin-eslint-comments')>(
    '@eslint-community/eslint-plugin-eslint-comments',
  ),
  loadPlugin<typeof import('@eslint-community/eslint-plugin-eslint-comments/configs')>(
    '@eslint-community/eslint-plugin-eslint-comments/configs',
  ),
] as const);

export async function comments(): Promise<FlatConfigItem[]> {
  const files = GLOB_SRC;

  return [
    {
      name: 'comments/plugin',
      files: files,
      plugins: { comments: pluginComments },
    },
    // @ts-expect-error: types
    {
      ...pluginCommentsConfigs.recommended,
      name: 'comments/config',
      files: files,
    },
    {
      name: 'comments/overrides',
      files: files,
      rules: {
        '@eslint-community/eslint-comments/disable-enable-pair': 'off',
      },
    },
  ] satisfies FlatConfigItem[];
}
