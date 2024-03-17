import { Atlas } from '@crossnokaye/typescript-sdk';
import { useContext } from 'react';
import { AtlasContext as IAtlasContext } from './interfaces';
import { AtlasContext, AtlasProvider } from './provider';

export type * from '@crossnokaye/typescript-sdk';
export type { AtlasContext, AtlasSessionMeta } from './interfaces';

export { Atlas, AtlasProvider };

/**
 * Return an Atlas SDK instance and session from the nearest AtlasProvider ancestor in the tree.
 */
export function useAtlas(): IAtlasContext {
  return useContext(AtlasContext);
}
