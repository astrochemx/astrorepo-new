import { defineConfig, type UserConfig, type UserConfigFn } from 'tsdown';

export const tsdownConfig: UserConfig | UserConfigFn = defineConfig({
  attw: false, // check!
  cjsDefault: true,
  clean: true,
  dts: {
    build: true,
  },
  entry: ['./src/index.{cjs,cts,js,jsx,mjs,mts,ts,tsx}'],
  external: ['vscode'],
  format: ['cjs', 'esm'],
  inputOptions: {
    experimental: {
      resolveNewUrlToAsset: false,
    },
  },
  onSuccess: () => {
    console.info('');
    console.info('-------------------');
    console.info('🎉 Build succeeded!');
    console.info('-------------------');
  },
  platform: 'node',
  publint: false, // check!
  shims: true,
  sourcemap: true,
  target: 'node22',
  treeshake: true,
  unused: { level: 'warning' },
} as const satisfies UserConfig | UserConfigFn);
