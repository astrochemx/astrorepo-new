/* eslint-disable n/no-process-exit */
/* Skip Husky install in Production and CI */

if (process.env['NODE_ENV'] === 'production' || process.env['CI'] === 'true') {
  process.exit(0);
}

try {
  const husky = (await import('husky')).default;
  console.log(husky());
} catch (error) {
  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    console.error(error.message);
  } else {
    console.error(error);
  }
}
