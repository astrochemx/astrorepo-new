import type { FlatConfigItem } from '../types';

import { GLOB_SRC } from '../globs';
import { loadPlugin } from '../utils';

const [pluginCommand, pluginCommandConfig] = await Promise.all([
  loadPlugin<typeof import('eslint-plugin-command')>('eslint-plugin-command'),
  loadPlugin<typeof import('eslint-plugin-command/config')>('eslint-plugin-command/config'),
] as const);

export async function command(): Promise<FlatConfigItem[]> {
  const files = GLOB_SRC;

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
    },
  ] satisfies FlatConfigItem[];
}
