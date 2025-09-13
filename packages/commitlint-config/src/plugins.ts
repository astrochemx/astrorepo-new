import type { Plugin } from '@commitlint/types';

import {
  emojiCodeStr,
  emojiUnicodeStr,
  gitmojiCodes,
  gitmojiCodeStr,
  gitmojiUnicode,
  gitmojiUnicodeStr,
} from './emojis';

export const subjectEmoji: Plugin = {
  rules: {
    'subject-emoji': (parsed) => {
      let pass: boolean;
      let errorMsg: string;

      const { raw } = parsed;

      if (raw) {
        const gitmojiCodeResult = new RegExp(
          `^\\w*(?:\\(.*\\))?!?:\\s(${gitmojiCodeStr})\\s.*$`,
          'gm',
        ).exec(raw);
        const gitmojiUnicodeResult = new RegExp(
          `^\\w*(?:\\(.*\\))?!?:\\s(${gitmojiUnicodeStr})\\s.*$`,
          'gm',
        ).exec(raw);
        const emojiCodeResult = new RegExp(
          `^\\w*(?:\\(.*\\))?!?:\\s(${emojiCodeStr})\\s.*$`,
          'm',
        ).exec(raw);
        const emojiUnicodeResult = new RegExp(
          `^\\w*(?:\\(.*\\))?!?:\\s(${emojiUnicodeStr})\\s.*$`,
          'gm',
        ).exec(raw);

        errorMsg = 'passed';

        if (gitmojiCodeResult) {
          const code = gitmojiCodeResult[1];
          pass = gitmojiCodes.includes(code as `:${string}:`);
          if (!pass) {
            errorMsg = `${code} is not in the correct gitmoji list, please check the emojis on <https://gitmoji.dev>.`;
          }
        } else if (gitmojiUnicodeResult) {
          const unicode = gitmojiUnicodeResult[1];
          pass = gitmojiUnicode.includes(unicode ?? '');
          if (!pass) {
            errorMsg = `${unicode} is not in the correct gitmoji list, please check the emojis on <https://gitmoji.dev>.`;
          }
        } else if (emojiCodeResult) {
          const code = emojiCodeResult[1];
          pass = true;
          if (!pass) {
            errorMsg = `${code} is not in the correct gitmoji list, please check the emojis on <https://gitmoji.dev>.`;
          }
        } else if (emojiUnicodeResult) {
          const unicode = emojiUnicodeResult[1];
          pass = true;
          if (!pass) {
            errorMsg = `${unicode} is not in the correct gitmoji list, please check the emojis on <https://gitmoji.dev>.`;
          }
        } else {
          pass = false;
          errorMsg =
            "commit's subject should start with an emoji, please check the emojis on <https://gitmoji.dev>.";
        }
      } else {
        pass = false;
        errorMsg = 'something went wrong...';
      }
      return [pass, errorMsg];
    },
  },
} as const satisfies Plugin;
