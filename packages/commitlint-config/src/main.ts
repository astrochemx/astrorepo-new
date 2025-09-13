import type { CommitlintConfig } from './types';

import { parser } from './parser';
import { subjectEmoji } from './plugins';
import { rules } from './rules';

export const commitlintConfig: CommitlintConfig = {
  defaultIgnores: true,
  extends: [],
  formatter: '@commitlint/format',
  helpUrl: 'https://github.com/conventional-changelog/commitlint',
  ignores: [(commit: string) => commit === ''],
  parserPreset: parser,
  plugins: [subjectEmoji],
  rules: rules,
} as const satisfies CommitlintConfig;
