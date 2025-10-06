import type { FlatConfigItem } from '../types';

import { GLOB_TOML } from '../globs';
import { extractRules, loadPlugin } from '../utils';

const [pluginTOML, parserTOML] = await Promise.all([
  loadPlugin<typeof import('eslint-plugin-toml')>('eslint-plugin-toml'),
  loadPlugin<typeof import('toml-eslint-parser')>('toml-eslint-parser'),
] as const);

const standardRules = extractRules(pluginTOML.configs['flat/standard']);

export async function toml(): Promise<FlatConfigItem[]> {
  const files = [GLOB_TOML];

  return [
    {
      name: 'toml/plugin',
      files: files,
      plugins: { toml: pluginTOML },
    },
    {
      name: 'toml/parser',
      files: files,
      languageOptions: {
        parser: parserTOML,
      },
    },
    {
      name: 'toml/config',
      files: files,
      rules: {
        ...standardRules,
      },
    },
    {
      name: 'toml/overrides',
      files: files,
      rules: {
        'no-irregular-whitespace': 'off',
        'spaced-comment': 'off',
      },
    },
  ] satisfies FlatConfigItem[];
}
