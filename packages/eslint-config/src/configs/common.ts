import type { FlatConfigItem } from '../types';

export async function common(): Promise<FlatConfigItem[]> {
  return [
    {
      name: 'options/linter',
      linterOptions: {
        reportUnusedDisableDirectives: 'warn',
        reportUnusedInlineConfigs: 'warn',
      },
    },
  ];
}
