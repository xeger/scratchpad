/* eslint-disable @typescript-eslint/no-explicit-any */

import { SDK, assertResponse } from '@scratch/svc.atlas';
import { Organization } from '@scratch/svc.atlas/models/components';
import { SDKError } from '@scratch/svc.atlas/models/errors';
import { ListUserOrgsQueryParamView } from '@scratch/svc.atlas/models/operations';
import type { UseQueryOptions } from '@tanstack/react-query';

// HACK: create fake approximations of views, as Goa doesn't generate OpenAPI types for the views
type Organization_Extended = Pick<NonNullable<Organization>, 'agents'>;
type Organization_Facilities = Pick<NonNullable<Organization>, 'facilities'>;

function listUserOrgs(
  sdk: SDK,
  userId: string,
  view: 'default'
): UseQueryOptions<Organization[], SDKError>;

function listUserOrgs(
  sdk: SDK,
  userId: string,
  view: 'extended'
): UseQueryOptions<Organization_Extended[], SDKError>;

function listUserOrgs(
  sdk: SDK,
  userId: string,
  view: 'facilities'
): UseQueryOptions<Organization_Facilities[], SDKError>;

function listUserOrgs(sdk: SDK, userId: string, view: string): UseQueryOptions<any, SDKError> {
  return {
    retry: (failureCount: number, error: SDKError) => error.statusCode >= 500 && failureCount < 3,
    queryKey: ['userOrgs', userId],
    queryFn: () =>
      sdk.iam
        .listUserOrgs(userId, view as ListUserOrgsQueryParamView)
        .then((response) => assertResponse(response, 'organizationCollection')),
  };
}

export { listUserOrgs };
