import { useAtlas } from '@scratch/svc.atlas';
import * as queries from '@scratch/svc.atlas/queries/iam';
import { useQuery } from '@tanstack/react-query';

export function useListUserOrgs() {
  const { sdk, session } = useAtlas();

  return useQuery(queries.listUserOrgs(sdk, session.userId));
}

export function useListUserOrgs_extended() {
  const { sdk, session } = useAtlas();

  return useQuery(queries.listUserOrgs_extended(sdk, session.userId));
}

export function useListUserOrgs_facilitiesDefault() {
  const { sdk, session } = useAtlas();

  return useQuery(queries.listUserOrgs_facilitiesDefault(sdk, session.userId));
}

export function useListUserOrgs_facilitiesExtended() {
  const { sdk, session } = useAtlas();

  return useQuery(queries.listUserOrgs_facilitiesExtended(sdk, session.userId));
}
