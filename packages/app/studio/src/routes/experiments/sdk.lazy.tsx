import { Card, CardContent, CardHeader, CardTitle } from '@crossnokaye/ui-primitives/card';
import { Skeleton } from '@crossnokaye/ui-primitives/skeleton';
import { useListUserOrgs_facilitiesExtended } from '@scratch/svc.atlas/hooks/iam';
import { Organization_FacilitiesExtended } from '@scratch/svc.atlas/models/views';
import { Notice } from '@scratch/ui.elements/notice';
import { createLazyFileRoute } from '@tanstack/react-router';
import { NormalLayout } from '../../layouts/normal';

export const Route = createLazyFileRoute('/experiments/sdk')({
  component: UserOrgList,
});

function UserOrgList() {
  const { data, error, isPending } = useListUserOrgs_facilitiesExtended();

  const countFac = (org: Organization_FacilitiesExtended) => org.facilities.length;

  return (
    <NormalLayout>
      <Card>
        <CardHeader>
          <CardTitle>My Organizations</CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <Notice text={error.toString()} variant="destructive" />
          ) : isPending ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[300px]" />
            </div>
          ) : (
            <div className="space-y-2">
              {data.map((org) => (
                <div key={org.organizationId}>
                  {org.displayName} (${countFac(org)})
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </NormalLayout>
  );
}
