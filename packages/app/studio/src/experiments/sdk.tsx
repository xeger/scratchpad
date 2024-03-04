import { assertResponse, useAtlas, withDefault } from '@scratch/svc.atlas';
import { Organization } from '@scratch/svc.atlas/models/components';
import { Notice } from '@scratch/ui.elements/notice';
import { Card, CardContent, CardHeader, CardTitle } from '@scratch/ui.primitives/card';
import { useQuery } from '@tanstack/react-query';

function UserOrgList() {
  const { sdk, session } = useAtlas();

  const { data, error, isPending } = useQuery({
    queryKey: ['userOrgs', session.userId],
    queryFn: () =>
      sdk.iam
        .listUserOrgs(session?.userId ?? '')
        .then((response) => assertResponse(response, 'organizationCollection')),
  });

  const countFac = (org: Organization) => withDefault(org, 'facilities', []).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Organizations</CardTitle>
      </CardHeader>
      <CardContent>
        {error ? (
          <Notice text={error.toString()} variant="destructive" />
        ) : isPending ? (
          <Notice text="Loading..." />
        ) : (
          <ul className="list-disc list-inside">
            {data.map((org) => (
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
