import { allEmojiRegex } from './emojis';
import type { CommitlintConfig } from './types';

export const parser: CommitlintConfig['parserPreset'] = {
  name: 'conventional-changelog-conventional-commits-emoji',
  parserOpts: {
    headerPattern: new RegExp(
      `^(?<type>\\w*)(?:\\((?<scope>.*)\\))?!?:\\s(?:(?<emoji>${allEmojiRegex})\\s)?(?<subject>(?:(?!#).)*(?:(?!\\s).))(?:\\s\\(?(?<ticket>#\\d*)\\)?)?$`,
    ),
    breakingHeaderPattern: new RegExp(
      `^(?<type>\\w*)(?:\\((?<scope>.*)\\))?!:\\s(?:(?<emoji>${allEmojiRegex})\\s)?(?<subject>(?:(?!#).)*(?:(?!\\s).))(?:\\s\\(?(?<ticket>#\\d*)\\)?)?$`,
    ),
    headerCorrespondence: ['type', 'scope', 'emoji', 'subject', 'ticket'],
    noteKeywords: ['BREAKING CHANGE', 'BREAKING-CHANGE'],
    revertPattern: /^(?:Revert|revert:)\s'?([\s\S]+?)'?\s*This reverts commit (\w*)\./i,
    revertCorrespondence: ['header', 'hash'],
    issuePrefixes: ['#'],
  },
} as const satisfies CommitlintConfig['parserPreset'];
