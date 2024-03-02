import { Notice } from '@scratch/ui.elements/notice';
import { Card, CardContent, CardHeader, CardTitle } from '@scratch/ui.primitives/card';
import { SDK } from 'atlas';
import { Organization } from 'atlas/models/components';
import invariant from 'invariant';
import { useEffect, useState } from 'react';

const userId = import.meta.env.VITE_ATLAS_USER_ID;
const accessToken = import.meta.env.VITE_ATLAS_ACCESS_TOKEN;

const sdk = new SDK({
  oauth2HeaderAuthorization: `Bearer ${accessToken}`,
  serverURL: window.origin,
});

/**
 * Given a Speakeasy response object, verify a 200 status and a truth parsed-response field
 * of the given name; return the parsed response field, preserving its type identity but removing
 * any union with null or undefined.
 */
function assert200<TResponse extends { statusCode: number }, TField extends keyof TResponse>(
  response: TResponse,
  field: TField
) {
  if (response.statusCode === 200) {
    if (response[field]) {
      return response[field] as NonNullable<TResponse[TField]>;
    } else {
      throw new Error(`HTTP request did not respond properly`);
    }
  } else {
    throw new Error(`HTTP request failed: ${response.statusCode}`);
  }
}

/**
 * Given an object and a field name, return the field value if defined, or a default.
 */
function withDefault<T extends object, F extends keyof T>(
  obj: T | undefined,
  field: F,
  def: NonNullable<T[F]>
): NonNullable<T[F]> {
  return obj?.[field] ?? def;
}

function UserOrgList() {
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [error, setError] = useState<Error | undefined>();
  useEffect(() => {
    try {
      invariant(userId, 'VITE_ATLAS_USER_ID must be set');
      invariant(accessToken, 'VITE_ATLAS_ACCESS_TOKEN must be set');
      sdk.iam
        .listUserOrgs(userId)
        .then((response) => assert200(response, 'organizationCollection'))
        .then(setOrgs)
        .catch(setError);
    } catch (err) {
      setError(err as Error);
    }
  }, []);

  const countFac = (org: Organization) => withDefault(org, 'facilities', []).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Organizations</CardTitle>
      </CardHeader>
      <CardContent>
        {error ? (
          <Notice text={error.toString()} variant="destructive" />
        ) : (
          <ul className="list-disc list-inside">
            {orgs.map((org) => (
              <li key={org.organizationId}>
                {org.displayName} (${countFac(org)})
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

export { UserOrgList };
