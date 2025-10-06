import type { CommitlintConfig } from './types';

import { parser } from './parser';
import { subjectEmoji } from './plugins';
import { rules } from './rules';

export const commitlintConfig: CommitlintConfig = {
  ignores: [(commit: string) => commit === ''],
  defaultIgnores: true,
  extends: [],
  formatter: '@commitlint/format',
  helpUrl: 'https://github.com/conventional-changelog/commitlint',
  parserPreset: parser,
  plugins: [subjectEmoji],
  rules: rules,
} as const satisfies CommitlintConfig;
