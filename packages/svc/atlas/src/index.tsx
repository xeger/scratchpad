import { SDK } from 'atlas';
import invariant from 'invariant';
import { createContext, useContext } from 'react';

export type * from 'atlas';

interface AtlasContext {
  sdk: SDK;
  session: AtlasSession | null;
}

interface AtlasSession {
  accessToken: string;
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
  session: null as AtlasSession | null,
});

/**
 * Introduce a random execution delay between 10% and 100% of the given maximum milliseconds.
 * Returns a function to cancel the delayed execution, which pairs nicely with useEffect.
 *
 * @example useEffect(() => addJitter(() => console.log('hi'), 5000), [])
 */
function addJitter(cb: () => void, maxMS: number = 5000) {
  const timer = setInterval(cb, maxMS * 0.1 + Math.random() * (maxMS * 0.9));
  return () => clearInterval(timer);
}

/**
 * Given a Speakeasy response object, verify HTTP response status and a truthy parsed-response field
 * of the given name; return the parsed response field, preserving its type identity but removing
 * its nullishness.
 */
function assertResponse<TResponse extends { statusCode: number }, TField extends keyof TResponse>(
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
function assertPresence<T extends object, F extends keyof T>(
  obj: T | undefined,
  field: F
): NonNullable<T[F]> {
  const value = obj?.[field];
  invariant(value, `Missing field: ${field.toString()}`);
  return value;
}

/**
 * Return the authenticated SDK in React context if it is associated with a session (i.e. the user is logged in).
 *
 * If the user is not logged in and the app is running in development mode, make a pre-authenticated SDK using
 * VITE_ATLAS_ACCESS_TOKEN and VITE_ATLAS_USER_ID from the passed-in environment, if present.
 */
function useAtlas(env: Record<string, string> = {}) {
  const context = useContext(AtlasContext);
  if(!context.session && env.mode === 'development') {
    const { VITE_ATLAS_ACCESS_TOKEN, VITE_ATLAS_USER_ID } = env;
    if(VITE_ATLAS_ACCESS_TOKEN && VITE_ATLAS_USER_ID) {
    const sdk = new SDK({
      oauth2HeaderAuthorization: `Bearer ${VITE_ATLAS_ACCESS_TOKEN}`,
      serverURL: window.origin,
    });
    const session = {
      accessToken: VITE_ATLAS_ACCESS_TOKEN,
      userId: VITE_ATLAS_USER_ID,
    };
    return { sdk, session };
    }
  }
  return context;
}

/**
 * Given an object and a field name, return the field value if defined, else a default.
 * Use this to deal gracefully with API response ambiguity i.e. optional fields and unknown views.
 */
function withDefault<T extends object, F extends keyof T>(
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

export { AtlasContext, SDK, addJitter, assertPresence, assertResponse, useAtlas, withDefault };

