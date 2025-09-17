import type { Linter } from 'eslint';

import type { FlatConfigItem } from '../types';

import { GLOB_BLOCKS_IN_MD, GLOB_MD } from '../globs';
import { pluginMarkdown, pluginMarkdownLinks, pluginMarkdownPreferences } from '../modules';

const codeBlocksRules: Linter.RulesRecord = {
  '@typescript-eslint/no-unused-expressions': 'off',
  '@typescript-eslint/no-unused-vars': 'off',
  'eol-last': 'off',
  'no-undef': 'off',
  'no-unused-expressions': 'off',
  'no-unused-vars': 'off',
  'padded-blocks': 'off',
  'strict': 'off',
  'unicode-bom': 'off',
};

export async function markdown(): Promise<FlatConfigItem[]> {
  const filesMD = [GLOB_MD];
  const filesBlocksInMD = [GLOB_BLOCKS_IN_MD];

  return [
    {
      name: 'markdown/plugin',
      files: filesMD,
      plugins: { markdown: pluginMarkdown },
    },
    {
      ...pluginMarkdown.configs.recommended,
      name: 'markdown/config/md',
      files: filesMD,
      language: 'markdown/gfm',
      languageOptions: {
        frontmatter: 'yaml',
      },
      processor: 'markdown/markdown',
    },
    {
      name: 'markdown/config/code-blocks',
      files: filesBlocksInMD,
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            impliedStrict: true,
          },
        },
      },
      rules: {
        ...codeBlocksRules,
      },
    },
    {
      name: 'markdown/overrides',
      files: filesMD,
      rules: {
        'markdown/no-html': 'off',
      },
    },
    {
      name: 'markdown-links/plugin',
      files: filesMD,
      plugins: { markdown: pluginMarkdownLinks },
    },
    {
      ...pluginMarkdownLinks.configs.recommended,
      name: 'markdown-links/config',
      files: filesMD,
    },
    {
      name: 'markdown-preferences/plugin',
      files: filesMD,
      plugins: { markdown: pluginMarkdownPreferences },
    },
    {
      ...pluginMarkdownPreferences.configs.recommended,
      name: 'markdown-preferences/config',
      files: filesMD,
    },
  ] satisfies FlatConfigItem[];
}
