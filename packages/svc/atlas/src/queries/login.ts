/* eslint-disable @typescript-eslint/no-explicit-any */

import { LoginURL } from '@crossnokaye/typescript-sdk/models/components';
import { SDKError } from '@crossnokaye/typescript-sdk/models/errors';
import { Atlas } from '@scratch/svc.atlas';
import type { UseQueryOptions } from '@tanstack/react-query';
import { assertResponse } from '../httputil';

const retry = (failureCount: number, error: SDKError) =>
  error.httpMeta.response.status >= 500 && failureCount < 3;

export function loginurl(
  sdk: Atlas,
  email: string,
  state: string
): UseQueryOptions<LoginURL, SDKError> {
  return {
    retry,
    queryKey: ['login.loginurl', email, state],
    queryFn: () =>
      sdk.loginv2
        .loginv2Loginurl(email, state)
        .then((response) => assertResponse(response, 'loginURL')),
  };
}
