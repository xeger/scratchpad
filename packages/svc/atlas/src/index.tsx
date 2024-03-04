import { SDK } from 'atlas';
import invariant from 'invariant';
import { createContext, useContext } from 'react';

export type * from 'atlas';

export { SDK };

/**
 * Implementation detail for Atlas SDK in React context.
 */
export interface AtlasContext {
  sdk: SDK;
  session: AtlasSession;
}

/**
 * Authentication and authorization state for the Atlas SDK.
 * This object is always present and its values are always non-nullish even when the user is not authenticated.
 * To check session status, use the `status` field or check for truthy accessToken and userId.
 */
export interface AtlasSession {
  accessToken: string;
  status: 'anonymous' | 'authenticated';
  userId: string;
}

/**
 * Consume an SDK instance from the React context tree.
 * The default uses no authorization and connects to the same origin as th eUI.
 *
 * @example
 *   const sdk = useContext(atlas.Context);
 */
const AtlasContext = createContext<AtlasContext>({
  sdk: new SDK({oauth2HeaderAuthorization: undefined, serverURL: window.origin}),
  session: {accessToken: '', status: 'anonymous', userId: ''},
});

export function AtlasProvider({sdk, session, children}: {sdk: SDK; session: AtlasSession; children: React.ReactNode}) {
  return <AtlasContext.Provider value={{sdk, session}}>{children}</AtlasContext.Provider>;
}

/**
 * Given a Speakeasy response object, verify HTTP response status and a truthy parsed-response field
 * of the given name; return the parsed response field, preserving its type identity but removing
 * its nullishness.
 */
export function assertResponse<TResponse extends { statusCode: number }, TField extends keyof TResponse>(
  response: TResponse,
  field: TField,
  statusCode = 200
) {
  invariant(
    response.statusCode === statusCode,
    `Unexpected HTTP status status: ${response.statusCode}, wanted ${statusCode}`
  );
  invariant(response[field], `Missing HTTP response field: ${field.toString()}`);
  return response[field] as NonNullable<TResponse[TField]>;
}

/**
 * Given an object and a field name, return the field value if defined, else throw.
 */
export function assertPresence<T extends object, F extends keyof T>(
  obj: T | undefined,
  field: F
): NonNullable<T[F]> {
  const value = obj?.[field];
  invariant(value, `Missing field: ${field.toString()}`);
  return value;
}

export function useAtlas(): AtlasContext {
  return useContext(AtlasContext);
}

/**
 * Given an object and a field name, return the field value if defined, else a default.
 * Use this to deal gracefully with API response ambiguity i.e. optional fields and unknown views.
 */
export function withDefault<T extends object, F extends keyof T>(
  obj: T | undefined,
  field: F,
  def: NonNullable<T[F]>
): NonNullable<T[F]> {
  try {
    return assertPresence(obj, field);
  } catch (_defaulted) {
    return def;
  }
}
