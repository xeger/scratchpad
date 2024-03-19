import { useListUserOrgs_facilitiesExtended } from '@scratch/svc.atlas/hooks/iam';
import { createLazyFileRoute } from '@tanstack/react-router';
import { FacilityScopedLayout } from '../../layouts/facility-scoped';

export const Route = createLazyFileRoute('/facilities/$facilityId')({
  component: FacilityShow,
});

function FacilityShow() {
  const { facilityId } = Route.useParams();
  const { data } = useListUserOrgs_facilitiesExtended();

  const org = data?.find((org) => org.facilities.some((fac) => fac.facilityId === facilityId));
  const facility = org?.facilities?.find((fac) => fac.facilityId === facilityId);

  return (
    <FacilityScopedLayout>
      <p>
        Welcome to facility {facility?.displayName} with your host, {facility?.supportContactName}.
      </p>
      <p>
        We have the following lovely agents:
        <ul>{facility?.agents?.map((a) => <li>{a.agentId}</li>)}</ul>
      </p>
    </FacilityScopedLayout>
  );
}
