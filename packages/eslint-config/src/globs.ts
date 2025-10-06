export const GLOB_SRC_JS = '**/*.?([cm])js?(x)' as const;
export const GLOB_SRC_TS = '**/*.?([cm])ts?(x)' as const;
export const GLOB_SRC_JTS = '**/*.?([cm])[jt]s?(x)' as const;

export const GLOB_JS = '**/*.js?(x)' as const;
export const GLOB_TS = '**/*.ts?(x)' as const;
export const GLOB_JTS = '**/*.[jt]s?(x)' as const;

export const GLOB_CJS = '**/*.cjs?(x)' as const;
export const GLOB_CTS = '**/*.cts?(x)' as const;
export const GLOB_CJTS = '**/*.c[jt]s?(x)' as const;

export const GLOB_MJS = '**/*.mjs?(x)' as const;
export const GLOB_MTS = '**/*.mts?(x)' as const;
export const GLOB_MJTS = '**/*.m[jt]s?(x)' as const;

export const GLOB_CMJS = '**/*.?([cm])js' as const;
export const GLOB_CMTS = '**/*.?([cm])ts' as const;
export const GLOB_CMJTS = '**/*.?([cm])[jt]s' as const;

export const GLOB_CMJSX = '**/*.?([cm])jsx' as const;
export const GLOB_CMTSX = '**/*.?([cm])tsx' as const;
export const GLOB_CMJTSX = '**/*.?([cm])[jt]sx' as const;

export const GLOB_ASTRO = '**/*.astro' as const;
export const GLOB_ASTRO_JS = '**/*.astro/**/*.js' as const;
export const GLOB_ASTRO_TS = '**/*.astro/**/*.ts' as const;
export const GLOB_ASTRO_JTS = '**/*.astro/**/*.{js,ts}' as const;
export const GLOB_ASTRO_ALL: string[] = [GLOB_ASTRO, GLOB_ASTRO_JTS] as const;

export const GLOB_SVELTE = '**/*.svelte' as const;
export const GLOB_SVELTE_JS = '**/*.svelte.js' as const;
export const GLOB_SVELTE_TS = '**/*.svelte.ts' as const;
export const GLOB_SVELTE_JTS = '**/*.svelte.{js,ts}' as const;
export const GLOB_SVELTE_ALL = '**/*.svelte?(.{js,ts})' as const;

export const GLOB_VUE = '**/*.vue' as const;

export const GLOB_CSS = '**/*.css' as const;
export const GLOB_LESS = '**/*.less' as const;
export const GLOB_PCSS = '**/*.{p,post}css' as const;
export const GLOB_SASS = '**/*.sass' as const;
export const GLOB_SCSS = '**/*.scss' as const;
export const GLOB_STYLE = '**/*.{c,le,pc,postc,sa,sc}ss' as const;

export const GLOB_HTML = '**/*.htm?(l)' as const;
export const GLOB_SVG = '**/*.svg' as const;
export const GLOB_XML = '**/*.xml' as const;

export const GLOB_JSON = '**/*.json' as const;
export const GLOB_JSON5 = '**/*.json5' as const;
export const GLOB_JSONC = '**/*.jsonc' as const;
export const GLOB_JSONL = '**/*.jsonl' as const;
export const GLOB_JSON_ALL = '**/*.json?([5cl])' as const;

export const GLOB_TOML = '**/*.toml' as const;

export const GLOB_YAML = '**/*.y?(a)ml' as const;

export const GLOB_GRAPHQL = '**/*.{g,graph}ql' as const;

export const GLOB_MD = '**/*.md' as const;
export const GLOB_MDX = '**/*.mdx' as const;
export const GLOB_MD_MDX = '**/*.{md,mdx}' as const;
export const GLOB_QUARTO = '**/*.{qmd,Rmd}' as const;

export const GLOB_MD_IN_MD = '**/*.md/*.md' as const;
export const GLOB_MD_IN_MDX = '**/*.mdx/*.md' as const;
export const GLOB_MD_CODE: string = `${GLOB_MD}/${GLOB_SRC_JTS}` as const;
export const GLOB_MDX_CODE: string = `${GLOB_MDX}/${GLOB_SRC_JTS}` as const;
export const GLOB_MD_MDX_CODE: string = `${GLOB_MD_MDX}/${GLOB_SRC_JTS}` as const;

