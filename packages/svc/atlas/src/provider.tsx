import { Atlas } from '@crossnokaye/typescript-sdk';
import { createContext } from 'react';
import type { AtlasSessionMeta, AtlasContext as IAtlasContext } from './interfaces';

/**
 * Consume an SDK instance from the React context tree.
 * The default uses no authorization and connects to the same origin as the UI.
 *
 * @example
 *   const sdk = useContext(atlas.Context);
 */
export const AtlasContext = createContext<IAtlasContext>({
  sdk: new Atlas({ oauth2HeaderAuthorization: undefined, serverURL: window.origin }),
  sessionMeta: { security: { oauth2HeaderAuthorization: '' }, status: 'anonymous', userId: '' },
});

/**
 * A component that provides an Atlas SDK instance and session to all descendants.
 */
export function AtlasProvider({
  sdk,
  session,
  children,
}: {
  sdk: Atlas;
  session: AtlasSessionMeta;
  children: React.ReactNode;
}) {
  return (
    <AtlasContext.Provider value={{ sdk, sessionMeta: session }}>{children}</AtlasContext.Provider>
  );
}
