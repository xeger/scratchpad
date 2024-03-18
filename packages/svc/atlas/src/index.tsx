/* Changes to SDK & session management are rare & deserve a whole-page refresh */
/* eslint-disable react-refresh/only-export-components */

import { Atlas } from '@crossnokaye/typescript-sdk';
import type { SetStateAction } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

/**
 * Implementation detail for Atlas SDK in React context.
 */
export interface AtlasContextValue {
  sdk: Atlas;
  sessionMeta: AtlasSessionMeta;
  setSessionMeta(newState: SetStateAction<AtlasSessionMeta>): void;
}

/**
 * Authentication and authorization state for the Atlas SDK.
 * This object is always present and its values are always non-nullish even when the user is not authenticated.
 * Anonymous sessions have falsey values, so API calls may return unexpected statuses.
 * To check session status, use the `status` field.
 */
export interface AtlasSessionMeta {
  serverURL: string;
  security: { oauth2HeaderAuthorization: string };
  status: 'anonymous' | 'authenticated';
  timestamps: { expires: Date };
  userId: string;
}

const defaultSessionMeta: AtlasSessionMeta = {
  security: { oauth2HeaderAuthorization: '' },
  serverURL: window.origin,
  status: 'anonymous',
  timestamps: { expires: new Date(0) },
  userId: '',
};

const storageKey = 'scratchpad.atlas.sessionMeta';

// TODO: fancy Zod stuff (i.e. deal with timestamps without hand coding)
function unmarshal(s: Storage | undefined): AtlasSessionMeta {
  try {
    if (s) {
      const value = s.getItem(storageKey);
      if (value) {
        const parsed = JSON.parse(value);
        if (parsed?.timestamps?.expires) {
          parsed.timestamps.expires = new Date(parsed.timestamps.expires);
        }
        if (parsed?.timestamps?.expires > new Date()) {
          return parsed;
        }
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

/**
 * Return Atlas SDK objects from the nearest AtlasProvider ancestor in the component tree.
 */
export function useAtlas(): AtlasContextValue {
  return useContext(AtlasContext);
}
