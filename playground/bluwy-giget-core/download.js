import { downloadTemplate } from '@bluwy/giget-core';

const result = await downloadTemplate('github:withastro/starlight/examples/tailwind', {
  force: true,
  dir: './new-astro-project',
});
