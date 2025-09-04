import process from 'node:process';
import { isPackageExists } from 'local-pkg';

export const hasAstro = (): boolean =>
  isPackageExists('astro') || isPackageExists('@astrojs/starlight');

export const hasNext = (): boolean => isPackageExists('next');

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
