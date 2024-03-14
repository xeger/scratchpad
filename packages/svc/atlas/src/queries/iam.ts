/* eslint-disable @typescript-eslint/no-explicit-any */

import { Organization } from '@crossnokaye/typescript-sdk/models/components';
import { SDKError } from '@crossnokaye/typescript-sdk/models/errors';
import { ListUserOrgsQueryParamView } from '@crossnokaye/typescript-sdk/models/operations';
import { Atlas, AtlasSession } from '@scratch/svc.atlas';
import {
  Organization_Extended,
  Organization_FacilitiesDefault,
  Organization_FacilitiesExtended,
} from '@scratch/svc.atlas/models/views';
import type { UseQueryOptions } from '@tanstack/react-query';
import { assertResponse } from '../httputil';

const retry = (failureCount: number, error: SDKError) =>
  error.httpMeta.response.status >= 500 && failureCount < 3;

export function listUserOrgs(
  sdk: Atlas,
  session: AtlasSession,
  userId: string
): UseQueryOptions<Organization[], SDKError> {
  return {
    retry,
    queryKey: ['userOrgs', userId],
    queryFn: () =>
      sdk.iam
        .listUserOrgs(session.security, userId)
        .then((result) => assertResponse(result, 'organizationCollection')),
  };
}

export function listUserOrgs_extended(
  sdk: Atlas,
  session: AtlasSession,
  userId: string
): UseQueryOptions<Organization_Extended[], SDKError> {
  return {
    retry,
    queryKey: ['userOrgs', userId],
    queryFn: () =>
      sdk.iam
        .listUserOrgs(session.security, userId, ListUserOrgsQueryParamView.Extended)
        .then(
          (response) =>
            assertResponse(response, 'organizationCollection') as Organization_Extended[]
        ),
  };
}

export function listUserOrgs_facilitiesDefault(
  sdk: Atlas,
  session: AtlasSession,
  userId: string
): UseQueryOptions<Organization_FacilitiesDefault[], SDKError> {
  return {
    retry,
    queryKey: ['userOrgs', userId],
    queryFn: () =>
      sdk.iam
        .listUserOrgs(session.security, userId, ListUserOrgsQueryParamView.FacilitiesDefault)
        .then(
          (response) =>
            assertResponse(response, 'organizationCollection') as Organization_FacilitiesDefault[]
        ),
  };
}

export function listUserOrgs_facilitiesExtended(
  sdk: Atlas,
  session: AtlasSession,
  userId: string
): UseQueryOptions<Organization_FacilitiesExtended[], SDKError> {
  return {
    retry,
    queryKey: ['userOrgs', userId],
    queryFn: () =>
      sdk.iam
        .listUserOrgs(session.security, userId, ListUserOrgsQueryParamView.FacilitiesExtended)
        .then(
          (response) =>
            assertResponse(response, 'organizationCollection') as Organization_FacilitiesExtended[]
        ),
  };
}
