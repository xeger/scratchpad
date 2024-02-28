/* eslint-env node */

module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    // Please leave this at the end so that Prettier formatting rules "win" over everything else
    "plugin:prettier/recommended",
  ],
  ignorePatterns: [".eslintrc.cjs"],
  overrides: [],
  parser: "@typescript-eslint/parser",
  plugins: ["prettier", "react-refresh"],
  rules: {
    "prettier/prettier": ["error"],
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
