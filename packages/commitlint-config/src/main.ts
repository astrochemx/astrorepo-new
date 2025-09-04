import { parser } from './parser';
import { subjectEmoji } from './plugins';
import { rules } from './rules';
import type { CommitlintConfig } from './types';

export const commitlintConfig: CommitlintConfig = {
  extends: [],
  parserPreset: parser,
  plugins: [subjectEmoji],
  formatter: '@commitlint/format',
  ignores: [(commit: string) => commit === ''],
  defaultIgnores: true,
  helpUrl: 'https://github.com/conventional-changelog/commitlint',
  rules: rules,
} as const satisfies CommitlintConfig;
