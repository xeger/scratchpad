/* eslint-env node */

const base = require("@scratch/components.shadow/tailwind.config.js");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...base,
  content: [
    "../../components/shadow/src/**/*.{ts,tsx}",
    "../../components/ego/src/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
};
