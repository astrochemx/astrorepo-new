import type { KnipConfig } from 'knip';

export default {
  // https://github.com/webpro-nl/knip/issues/1008#issuecomment-2756572278
  compilers: {
    css: (text: string) =>
      [...text.replace('plugin', 'import').matchAll(/(?<=@)(?:import|plugin)[^;]+/g)].join('\n'),
  },
  ignoreExportsUsedInFile: {
    interface: true,
    type: true,
  },
  workspaces: {
    '.': {
      // @keep-sorted
      ignore: [
        '.crossnote/**/*',
        '.ncurc.cjs',
        '.pnpmfile.cjs',
        'cspell.config.mjs',
        'dotfiles/**/*',
        'scripts/**/*',
        'simple-git-hooks.mjs',
        'taze.config.ts',
      ],
      // @keep-sorted
      ignoreDependencies: ['@astrochemx/cspell-config'],
    },
    'packages/commitlint-config': {
      // @keep-sorted
      ignore: [],
      // @keep-sorted
      ignoreDependencies: [],
    },
    'packages/common': {
      // @keep-sorted
      ignore: [],
      // @keep-sorted
      ignoreDependencies: [],
    },
    'packages/cspell-config': {
      // @keep-sorted
      ignore: [],
      // @keep-sorted
      ignoreDependencies: [],
    },
    'packages/eslint-config': {
      // @keep-sorted
      ignore: [],
      // @keep-sorted
      ignoreDependencies: [],
    },
    'packages/prettier-config': {
      // @keep-sorted
      ignore: [],
      // @keep-sorted
      ignoreDependencies: [],
    },
    'packages/stylelint-config': {
      // @keep-sorted
      ignore: [],
      // @keep-sorted
      ignoreDependencies: [],
    },
    'packages/tsdown-config': {
      // @keep-sorted
      ignore: [],
      // @keep-sorted
      ignoreDependencies: [],
    },
    'packages/typescript-config': {
      // @keep-sorted
      ignore: [],
      // @keep-sorted
      ignoreDependencies: [],
    },
  },
} as const satisfies KnipConfig;
