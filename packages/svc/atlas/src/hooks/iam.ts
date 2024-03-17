import { useAtlas } from '@scratch/svc.atlas';
import * as queries from '@scratch/svc.atlas/queries/iam';
import { useQuery } from '@tanstack/react-query';

export function useListUserOrgs() {
  const { sdk, sessionMeta } = useAtlas();

  return useQuery(queries.listUserOrgs(sdk, sessionMeta, sessionMeta.userId));
}

export function useListUserOrgs_extended() {
  const { sdk, sessionMeta } = useAtlas();

  return useQuery(queries.listUserOrgs_extended(sdk, sessionMeta, sessionMeta.userId));
}

export function useListUserOrgs_facilitiesDefault() {
  const { sdk, sessionMeta } = useAtlas();

  return useQuery(queries.listUserOrgs_facilitiesDefault(sdk, sessionMeta, sessionMeta.userId));
}

export function useListUserOrgs_facilitiesExtended() {
  const { sdk, sessionMeta } = useAtlas();

  return useQuery(queries.listUserOrgs_facilitiesExtended(sdk, sessionMeta, sessionMeta.userId));
}
