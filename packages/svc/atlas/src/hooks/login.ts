import { useAtlas } from '@scratch/svc.atlas';
import * as queries from '@scratch/svc.atlas/queries/login';
import { useQuery } from '@tanstack/react-query';

export function useLoginurl(email: string, state: string) {
  const { sdk } = useAtlas();

  return useQuery(queries.loginurl(sdk, email, state));
}
