/* eslint-env node */

module.exports = {
  root: true,
  extends: ['@crossnokaye'],
  rules: {
    // ShadCN generates functions with unused parameters
    '@typescript-eslint/no-unused-vars': 'off',
    // ShadCN mixes its exports and is not compatible with fast refresh
    'react-refresh/only-export-components': 'off',
  },
};
