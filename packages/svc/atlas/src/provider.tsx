import { Atlas } from '@crossnokaye/typescript-sdk';
import { createContext, useEffect, useMemo, useState } from 'react';
import type { AtlasContextValue, AtlasSessionMeta } from './interfaces';

const defaultSessionMeta: AtlasSessionMeta = {
  security: { oauth2HeaderAuthorization: '' },
  serverURL: window.origin,
  status: 'anonymous',
  userId: '',
};

const storageKey = 'scratchpad.atlas.sessionMeta';

function unmarshal(s: Storage | undefined): AtlasSessionMeta {
  try {
    if (s) {
      const value = s.getItem(storageKey);
      if (value) {
        return JSON.parse(value);
      }
    }
    return defaultSessionMeta;
  } catch (e) {
    return defaultSessionMeta;
  }
}

function marshal(sessionMeta: AtlasSessionMeta, s: Storage | undefined) {
  if (s) {
    s.setItem(storageKey, JSON.stringify(sessionMeta));
  }
}

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
  children,
  storage,
}: {
  children: React.ReactNode;
  storage?: Storage;
}) {
  const [sessionMeta, setSessionMeta] = useState(unmarshal(storage));
  const sdk = useMemo(
    () =>
      new Atlas({
        oauth2HeaderAuthorization: sessionMeta.security.oauth2HeaderAuthorization,
        serverURL: sessionMeta.serverURL,
      }),
    [sessionMeta]
  );
  useEffect(() => marshal(sessionMeta, storage), [sessionMeta, storage]);

  return (
    <AtlasContext.Provider value={{ sdk, sessionMeta, setSessionMeta }}>
      {children}
    </AtlasContext.Provider>
  );
}
