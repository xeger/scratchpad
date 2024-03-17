import { Atlas } from '@crossnokaye/typescript-sdk';
import { createContext, useMemo, useState } from 'react';
import type { AtlasContextValue, AtlasSessionMeta } from './interfaces';

const defaultSessionMeta: AtlasSessionMeta = {
  security: { oauth2HeaderAuthorization: '' },
  serverURL: window.origin,
  status: 'anonymous',
  userId: '',
};

/**
 * Consume an SDK instance from the React context tree.
 *
 * The default value has an anonymous session, connects to window.origin,
 * and cannot handle session updates; it is well-formed but not functional.
 *
 * Consumers should employ AtlasProvider and useAtlas instead; the use of
 * React context is an an internal implementation detail of this package.
 *
 * @see AtlasProvider
 * @see useAtlas
 *
 * @example
 *   const sdk = useContext(atlas.Context);
 */
export const AtlasContext = createContext<AtlasContextValue>({
  sdk: new Atlas({ oauth2HeaderAuthorization: undefined, serverURL: window.origin }),
  sessionMeta: defaultSessionMeta,
  setSessionMeta: () => {
    throw new Error(`AtlasContext: default value cannot handle sessionMeta updates`);
  },
});

/**
 * A component that provides an Atlas SDK instance and session to all descendants.
 */
export function AtlasProvider({
  sessionMeta,
  children,
}: {
  sessionMeta?: AtlasSessionMeta;
  children: React.ReactNode;
}) {
  const [latestSessionMeta, setSessionMeta] = useState(sessionMeta ?? defaultSessionMeta);
  const sdk = useMemo(
    () =>
      new Atlas({
        oauth2HeaderAuthorization: latestSessionMeta.security.oauth2HeaderAuthorization,
        serverURL: latestSessionMeta.serverURL,
      }),
    [latestSessionMeta]
  );
  return (
    <AtlasContext.Provider value={{ sdk, sessionMeta: latestSessionMeta, setSessionMeta }}>
      {children}
    </AtlasContext.Provider>
  );
}
