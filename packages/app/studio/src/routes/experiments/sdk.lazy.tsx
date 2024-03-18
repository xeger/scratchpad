import { useListUserOrgs_facilitiesExtended } from '@scratch/svc.atlas/hooks/iam';
import { Organization_FacilitiesExtended } from '@scratch/svc.atlas/models/views';
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
        <div>here is some stuff about a facility</div>
      </div>
    </FacilityScopedLayout>
  );
}
