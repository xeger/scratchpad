# Developer Configuration: ESLint

This contains a shared ESLint configuration plus custom rules for use by every package in the monorepo.

It defies our package-naming convention in order to satisfy ESLint, which assumes that config packages under a scope are always named `eslint-config` and cannot tolerate a `dev.` or `lib.` or other prefix.

## Package-Level Overrides

The shared rules provide a clean, sane starting point but they may not be suitable for every package.
