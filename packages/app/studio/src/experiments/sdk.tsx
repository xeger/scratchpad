import { addJitter, assertResponse, useAtlas, withDefault } from '@scratch/svc.atlas';
import { Organization } from '@scratch/svc.atlas/models/components';
import { Notice } from '@scratch/ui.elements/notice';
import { Card, CardContent, CardHeader, CardTitle } from '@scratch/ui.primitives/card';
import { useEffect, useState } from 'react';

function UserOrgList() {
  const { sdk, session } = useAtlas(import.meta.env);
  const [orgs, setOrgs] = useState<Organization[] | undefined>();
  const [error, setError] = useState<Error | undefined>();

  useEffect(
    () =>
      addJitter(() => {
        if (session) {
          sdk.iam
            .listUserOrgs(session.userId)
            .then((response) => assertResponse(response, 'organizationCollection'))
            .then(setOrgs)
            .catch(setError);
        } else {
          setError(
            new Error(
              `Please export VITE_ATLAS_ACCESS_TOKEN and VITE_ATLAS_USER_ID in development mode.`
            )
          );
        }
      }),
    [sdk, session]
  );

  const countFac = (org: Organization) => withDefault(org, 'facilities', []).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Organizations</CardTitle>
      </CardHeader>
      <CardContent>
        {error ? (
          <Notice text={error.toString()} variant="destructive" />
        ) : orgs ? (
          <ul className="list-disc list-inside">
            {orgs.map((org) => (
              <li key={org.organizationId}>
                {org.displayName} (${countFac(org)})
              </li>
            ))}
          </ul>
        ) : (
          <Notice text="Loading..." />
        )}
      </CardContent>
    </Card>
  );
}

export { UserOrgList };
