import { createLazyFileRoute } from '@tanstack/react-router';
import { FacilityScopedLayout } from '../../layouts/facility-scoped';

export const Route = createLazyFileRoute('/experiments/sdk')({
  component: UserOrgList,
});

function UserOrgList() {
  return <FacilityScopedLayout>Hi. Here is some stuff about a facility.</FacilityScopedLayout>;
}
