import { Atlas } from '@crossnokaye/typescript-sdk';
import invariant from 'invariant';
import { useContext } from 'react';
import { AtlasContext as IAtlasContext } from './interfaces';
import { AtlasContext, AtlasProvider } from './provider';

export type * from '@crossnokaye/typescript-sdk';
export type { AtlasContext, AtlasSession } from './interfaces';

export { Atlas, AtlasProvider };

/**
 * Given a Speakeasy response object, verify HTTP response status and a truthy parsed-response field
 * of the given name; return the parsed response field, preserving its type identity but removing
 * its nullishness.
 */
export function assertResponse<
  TResponse extends { httpMeta: { statusCode: number } },
  TField extends keyof TResponse,
>(response: TResponse, field: TField, statusCode = 200) {
  invariant(
    response.httpMeta.statusCode === statusCode,
    `Unexpected HTTP status status: ${response.httpMeta.statusCode}, wanted ${statusCode}`
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

export function useAtlas(): IAtlasContext {
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
