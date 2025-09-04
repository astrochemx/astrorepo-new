import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import type { RehypePlugins, RemarkPlugins } from 'astro';
import { remarkEndOfMarkdown } from 'astro-vtbot/starlight-view-transitions';
import rehypeCallouts from 'rehype-callouts';
import rehypeDocument from 'rehype-document';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkDirective from 'remark-directive';
import remarkDirectiveSugar, { type PropertiesFromTextDirective } from 'remark-directive-sugar';
import remarkEmoji from 'remark-emoji';
import remarkImgattr from 'remark-imgattr';
import remarkMath from 'remark-math';

import { rehypeAutolinkHeadings } from './rehype/autolink-headings';
import { rehypeExternalLinks } from './rehype/external-links';
import { rehypeGitHubBadgeLinks } from './rehype/github-badge-links';
import { remarkReadingTime } from './remark/reading-time';

export const remarkPlugins: RemarkPlugins = [
  remarkDirective,
  [
    remarkDirectiveSugar,
    {
      badge: {
        presets: {
          n: { text: 'NEW' },
          a: { text: 'ARTICLE' },
          v: { text: 'VIDEO' },
        },
      },
      image: {
        stripParagraph: false,
      },
      link: {
        faviconSourceUrl: 'https://www.google.com/s2/favicons?domain={domain}&sz=128',
        imgProps: (node: Parameters<PropertiesFromTextDirective>[0]) => {
          const props: ReturnType<PropertiesFromTextDirective> = {
            'aria-hidden': 'true',
          };
          if (node.attributes?.['class']?.includes('github'))
            props['src'] = 'https://github.githubassets.com/favicons/favicon.svg';
          return props;
        },
      },
    },
  ],
  remarkEmoji,
  remarkEndOfMarkdown,
  remarkImgattr,
  remarkMath,
  remarkReadingTime,
];

export const rehypePlugins: RehypePlugins = [
  rehypeAutolinkHeadings,
  [
    rehypeCallouts,
    {
      theme: 'obsidian',
    },
  ],
  [
    rehypeDocument,
    {
      css: 'https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css',
    },
  ],
  rehypeExternalLinks,
  rehypeGitHubBadgeLinks,
  [rehypeHeadingIds, { headingIdCompat: true }],
  rehypeKatex,
  [
    rehypePrettyCode,
    {
      theme: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  ],
  rehypeSlug,
];
