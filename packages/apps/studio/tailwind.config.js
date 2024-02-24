const base = require('@scratch/lib.shadow/tailwind.config.js')

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...base,
  content: [
    '../../lib/shadow/src/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
}
