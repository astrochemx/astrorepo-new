import { defineConfig, type UserConfig, type UserConfigFn } from 'tsdown';

export const tsdownConfig: UserConfig | UserConfigFn = defineConfig({
  attw: true,
  clean: true,
  dts: {
    build: true,
  },
  entry: ['./src/index.{js,jsx,ts,tsx}'],
  external: ['vscode'],
  onSuccess: () => {
    console.info('');
    console.info('-------------------');
    console.info('🎉 Build succeeded!');
    console.info('-------------------');
  },
  publint: true,
  sourcemap: true,
  target: 'node22',
  unused: { level: 'warning' },
} as const satisfies UserConfig | UserConfigFn);
