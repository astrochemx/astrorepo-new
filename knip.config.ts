import type { KnipConfig } from 'knip';

export default {
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
      ignoreDependencies: [
        '@arethetypeswrong/core',
        '@astrochemx/cspell-config',
        '@turbo/gen',
        '@types/vscode',
        '@vitest/coverage-v8',
        'bumpp',
        'concurrently',
        'markdownlint-cli2',
        'npm-run-all2',
        'pnpm',
        'rollup-plugin-visualizer',
        'simple-git-hooks',
        'tailwindcss',
        'trash-cli',
        'tsx',
        'vercel',
      ],
    },
    'apps/docs': {
      // @keep-sorted
      ignore: [
        'db/config.ts',
        'db/seed.ts',
        'ec.config.mjs',
        'scripts/get-local-ip.mjs',
        'scripts/pagefind-fix.mjs',
        'src/astro-jsx.d.ts',
        'src/content/nav/uk.ts',
        'src/env.d.ts',
        'src/plugins/rehype/external-link-caret.ts',
        'src/routeData.ts',
        'src/styles/fonts.css',
        'src/styles/global.css',
      ],
      // @keep-sorted
      ignoreDependencies: [/^.*$/],
    },
    'packages/common': {
      // @keep-sorted
      ignore: [],
      // @keep-sorted
      ignoreDependencies: [],
    },
    'packages/commitlint-config': {
      // @keep-sorted
      ignore: [],
      // @keep-sorted
      ignoreDependencies: ['@commitlint/format', '@commitlint/types'],
    },
    'packages/cspell-config': {
      // @keep-sorted
      ignore: [],
      // @keep-sorted
      ignoreDependencies: ['cspell'],
    },
    'packages/eslint-config': {
      // @keep-sorted
      ignore: ['eslint.modules.d.ts'],
      // @keep-sorted
      ignoreDependencies: [/^.*$/],
    },
    'packages/prettier-config': {
      // @keep-sorted
      ignore: [],
      // @keep-sorted
      ignoreDependencies: ['prettier'],
    },
    'packages/stylelint-config': {
      // @keep-sorted
      ignore: [],
      // @keep-sorted
      ignoreDependencies: ['stylelint'],
    },
    'packages/tsdown-config': {
      // @keep-sorted
      ignore: [],
      // @keep-sorted
      ignoreDependencies: ['tsdown'],
    },
    'packages/typescript-config': {
      // @keep-sorted
      ignore: [],
      // @keep-sorted
      ignoreDependencies: ['@astrojs/ts-plugin', 'react'],
    },
  },
  // https://github.com/webpro-nl/knip/issues/1008#issuecomment-2756572278
  compilers: {
    css: (text: string) =>
      [...text.replace('plugin', 'import').matchAll(/(?<=@)(?:import|plugin)[^;]+/g)].join('\n'),
  },
} as const satisfies KnipConfig;
