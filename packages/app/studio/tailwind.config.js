/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */

const base = require('@crossnokaye/ui-primitives/tailwind.config.js');
const fs = require('fs');
const path = require('path');

const content = [
  '../../../node_modules/@crossnokaye/ui-primitives/src/**/*.{ts,tsx}',
  '../../ui/elements/src/**/*.{ts,tsx}',
  './src/**/*.{ts,tsx}',
];

// Tailwind's PostCSS plugin silently fails if the content path is incorrect.
// This results in subtle style bugs with no obvious cause.
// Sanity check every path of content to ensure they're all kosher.
// Bit of a hack but it hopefully saves us effort/time.
function verify(dir) {
  const wildcard = dir.indexOf('*');
  if (wildcard) {
    dir = dir.slice(0, wildcard - 1);
  }
  try {
    const relative = path.relative(__dirname, dir);
    const absolute = path.resolve(relative);
    const entries = fs.readdirSync(absolute);
    return entries.length > 0;
  } catch (e) {
    return false;
  }
}
content.forEach((dir) => {
  if (!verify(dir)) throw new Error(`Tailwind content path ${dir} seems to be incorrect.`);
});

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...base,
  content,
};
