# Library: Shadow

This package is an instantiation of ShadCN, customized for use in our monorepo.

## Adding/Upgrading Components

You can use the ShadCN code generator as a starting point, but you may need to rewrite imports or reorganize the code in order to adapt them to the way we do imports, exports and code sharing in our monorepo.

To add or upgrade components:

1. `npm run add`
2. Select what to add
3. Open each changed file in your editor to tweak it
   - Ensure imports and exports look good
   - Fix any ESLint errors that occur
   - Separate out any hooks that are defined incline, placing them under `hooks/useFoo` and adjusting the related component's imports accordingly.
