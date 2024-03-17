import type { Atlas } from '@crossnokaye/typescript-sdk';
import type { SetStateAction } from 'react';

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
  userId: string;
}
