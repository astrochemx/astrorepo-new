import type { FlatConfigItem } from '../types';

import { hasPrettier } from '../env';
import { GLOB_YAML } from '../globs';
import { extractRules, loadPlugin } from '../utils';

const [pluginYML, parserYAML] = await Promise.all([
  loadPlugin<typeof import('eslint-plugin-yml')>('eslint-plugin-yml'),
  loadPlugin<typeof import('yaml-eslint-parser')>('yaml-eslint-parser'),
] as const);

const standardRules = extractRules(pluginYML.configs['flat/standard']);
const prettierRules = extractRules(pluginYML.configs['flat/prettier']);

export async function yaml(): Promise<FlatConfigItem[]> {
  const files = [GLOB_YAML];
  const usePrettier = hasPrettier();

  return [
    {
      name: 'yaml/plugin',
      files: files,
      plugins: { yml: pluginYML },
    },
    {
      name: 'yaml/parser',
      files: files,
      languageOptions: {
        parser: parserYAML,
      },
    },
    {
      name: 'yaml/config',
      files: files,
      rules: {
        ...standardRules,
      },
    },
    {
      name: 'yaml/overrides',
      files: files,
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        'no-irregular-whitespace': 'off',
        'no-unused-vars': 'off',
        'spaced-comment': 'off',
        ...(usePrettier ? prettierRules : {}),
      },
    },
  ] satisfies FlatConfigItem[];
}
