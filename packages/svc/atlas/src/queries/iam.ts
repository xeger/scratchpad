/* eslint-disable @typescript-eslint/no-explicit-any */

import { SDK, assertResponse } from '@scratch/svc.atlas';
import { Organization } from '@scratch/svc.atlas/models/components';
import { SDKError } from '@scratch/svc.atlas/models/errors';
import { ListUserOrgsQueryParamView } from '@scratch/svc.atlas/models/operations';
import {
  Organization_Extended,
  Organization_FacilitiesDefault,
  Organization_FacilitiesExtended,
} from '@scratch/svc.atlas/models/views';
import type { UseQueryOptions } from '@tanstack/react-query';

export function listUserOrgs(sdk: SDK, userId: string): UseQueryOptions<Organization[], SDKError> {
  return {
    retry: (failureCount: number, error: SDKError) => error.statusCode >= 500 && failureCount < 3,
    queryKey: ['userOrgs', userId],
    queryFn: () =>
      sdk.iam
        .listUserOrgs(userId)
        .then((response) => assertResponse(response, 'organizationCollection')),
  };
}

export function listUserOrgs_extended(
  sdk: SDK,
  userId: string
): UseQueryOptions<Organization_Extended[], SDKError> {
  return {
    retry: (failureCount: number, error: SDKError) => error.statusCode >= 500 && failureCount < 3,
    queryKey: ['userOrgs', userId],
    queryFn: () =>
      sdk.iam
        .listUserOrgs(userId, ListUserOrgsQueryParamView.Extended)
        .then(
          (response) =>
            assertResponse(response, 'organizationCollection') as Organization_Extended[]
        ),
  };
}

export function listUserOrgs_facilitiesDefault(
  sdk: SDK,
  userId: string
): UseQueryOptions<Organization_FacilitiesDefault[], SDKError> {
  return {
    retry: (failureCount: number, error: SDKError) => error.statusCode >= 500 && failureCount < 3,
    queryKey: ['userOrgs', userId],
    queryFn: () =>
      sdk.iam
        .listUserOrgs(userId, ListUserOrgsQueryParamView.FacilitiesDefault)
        .then(
          (response) =>
            assertResponse(response, 'organizationCollection') as Organization_FacilitiesDefault[]
        ),
  };
}

export function listUserOrgs_facilitiesExtended(
  sdk: SDK,
  userId: string
): UseQueryOptions<Organization_FacilitiesExtended[], SDKError> {
  return {
    retry: (failureCount: number, error: SDKError) => error.statusCode >= 500 && failureCount < 3,
    queryKey: ['userOrgs', userId],
    queryFn: () =>
      sdk.iam
        .listUserOrgs(userId, ListUserOrgsQueryParamView.FacilitiesExtended)
        .then(
          (response) =>
            assertResponse(response, 'organizationCollection') as Organization_FacilitiesExtended[]
        ),
  };
}
