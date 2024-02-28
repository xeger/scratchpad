/* eslint-env node */

const base = require("@scratch/lib.shadow/tailwind.config.js");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...base,
  content: [
    "../../lib/shadow/src/**/*.{ts,tsx}",
    "../../lib/ego/src/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
};
