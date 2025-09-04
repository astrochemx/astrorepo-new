({
  /**
   * GitHub Callouts Parser for Markdown Preview Enhanced.
   *
   * It converts:
   *
   * ```
   * > [!TYPE] Optional title
   * > Content...
   * ```
   *
   * into:
   *
   * ```
   * !!! type "Optional title"
   *     Content...
   * ```
   *
   * For more information about extending a parser see: [Extend Markdown
   * Parser](https://shd101wyy.github.io/markdown-preview-enhanced/#/extend-parser).
   *
   * Kudos to
   * [@EmmetZ](https://github.com/shd101wyy/vscode-markdown-preview-enhanced/issues/1911#issuecomment-3038295747)!
   */
  onWillParseMarkdown: async (/** @type {string} */ markdown) =>
    new Promise((resolve, _reject) => {
      const calloutRegex = /^> ?\[!(?<type>\w+)\](?<title>.*)?\r?\n(?<content>(?:>.*\r?\n?)*)/gm;

      const newMarkdown = markdown.replace(
        calloutRegex,
        (
          /** @type {any} */ _match,
          /** @type {string} */ type,
          /** @type {string} */ title,
          /** @type {string} */ content,
        ) => {
          const admonitionType = type.toLowerCase();
          const admonitionTitle = title?.trim() ? title.trim() : '';

          const admonitionContent = content
            .replace(/^> ?/gm, '')
            .split(/\r?\n/)
            .map((/** @type {string} */ line) => (line.trim() ? `    ${line}` : ''))
            .join('\n');
          return `!!! ${admonitionType} ${admonitionTitle}\n${admonitionContent}\n\n`;
        },
      );
      return resolve(newMarkdown);
    }),

  onDidParseMarkdown: async (/** @type {string} */ html) => html,
});
