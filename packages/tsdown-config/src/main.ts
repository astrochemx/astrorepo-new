import type { UserConfig, UserConfigFn } from 'tsdown';

import { RequireCJS } from 'rolldown-plugin-require-cjs';
import { defineConfig } from 'tsdown';

export const tsdownConfig: UserConfig | UserConfigFn = defineConfig({
  attw: false, // check!
  cjsDefault: true,
  clean: true,
  dts: {
    build: true,
  },
  entry: ['./src/index.{cjs,cts,js,jsx,mjs,mts,ts,tsx}'],
  external: ['vscode'],
  format: ['esm'],
  hash: true,
  inputOptions: {
    experimental: {
      resolveNewUrlToAsset: false,
    },
    moduleTypes: {
      '.css': 'js',
    },
  },
  logLevel: 'info',
  minify: false,
  nodeProtocol: true,
  onSuccess: () => {
    console.info('');
    console.info('-------------------');
    console.info('🎉 Build succeeded!');
    console.info('-------------------');
  },
  platform: 'node',
  plugins: [RequireCJS()],
  publint: false, // check!
  shims: true,
  skipNodeModulesBundle: true,
  sourcemap: true,
  target: 'node22',
  treeshake: true,
  unbundle: true,
  unused: { level: 'warning' },
} as const satisfies UserConfig | UserConfigFn);
