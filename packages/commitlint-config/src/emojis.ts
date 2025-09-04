import emojiRegex from 'emoji-regex';
import { gitmojis } from 'gitmojis';

const emojiCodeRegex = new RegExp(/:\w*:/);
export const emojiCodeStr: string = emojiCodeRegex.source;

const emojiUnicodeRegex: RegExp = emojiRegex();
export const emojiUnicodeStr: string = emojiUnicodeRegex.source;

export const gitmojiCodes: `:${string}:`[] = gitmojis.map((gitmoji) => gitmoji.code);
const gitmojiCodeRegex = new RegExp(gitmojiCodes.filter(Boolean).join('|'));
export const gitmojiCodeStr: string = gitmojiCodeRegex.source;

export const gitmojiUnicode: string[] = gitmojis.map((gitmoji) => gitmoji.emoji);
const gitmojiUnicodeRegex = new RegExp(gitmojiUnicode.filter(Boolean).join('|'));
export const gitmojiUnicodeStr: string = gitmojiUnicodeRegex.source;

// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export const allEmojiRegex: RegExp = new RegExp(
  `${gitmojiCodeStr}|${gitmojiUnicodeStr}|${emojiCodeStr}|${emojiUnicodeStr}`,
);
// const allEmojiRegexStr: string = allEmojiRegex.source;
