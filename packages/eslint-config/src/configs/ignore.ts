import { GLOB_IGNORES } from '../ignores';
import { gitignoreFlatConfig } from '../modules';
import type { FlatConfigItem, OptionsIgnores } from '../types';

export async function ignore(options: OptionsIgnores = {}): Promise<FlatConfigItem[]> {
  const { ignores = [] } = options;

  return [
    {
      ...gitignoreFlatConfig({ strict: false }),
      name: 'ignores/git',
    },
    {
      name: 'ignores/global',
      ignores: GLOB_IGNORES,
    },
    {
      name: 'ignores/user',
      ignores: [...ignores],
    },
  ] satisfies FlatConfigItem[];
}
