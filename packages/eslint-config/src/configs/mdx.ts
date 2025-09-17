import type { Linter } from 'eslint';

import type { FlatConfigItem } from '../types';

import { GLOB_BLOCKS_IN_MDX, GLOB_MDX } from '../globs';
import { parserMDX, pluginMDX } from '../modules';

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

export async function mdx(): Promise<FlatConfigItem[]> {
  const filesMDX = [GLOB_MDX];
  const filesBlocksInMDX = [GLOB_BLOCKS_IN_MDX];

  return [
    {
      name: 'mdx/plugin',
      files: filesMDX,
      plugins: { mdx: pluginMDX },
    },
    {
      ...pluginMDX.configs.flat,
      name: 'mdx/config/mdx',
      files: filesMDX,
      languageOptions: {
        ...pluginMDX.configs.flat.languageOptions,
        globals: {
          ...pluginMDX.configs.flat.languageOptions?.globals,
          React: false,
        },
        parser: parserMDX,
      },
      processor: pluginMDX.createRemarkProcessor({ lintCodeBlocks: true }),
      rules: {
        ...pluginMDX.configs.flat.rules,
        'mdx/remark': 'warn',
        'no-unused-expressions': 'warn',
        'react/react-in-jsx-scope': 'off',
      },
    },
    {
      ...pluginMDX.configs.flatCodeBlocks,
      name: 'mdx/config/code-blocks',
      files: filesBlocksInMDX,
      languageOptions: {
        ...pluginMDX.configs.flatCodeBlocks.languageOptions,
        parserOptions: {
          ...pluginMDX.configs.flatCodeBlocks.languageOptions?.parserOptions,
          ecmaFeatures: {
            ...pluginMDX.configs.flatCodeBlocks.languageOptions?.parserOptions?.ecmaFeatures,
            impliedStrict: true,
          },
        },
      },
      rules: {
        ...codeBlocksRules,
        ...pluginMDX.configs.flatCodeBlocks.rules,
      },
    },
  ] satisfies FlatConfigItem[];
}
