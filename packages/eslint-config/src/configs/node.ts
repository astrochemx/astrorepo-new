import type { FlatConfigItem } from '../types';

import { GLOB_COMMON_JTS, GLOB_MODULE_JTS, GLOB_SRC_JTS, GLOB_VARIANT_JTS } from '../globs';
import { pluginNode, pluginNodeDependencies } from '../modules';

export async function node(): Promise<FlatConfigItem[]> {
  const files = [GLOB_SRC_JTS];
  const filesCommon = [GLOB_COMMON_JTS];
  const filesModule = [GLOB_MODULE_JTS];
  const filesVariant = [GLOB_VARIANT_JTS];

  return [
    {
      name: 'node/plugin',
      files: files,
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
      files: filesModule,
      rules: {
        'n/no-missing-import': 'off',
      },
    },
    {
      name: 'node-dependencies/plugin',
      files: files,
      plugins: { nodeDependencies: pluginNodeDependencies },
    },
    {
      ...pluginNodeDependencies.configs['flat/recommended'],
      name: 'node-dependencies/config',
      files: files,
    },
  ] satisfies FlatConfigItem[];
}
