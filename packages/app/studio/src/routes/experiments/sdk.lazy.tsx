import { Card, CardContent, CardHeader, CardTitle } from '@crossnokaye/ui-primitives/card';
import { Skeleton } from '@crossnokaye/ui-primitives/skeleton';
import { useListUserOrgs_facilitiesExtended } from '@scratch/svc.atlas/hooks/iam';
import { Organization_FacilitiesExtended } from '@scratch/svc.atlas/models/views';
import { Notice } from '@scratch/ui.elements/notice';
import { OrgBar } from '@scratch/ui.elements/org-bar';
import { createLazyFileRoute } from '@tanstack/react-router';
import { FacilityScopedLayout } from '../../layouts/facility-scoped';

export const Route = createLazyFileRoute('/experiments/sdk')({
  component: UserOrgList,
});

function UserOrgList() {
  const { data, error, isPending } = useListUserOrgs_facilitiesExtended();

  const countFac = (org: Organization_FacilitiesExtended) => org.facilities.length;

  return (
    <FacilityScopedLayout>
      <div className="flex flex-row">
        <div>
          <OrgBar orgs={data?.length ? data : []} />
        </div>
        <div>
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
                      {org.displayName} ({countFac(org)} facilities)
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </FacilityScopedLayout>
  );
}
