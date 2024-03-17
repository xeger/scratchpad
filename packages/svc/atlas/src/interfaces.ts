import type { Atlas } from '@crossnokaye/typescript-sdk';

/**
 * Implementation detail for Atlas SDK in React context.
 */
export interface AtlasContext {
  sdk: Atlas;
  sessionMeta: AtlasSessionMeta;
}

/**
 * Authentication and authorization state for the Atlas SDK.
 * This object is always present and its values are always non-nullish even when the user is not authenticated.
 * Anonymous sessions have falsey values, so API calls may return unexpected statuses.
 * To check session status, use the `status` field.
 */
export interface AtlasSessionMeta {
  security: { oauth2HeaderAuthorization: string };
  status: 'anonymous' | 'authenticated';
  userId: string;
}