export const GLOB_BLOCKS_IN_MD: string = `${GLOB_MD}/**` as const;
export const GLOB_BLOCKS_IN_MDX: string = `${GLOB_MDX}/**` as const;
export const GLOB_BLOCKS_IN_MD_MDX: string = `${GLOB_MD_MDX}/**` as const;

export const GLOB_SRC: string[] = [
  ...GLOB_ASTRO_ALL,
  GLOB_MDX,
  GLOB_SRC_JTS,
  GLOB_SVELTE_ALL,
  GLOB_VUE,
] as const;

export const GLOB_SRC_ALL: string[] = [
  GLOB_ASTRO,
  GLOB_ASTRO_JTS,
  GLOB_GRAPHQL,
  GLOB_HTML,
  GLOB_JSON_ALL,
  GLOB_MD_MDX,
  GLOB_QUARTO,
  GLOB_SRC_JTS,
  GLOB_STYLE,
  GLOB_SVELTE_ALL,
  GLOB_SVG,
  GLOB_TOML,
  GLOB_VUE,
  GLOB_XML,
  GLOB_YAML,
] as const;

export const GLOB_SRC_JSX: string[] = [
  GLOB_ASTRO,
  GLOB_ASTRO_JTS,
  GLOB_HTML,
  GLOB_MD_MDX,
  GLOB_QUARTO,
  GLOB_SRC_JTS,
  GLOB_SVELTE_ALL,
  GLOB_SVG,
  GLOB_VUE,
  GLOB_XML,
] as const;

export const FILE_EXT_ASTRO = '.astro';
export const FILE_EXT_MDX = '.mdx';
export const FILE_EXT_SVELTE = '.svelte';
export const FILE_EXT_VUE = '.vue';

export const FILE_EXT_SRC = '.?([cm])[jt]s?(x)';

export const GLOB_TESTS: string[] = [
  `**/__test__/**/*${FILE_EXT_SRC}`,
  `**/__tests__/**/*${FILE_EXT_SRC}`,
  `**/*.bench${FILE_EXT_SRC}`,
  `**/*.benchmark${FILE_EXT_SRC}`,
  `**/*.spec${FILE_EXT_SRC}`,
  `**/*.test${FILE_EXT_SRC}`,
  `**/e2e/**/*${FILE_EXT_SRC}`,
  `**/spec/**/*${FILE_EXT_SRC}`,
  `**/specs/**/*${FILE_EXT_SRC}`,
  `**/test/**/*${FILE_EXT_SRC}`,
  `**/tests/**/*${FILE_EXT_SRC}`,
] as const;

export const GLOB_TESTS_TYPE: string[] = [
  `**/*.test-d${FILE_EXT_SRC}`,
  `**/*.spec-d${FILE_EXT_SRC}`,
] as const;

export const GLOB_PKG_JSON = '**/package*.json' as const;
export const GLOB_PKG_JSON5 = '**/package*.json5' as const;
export const GLOB_PKG_JSONC = '**/package*.jsonc' as const;
export const GLOB_PKG_JSON_ALL = '**/package*.json?([5c])' as const;

export const GLOB_PNPM_YAML = '**/pnpm-workspace.yaml' as const;

export const GLOB_DIST = '**/dist' as const;
export const GLOB_NODE_MODULES = '**/node_modules' as const;

export const GLOB_LOCKFILE: string[] = [
  '**/bun.lock',
  '**/bun.lockb',
  '**/deno.lock',
  '**/package-lock.json',
  '**/pnpm-lock.yaml',
  '**/yarn.lock',
] as const;

export const GLOB_JSON_AS_JSONC: string[] = [
  '**/.oxlint*.json',
  '**/.vscode/**/*.json',
  '**/*.code-snippets',
  '**/biome.json',
  '**/extensions*.json',
  '**/keybindings*.json',
  '**/launch*.json',
  '**/oxlint*.json',
  '**/settings*.json',
  '**/tasks*.json',
  '**/tsconfig*.json',
  '**/user-data/User/**/*.json',
] as const;
