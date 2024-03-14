/* eslint-disable @typescript-eslint/no-explicit-any */

import { Atlas, AtlasSession, assertResponse } from '@scratch/svc.atlas';
import { Organization } from '@scratch/svc.atlas/models/components';
import { SDKError } from '@scratch/svc.atlas/models/errors';
import { ListUserOrgsQueryParamView } from '@scratch/svc.atlas/models/operations';
import {
  Organization_Extended,
  Organization_FacilitiesDefault,
  Organization_FacilitiesExtended,
} from '@scratch/svc.atlas/models/views';
import type { UseQueryOptions } from '@tanstack/react-query';

// Speakeasy supports a discriminator & can generate one endpoint-wrapping method per `view` value
export function listUserOrgs(
  sdk: Atlas,
  session: AtlasSession,
  userId: string
): UseQueryOptions<Organization[], SDKError> {
  return {
    // Speakeasy can do this for us & we can turn it off with RQ
    retry: (failureCount: number, error: SDKError) =>
      (error.message.match(/5[0-9][0-9]/) && failureCount < 3) || false,
    queryKey: ['userOrgs', userId],
    // Speakeasy support custom code generation pre- or post-fetch using "hooks"
    queryFn: () =>
      sdk.iam
        .listUserOrgs(session.security, userId)
        .then((response) => assertResponse(response, 'organizationCollection')),
  };
}

export function listUserOrgs_extended(
  sdk: Atlas,
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
  sdk: Atlas,
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
  sdk: Atlas,
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
