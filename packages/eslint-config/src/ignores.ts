export const GLOB_IGNORES: string[] = [
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
  /* grunt */
  '**/.grunt',
  /* history */
  '**/*.*history',
  '**/*.*history*.*',
  '**/*history',
  /* husky */
  '_',
  '**/.husky/_',
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
  '**/report.*.json',
  /* macOS */
  '**/__MACOSX',
  '**/.DS_Store',
  /* microbundle */
  '**/.rpt2_*',
  '**/.rpt2_cache',
  '**/.rts2_*',
  '**/.rts2_cache_cjs',
  '**/.rts2_cache_es',
  '**/.rts2_cache_umd',
  /* next */
  '**/.next',
  '**/.next_*',
  '**/.next-*',
  '**/next-env.d.ts',
  /* node */
  '**/.node_repl_history',
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
  '**/blob-report',
  '**/playwright-report',
  '**/test-results',
  /* pnpm */
  '**/.pnpm',
  '**/.pnpm_*',
  '**/.pnpm-*',
  /* profilers */
  '**/*.cpuprofile',
  /* runtime */
  '**/pids',
  '**/*.pid',
  '**/*.seed',
  '**/*.pid.lock',
  /* serverless */
  '**/.serverless',
  /* storybook */
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
  /* turbo */
  '**/.turbo',
  /* typescript */
  '**/*.tsbuildinfo',
  /* vercel */
  '**/.vercel',
  /* vite */
  '**/.vite',
  /* vitepress */
  '**/.vitepress',
  /* vitest */
  '**/.vitest',
  /* vscode */
  '**/.history',
  '**/.ionide',
  '**/.vs',
  '**/.vscode_*',
  '**/.vscode-*',
  /* webpack */
  '**/.webpack',
  /* yarn */
  '**/.pnp',
  '**/.pnp.*',
  '**/.yarn',
] as const;
