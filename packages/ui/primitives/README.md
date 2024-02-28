# Library: Shadow

This package is an instantiation of ShadCN, customized for use in our monorepo.

## Adding/Upgrading Components

You can use the ShadCN code generator as a starting point, but you may need to rewrite imports or reorganize the file locations in order to adapt them to the way we do imports, exports and code sharing in our monorepo.

We have a shell script that does some of the reorganizing for you.
Other reorganizing (e.g. moving hooks to the right folder) will become apparent when you encounter type errors in other packages that import this one.

To add or upgrade components:

1. `scripts/add`
2. Select what to add
3. Open each added/changed file in your editor to tweak it
   - Ensure imports and exports look good
   - Fix any ESLint errors that occur
   - Separate out any hooks that are defined incline, placing them under `hooks/useFoo` and adjusting the related component's imports accordingly.

## Upgrading ShadCN to a New Major Version

To wipe the ShadCN slate clean and start fresh, run `scripts/reset` and then
`scripts/init`.
