/* eslint-env node */

const base = require("@scratch/lib.shadow/tailwind.config.js");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...base,
  content: [
    "../../components/shadow/src/**/*.{ts,tsx}",
    "../../components/ego/src/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
};
