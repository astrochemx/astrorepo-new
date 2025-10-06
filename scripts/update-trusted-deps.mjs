// @ts-check
/**
 * (c) pnpm (Zoltan Kochan)
 * https://github.com/pnpm/plugin-trusted-deps/blob/main/updateList.ts
 */

import { writeFile } from 'node:fs/promises';

async function fetchToJson(
  url = 'https://raw.githubusercontent.com/oven-sh/bun/refs/heads/main/src/install/default-trusted-dependencies.txt',
) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  const text = await response.text();

  // Split into lines, trim whitespace, drop blanks & comments
  const entries = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'));

  const outPath = `allowBuiltDependencies.json`;
  await writeFile(outPath, JSON.stringify(entries, null, 2), 'utf8');

  console.log(`✅  Saved ${entries.length} items to ${outPath}`);
}

try {
  await fetchToJson();
} catch (error) {
  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    console.error(`❌  ${error.message}`);
  }
  process.exitCode = 1;
}
