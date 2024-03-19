import { useListUserOrgs_facilitiesDefault } from '@scratch/svc.atlas/hooks/iam';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/facilities/latest')({
  component: FacilityLatest,
});

// TODO: handle error & isPending (centered layout + spinner?)
function FacilityLatest() {
  const { data } = useListUserOrgs_facilitiesDefault();
  const navigate = useNavigate();
  if (data) {
    navigate({
      to: '/facilities/$facilityId',
      params: { facilityId: data[0].facilities[0].facilityId },
    });
  }
}
