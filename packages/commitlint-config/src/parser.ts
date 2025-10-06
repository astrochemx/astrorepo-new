import type { CommitlintConfig } from './types';

import { allEmojiRegex } from './emojis';

export const parser: CommitlintConfig['parserPreset'] = {
  name: 'conventional-changelog-conventional-commits-emoji',
  parserOpts: {
    breakingHeaderPattern: new RegExp(
      `^(?<type>\\w*)(?:\\((?<scope>.*)\\))?!:\\s(?:(?<emoji>${allEmojiRegex})\\s)?(?<subject>(?:(?!#).)*(?:(?!\\s).))(?:\\s\\(?(?<ticket>#\\d*)\\)?)?$`,
    ),
    headerCorrespondence: ['type', 'scope', 'emoji', 'subject', 'ticket'],
    headerPattern: new RegExp(
      `^(?<type>\\w*)(?:\\((?<scope>.*)\\))?!?:\\s(?:(?<emoji>${allEmojiRegex})\\s)?(?<subject>(?:(?!#).)*(?:(?!\\s).))(?:\\s\\(?(?<ticket>#\\d*)\\)?)?$`,
    ),
    issuePrefixes: ['#'],
    noteKeywords: ['BREAKING CHANGE', 'BREAKING-CHANGE'],
    revertCorrespondence: ['header', 'hash'],
    // eslint-disable-next-line regexp/no-super-linear-backtracking
    revertPattern: /^(?:Revert|revert:)\s'?([\s\S]+?)'?\s*This reverts commit (\w*)\./i,
  },
} as const satisfies CommitlintConfig['parserPreset'];
