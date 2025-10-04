export const ignores = [
  /* configs */
  '**/.all-contributors*',
  '**/.editorconfig',
  '**/.markdownlint-cli2.*',
  '**/.markdownlint.*',
  '**/.ncurc.*',
  '**/.oxlint*.json',
  '**/biome.json*',
  '**/commitlint.config.*',
  '**/cspell.config.*',
  '**/eslint.config.*',
  '**/jsconfig*.json',
  '**/knip.config.*',
  '**/lint-staged.config.*',
  '**/oxlint*.json',
  '**/prettier.config.*',
  '**/simple-git-hooks.*',
  '**/taze.config.*',
  '**/tsconfig*.json',
  '**/turbo.json*',
  /* github */
  '**/.github/config.yml',
  '**/.github/dependabot.yml',
  '**/.github/labeler.yml',
  /* ignores */
  '**/*.*ignore',
  /* package.json(5) / package.yaml */
  '**/package*.json*',
  '**/package*.yaml',
  /* pnpm */
  '**/pnpm-workspace.yaml',
  /* svg */
  '**/*.svg',
  /* vscode */
  '**/*.code-snippets',
  '**/extensions*.json',
  '**/keybindings*.json',
  '**/launch*.json',
  '**/settings*.json',
  '**/tasks*.json',
  ///
  ///
  /* ============================== */
  ///
  /* antfu */
  '**/.eslint-config-inspector',
  '**/.node-modules-inspector',
  '**/.vite-inspect',
  '**/*typegen.d.ts',
  /* astro */
  '**/.astro',
  '**/.astro_*',
  '**/.astro-*',
  /* auth */
  '**/.auth',
  /* backup */
  '**/*.*backup',
  '**/*.*bak',
  '**/*.*ori',
  '**/*.*orig',
  '**/*.*original',
  '**/*.backup',
  '**/*.backup.*',
  '**/*.bak',
  '**/*.bak.*',
  '**/*.ori',
  '**/*.ori.*',
  '**/*.orig',
  '**/*.orig.*',
  '**/*.original',
  '**/*.original.*',
  '**/*backup',
  /* bundled */
  '**/*.bundled*.*',
  /* cache */
  '**/*.*cache',
  '**/*.*cache*.*',
  '**/*.eslint*cache',
  '**/*.parcel*cache',
  '**/*.prettier*cache',
  '**/*.stylelint*cache',
  '**/*cache',
  /* changesets */
  // '**/.changeset',
  /* content-collections */
  '**/.content-collections',
  /* contentlayer */
  '**/.contentlayer',
  /* coverage */
  '**/.nyc_output',
  '**/*.cov',
  '**/*.coverage.*',
  '**/*.coverage',
  '**/*.lcov',
  '**/coverage',
  '**/lib-cov',
  /* dependencies */
  '**/bower_components',
  '**/jspm_packages',
  '**/node_modules',
  '**/web_modules',
  /* diff */
  '**/*.diff',
  '**/*.patch',
  /* docusaurus */
  '**/.docusaurus',
  /* dynamodb */
  '**/.dynamodb',
  /* environment */
  '**/.aws',
  '**/.direnv',
  '**/.env',
  '**/.env*.local',
  '**/.env*.prod*',
  '**/.envrc',
  '**/*.local',
  /* fumadocs */
  '**/.source',
  /* fusebox */
  '**/.fusebox',
  /* git */
  '**/.git',
  /* gradle */
  '**/.gradle',
  /* grunt */
  '**/.grunt',
  /* history */
  '**/*.*history',
  '**/*.*history*.*',
  '**/*history',
  /* husky */
  '**/_',
  '**/.husky/_',
  /* jetbrains */
  '**/.idea',
  /* keys */
  '**/*.ca',
  '**/*.cert',
  '**/*.crt',
  '**/*.csr',
  '**/*.der',
  '**/*.kdb',
  '**/*.key',
  '**/*.key-mrc',
  '**/*.key.json',
  '**/*.keys',
  '**/*.org',
  '**/*.p12',
  '**/*.pem',
  '**/*.priv',
  '**/*.rnd',
  '**/*.rsa',
  '**/*.smime',
  '**/*.ssh',
  '**/*.ssh-key',
  '**/*.ssleay',
  /* local */
  '**/*.local',
  '**/*.local.*',
  /* lock */
  '**/*.lock',
  '**/bun.lock',
  '**/bun.lockb',
  '**/deno.lock',
  '**/package-lock.json',
  '**/pnpm-lock.yaml',
  '**/yarn.lock',
  /* logs */
  '**/.*-debug.log*',
  '**/.*-error.log*',
  '**/*-debug.log*',
  '**/*-error.log*',
  '**/*.log',
  '**/logs',
  /* macOS */
  '**/__MACOSX',
  '**/.DS_Store',
  '**/*.icloud',
  /* maps */
  '**/*.map',
  '**/*.map.*',
  /* microbundle */
  '**/.rpt2_*',
  '**/.rpt2_cache',
  '**/.rts2_*',
  '**/.rts2_cache_cjs',
  '**/.rts2_cache_es',
  '**/.rts2_cache_umd',
  /* minimized */
  '**/*.min',
  '**/*.min.*',
  /* next */
  '**/.next',
  '**/.next_*',
  '**/.next-*',
  '**/next-env.d.ts',
  /* nitro */
  '**/.nitro*',
  /* node */
  '**/.node_repl_history',
  /* node-waf */
  '**/.lock-wscript',
  /* npm */
  '**/*.tgz',
  '**/.npm',
  /* nuxt */
  '**/.nuxt',
  '**/.nuxt_*',
  '**/.nuxt-*',
  /* output */
  '**/.*out',
  '**/.*output',
  '**/.bin',
  '**/*_dist',
  '**/*-dist',
  '**/build_*',
  '**/build-*',
  '**/build',
  '**/dev-dist',
  '**/dist_*',
  '**/dist-*',
  '**/dist-ssr',
  '**/dist',
  // '**/lib',
  '**/out',
  '**/output',
  /* playwright */
  '**/.dev_profile*',
  '**/.local-browsers*',
  '**/.test_cache*',
  '**/blob-report',
  '**/coverage-report',
  '**/playwright-report',
  '**/test-results',
  /* pnpm */
  '**/.pnpm',
  '**/.pnpm_*',
  '**/.pnpm-*',
  /* profilers */
  '**/*.cpuprofile',
  /* public */
  // '**/public',
  /* qwik */
  '**/.qwik*',
  /* reports */
  '**/report.*.json',
  /* runtime */
  '**/pids',
  '**/*.pid',
  '**/*.seed',
  '**/*.pid.lock',
  /* serverless */
  '**/.serverless',
  /* solid */
  '**/.solid*',
  /* storybook */
  // '**/.storybook',
  '**/storybook-static',
  /* svelte */
  '**/.svelte',
  '**/.svelte-kit',
  '**/.svelte_*',
  '**/.svelte-*',
  /* temporary */
  '**/.temp*',
  '**/.tmp*',
  '**/*.*temp',
  '**/*.*tmp',
  '**/*.temp.*',
  '**/*.tmp.*',
  '**/*temp',
  '**/*tmp',
  '**/tmp*',
  /* tern-port */
  '**/.tern-port',
  /* traces */
  '**/*.trace',
  /* turbo */
  '**/.turbo',
  /* typescript */
  '**/*.tsbuildinfo',
  /* vercel */
  '**/.vercel',
  /* vinxi */
  '**/.vinxi*',
  /* visualstudio */
  '**/.bin',
  '**/bin/Debug/**/*',
  '**/bin/Release/**/*',
  '**/int',
  '**/obj',
  '**/out',
  /* vite */
  '**/.vite_*',
  '**/.vite-*',
  '**/.vite*',
  /* vitepress */
  '**/.vitepress*',
  /* vitest */
  '**/.vitest_*',
  '**/.vitest-*',
  '**/.vitest*',
  /* vscode */
  '**/.history',
  '**/.ionide',
  '**/.vs',
  '**/.vscode_*',
  '**/.vscode-*',
  '**/.vscode/mise-tools',
  /* webpack */
  '**/.webpack_*',
  '**/.webpack-*',
  '**/.webpack*',
  /* wrangler */
  '**/.dev.vars',
  '**/.wrangler',
  /* yarn */
  '**/.pnp',
  '**/.pnp.*',
  '**/.yarn',
] as const;
