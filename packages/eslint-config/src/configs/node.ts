import type { FlatConfigItem } from '../types';

import { GLOB_CJTS, GLOB_JTS, GLOB_MJTS, GLOB_SRC_JTS } from '../globs';
import { loadPlugin } from '../utils';

const [pluginModuleInterop, pluginNode] = await Promise.all([
  loadPlugin<typeof import('eslint-plugin-module-interop')>('eslint-plugin-module-interop'),
  loadPlugin<typeof import('eslint-plugin-n')>('eslint-plugin-n'),
] as const);

export async function node(): Promise<FlatConfigItem[]> {
  const files = [GLOB_SRC_JTS];
  const filesCommon = [GLOB_CJTS];
  const filesModule = [GLOB_MJTS];
  const filesVariant = [GLOB_JTS];
  const filesAll = [...new Set([...files, ...filesCommon, ...filesModule, ...filesVariant])];

  return [
    {
      name: 'module-interop/plugin',
      files: filesAll,
      plugins: { 'module-interop': pluginModuleInterop },
    },
    {
      ...pluginModuleInterop.configs.recommended,
      name: 'module-interop/config',
      files: filesAll,
    },
    {
      name: 'node/plugin',
      files: filesAll,
      plugins: { n: pluginNode },
    },
    {
      ...pluginNode.configs['flat/recommended'],
      name: 'node/config/variant',
      files: filesVariant,
    },
    {
      ...pluginNode.configs['flat/recommended-script'],
      name: 'node/config/common',
      files: filesCommon,
    },
    {
      ...pluginNode.configs['flat/recommended-module'],
      name: 'node/config/module',
      files: filesModule,
    },
    {
      name: 'node/overrides',
      files: filesAll,
      rules: {
        'n/no-missing-import': 'off',
      },
    },
  ] satisfies FlatConfigItem[];
}
