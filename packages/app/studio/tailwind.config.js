/* eslint-env node */

const base = require('@crossnokaye/ui-primitives/tailwind.config.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...base,
  content: [
    '../../ui/primitives/src/**/*.{ts,tsx}',
    '../../ui/elements/src/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
};
