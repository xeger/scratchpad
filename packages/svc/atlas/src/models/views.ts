import { Facility, Organization } from '@crossnokaye/typescript-sdk/models/components';

export type Facility_Default = Pick<
  Facility,
  'facilityId' | 'displayName' | 'shortName' | 'agents' | 'organizationId'
>;

export type Facility_Extended = Pick<
  Facility,
  | 'facilityId'
  | 'displayName'
  | 'shortName'
  | 'organizationId'
  | 'description'
  | 'address'
  | 'lat'
  | 'long'
  | 'timezone'
  | 'agents'
  | 'sheetId'
  | 'locationId'
  | 'useNarrativeFlow'
  | 'useAgentValidationFlow'
  // | 'supportContactName'
  // | 'supportContactPhone'
>;

export type Organization_Default = Pick<
  Organization,
  'organizationId' | 'displayName' | 'facilities' | 'name' | 'allowedDomains'
>;

export type Organization_Extended = Pick<
  Organization,
  'organizationId' | 'displayName' | 'name' | 'loginType' | 'facilities'
>;

export type Organization_FacilitiesDefault = Pick<
  Organization,
  'organizationId' | 'displayName' | 'name'
> & {
  facilities: Facility_Default[];
};

export type Organization_FacilitiesExtended = Pick<
  Organization,
  'organizationId' | 'displayName' | 'name'
> & { facilities: Facility_Extended[] };
