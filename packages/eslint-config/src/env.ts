import type { ProjectManifest } from '@astrochemx/common';

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { isPackageExists } from 'local-pkg';

const cwd = process.cwd();

const pkgJsonFilePath = path.resolve(cwd, './package.json');
const pkgJsonFileContent = fs.readFileSync(pkgJsonFilePath, { encoding: 'utf8' });
const pkgJson = JSON.parse(pkgJsonFileContent) as ProjectManifest & {
  prettier?: Record<string, any>;
};

function pathExists(p: string) {
  try {
    fs.accessSync(path.resolve(cwd, p));
    return true;
  } catch {
    return false;
  }
}

export const hasAstro = (): boolean =>
  isPackageExists('astro') || isPackageExists('@astrojs/starlight');

export const hasNext = (): boolean => isPackageExists('next');

export const hasPnpm = (): boolean =>
  isPackageExists('pnpm') ||
  pathExists('.pnpmfile.cjs') ||
  pathExists('pnpm-lock.yaml') ||
  pathExists('pnpm-workspace.yaml') ||
  pathExists('pnpmfile.cjs') ||
  (pkgJson?.packageManager?.includes('pnpm') ?? false) ||
  !!pkgJson?.pnpm;

export const hasPrettier = (): boolean =>
  isPackageExists('prettier') ||
  pathExists('.prettierrc') ||
  pathExists('.prettierrc.cjs') ||
  pathExists('.prettierrc.cts') ||
  pathExists('.prettierrc.js') ||
  pathExists('.prettierrc.json') ||
  pathExists('.prettierrc.json5') ||
  pathExists('.prettierrc.mjs') ||
  pathExists('.prettierrc.mts') ||
  pathExists('.prettierrc.toml') ||
  pathExists('.prettierrc.ts') ||
  pathExists('.prettierrc.yaml') ||
  pathExists('.prettierrc.yml') ||
  pathExists('prettier.config.cjs') ||
  pathExists('prettier.config.cts') ||
  pathExists('prettier.config.js') ||
  pathExists('prettier.config.mjs') ||
  pathExists('prettier.config.mts') ||
  pathExists('prettier.config.ts') ||
  !!pkgJson?.prettier;

export const hasReact = (): boolean =>
  isPackageExists('react') || isPackageExists('react-dom') || isPackageExists('@astrojs/react');

export const hasReactRouter = (): boolean =>
  isPackageExists('@react-router/dev') ||
  isPackageExists('@react-router/node') ||
  isPackageExists('@react-router/react') ||
  isPackageExists('@react-router/serve');

export const hasRemix = (): boolean =>
  isPackageExists('@remix-run/dev') ||
  isPackageExists('@remix-run/node') ||
  isPackageExists('@remix-run/react') ||
  isPackageExists('@remix-run/serve');

export const hasSvelte = (): boolean =>
  isPackageExists('svelte') || isPackageExists('@sveltejs/kit');

export const hasTailwindcss = (): boolean =>
  isPackageExists('tailwindcss') ||
  isPackageExists('@tailwindcss/postcss') ||
  isPackageExists('@tailwindcss/vite');

export const hasTypeScript = (): boolean => isPackageExists('typescript');

export const hasUnoCss = (): boolean =>
  isPackageExists('unocss') ||
  isPackageExists('@unocss/astro') ||
  isPackageExists('@unocss/nuxt') ||
  isPackageExists('@unocss/postcss') ||
  isPackageExists('@unocss/reset') ||
  isPackageExists('@unocss/svelte-scoped') ||
  isPackageExists('@unocss/webpack');

export const hasVite = (): boolean => isPackageExists('vite');

export const hasVitest = (): boolean => isPackageExists('vitest');

export const hasVue = (): boolean =>
  isPackageExists('vue') ||
  isPackageExists('nuxt') ||
  isPackageExists('vitepress') ||
  isPackageExists('@slidev/cli');

export function isInEditorEnv(): boolean {
  if (process.env['CI']) return false;
  if (isInGitHooksOrLintStaged()) return false;
  return !!(
    process.env['TERM_PROGRAM'] === 'vscode' ||
    process.env['VSCODE_CWD'] ||
    process.env['VSCODE_PID'] ||
    process.env['JETBRAINS_IDE'] ||
    process.env['VIM'] ||
    process.env['NVIM']
  );
}

export function isInGitHooksOrLintStaged(): boolean {
  return !!(
    process.env['GIT_PARAMS'] ||
    process.env['VSCODE_GIT_COMMAND'] ||
    process.env['npm_lifecycle_script']?.startsWith('lint-staged')
  );
}
