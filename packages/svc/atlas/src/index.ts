import { Atlas } from '@crossnokaye/typescript-sdk';
import { useContext } from 'react';
import { AtlasContextValue } from './interfaces';
import { AtlasContext, AtlasProvider } from './provider';

export type * from '@crossnokaye/typescript-sdk';
export type { AtlasContextValue as AtlasContext, AtlasSessionMeta } from './interfaces';

export { Atlas, AtlasProvider };

/**
 * Return Atlas SDK objects from the nearest AtlasProvider ancestor in the component tree.
 */
export function useAtlas(): AtlasContextValue {
  return useContext(AtlasContext);
}
