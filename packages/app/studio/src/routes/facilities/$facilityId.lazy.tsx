import { createLazyFileRoute } from '@tanstack/react-router';
import { FacilityScopedLayout } from '../../layouts/facility-scoped';

export const Route = createLazyFileRoute('/facilities/$facilityId')({
  component: FacilityShow,
});

function FacilityShow() {
  const { facilityId } = Route.useParams();
  return <FacilityScopedLayout>Welcome to facility {facilityId}!</FacilityScopedLayout>;
}
