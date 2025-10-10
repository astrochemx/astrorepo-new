import type { FlatConfigItem } from '../types';

import { GLOB_SRC } from '../globs';
import { loadPlugin } from '../utils';

const pluginSonar =
  await loadPlugin<typeof import('eslint-plugin-sonarjs')>('eslint-plugin-sonarjs');

export async function sonar(): Promise<FlatConfigItem[]> {
  const files = [...GLOB_SRC];

  return [
    {
      name: 'sonar/plugin',
      files: files,
      plugins: { sonarjs: pluginSonar },
    },
    {
      ...pluginSonar.configs.recommended,
      name: 'sonar/config',
      files: files,
    },
  ] satisfies FlatConfigItem[];
}
