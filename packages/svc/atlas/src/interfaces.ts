/**
 * Implementation detail for Atlas SDK in React context.
 */
export interface AtlasContext {
  sdk: Atlas;
  session: AtlasSession;
}

/**
 * Authentication and authorization state for the Atlas SDK.
 * This object is always present and its values are always non-nullish even when the user is not authenticated.
 * To check session status, use the `status` field.
 */
export interface AtlasSession {
  security: { oauth2HeaderAuthorization?: string };
  status: 'anonymous' | 'authenticated';
  userId: string;
}
