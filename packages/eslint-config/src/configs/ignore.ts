import configFlatGitignore from 'eslint-config-flat-gitignore';

import type { FlatConfigItem, OptionsFiles } from '../types';

import { GLOB_IGNORES } from '../ignores';

export async function ignore(options: OptionsFiles = {}): Promise<FlatConfigItem[]> {
  const { files = [] } = options;

  return [
    {
      ...configFlatGitignore({ strict: false }),
      name: 'ignores/git',
    },
    {
      name: 'ignores/global',
      ignores: GLOB_IGNORES,
    },
    {
      name: 'ignores/user',
      ignores: [...files],
    },
  ] satisfies FlatConfigItem[];
}
