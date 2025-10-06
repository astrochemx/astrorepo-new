import type { Linter } from 'eslint';

import type { FlatConfigItem } from '../types';

import { GLOB_BLOCKS_IN_MD, GLOB_MD } from '../globs';
import { extractRules, loadPlugin } from '../utils';

const [pluginMarkdown, pluginMarkdownLinks, pluginMarkdownPreferences] = await Promise.all([
  loadPlugin<typeof import('@eslint/markdown')>('@eslint/markdown'),
  loadPlugin<typeof import('eslint-plugin-markdown-links')>('eslint-plugin-markdown-links'),
  loadPlugin<typeof import('eslint-plugin-markdown-preferences')>(
    'eslint-plugin-markdown-preferences',
  ),
] as const);

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

const recommendedRules = extractRules(pluginMarkdown.configs.recommended);

export async function markdown(): Promise<FlatConfigItem[]> {
  const filesMD = [GLOB_MD];
  const filesBlocksInMD = [GLOB_BLOCKS_IN_MD];
  const filesAll = [...new Set([...filesBlocksInMD, ...filesMD])];

  return [
    {
      name: 'markdown/plugin',
      files: filesAll,
      plugins: { markdown: pluginMarkdown },
    },
    {
      name: 'markdown/config/md',
      files: filesMD,
      language: 'markdown/gfm',
      languageOptions: {
        frontmatter: 'yaml',
      },
      processor: 'markdown/markdown',
      rules: {
        ...recommendedRules,
      },
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
      plugins: {
        ...pluginMarkdownLinks.configs.recommended.plugins,
        'markdown-links': pluginMarkdownLinks,
      },
    },
    {
      ...pluginMarkdownLinks.configs.recommended,
      name: 'markdown-links/config',
      files: filesMD,
      plugins: {},
    },
    {
      name: 'markdown-preferences/plugin',
      files: filesMD,
      plugins: {
        ...pluginMarkdownPreferences.configs.recommended.plugins,
        'markdown-preferences': pluginMarkdownPreferences,
      },
    },
    {
      ...pluginMarkdownPreferences.configs.recommended,
      name: 'markdown-preferences/config',
      files: filesMD,
      plugins: {},
    },
  ] satisfies FlatConfigItem[];
}
