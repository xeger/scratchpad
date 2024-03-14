import invariant from 'invariant';

/**
 * Given a Speakeasy result object, verify HTTP response status and a truthy parsed-response field
 * of the given name; return the parsed response field, preserving its type identity but removing
 * its nullishness.
 */
export function assertResponse<
  TResult extends { httpMeta: { response: { status: number } } },
  TField extends keyof TResult,
>(result: TResult, field: TField, status = 200) {
  invariant(
    result.httpMeta.response.status === status,
    `Unexpected HTTP status status: ${result.httpMeta.response.status}, wanted ${status}`
  );
  invariant(result[field], `Missing HTTP response field: ${field.toString()}`);
  return result[field] as NonNullable<TResult[TField]>;
}

/**
 * Given an object and a field name, return the field value if defined, else throw.
 * TODO: is this even a good idea?
 *   - Absent views, the OpenAPI metadata should never be ambiguous about presence.
 *   - And views are (for now) handled by hand-coded gunk
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
 * Given an object and a field name, return the field value if defined, else a default.
 * Use this to deal gracefully with API response ambiguity i.e. optional fields and unknown views.
 * TODO: is this even a good idea?
 *   - Absent views, the OpenAPI metadata should never be ambiguous about presence.
 *   - And views are (for now) handled by hand-coded gunk
 */
// @ts-expect-error 6133
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
