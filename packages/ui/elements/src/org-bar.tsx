import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@crossnokaye/ui-primitives/accordion';
import { Avatar, AvatarFallback } from '@crossnokaye/ui-primitives/avatar';
import { Separator } from '@crossnokaye/ui-primitives/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@crossnokaye/ui-primitives/sheet';
import { Skeleton } from '@crossnokaye/ui-primitives/skeleton';
import { Link } from '@tanstack/react-router';

interface FacilitySubset {
  facilityId: string;
  displayName: string;
}

interface OrganizationSubset {
  organizationId: string;
  displayName: string;
  facilities: FacilitySubset[];
}

export interface OrgBarProps {
  orgs?: OrganizationSubset[];
}

function shorten(displayName: string) {
  let fallback = displayName.replace(/[^A-Z]/g, '');
  if (fallback.length > 2) {
    fallback = fallback[0] + fallback[fallback.length - 1];
  }
  return fallback;
}

function representOrg(org: OrganizationSubset) {
  return (
    <Avatar key={org.organizationId}>
      <AvatarFallback>{shorten(org.displayName)}</AvatarFallback>
    </Avatar>
  );
}

function representFacility(fac: FacilitySubset) {
  return (
    <Avatar key={fac.facilityId}>
      <AvatarFallback>{shorten(fac.displayName)}</AvatarFallback>
    </Avatar>
  );
}

function Teaser({ orgs }: Pick<OrgBarProps, 'orgs'>) {
  return (
    <div className="grid grid-cols-1 sticky left-0 h-full z-50 m-1">
      {orgs ? (
        orgs.map(representOrg)
      ) : (
        <>
          <Skeleton className="rounded-full" />
          <Skeleton className="rounded-full" />
          <Skeleton className="rounded-full" />
        </>
      )}
      <Separator className="my-1" />
      (sess)
    </div>
  );
}

function Picker({ orgs }: Pick<OrgBarProps, 'orgs'>) {
  return (
    <Accordion type="multiple" className="w-full">
      {orgs?.map((org) => (
        <AccordionItem value={org.organizationId}>
          <AccordionTrigger>
            <div className="flex flex-row justify-items-start items-center">
              {representOrg(org)}&nbsp;{org.displayName}
            </div>
          </AccordionTrigger>
          <AccordionContent className="grid grid-cols-1">
            {org.facilities.map((facility) => (
              // TODO: figure out routing scheme for facility display
              <Link
                to={`#${facility.facilityId}`}
                className="flex flex-row justify-items-start items-center"
              >
                {representFacility(facility)}&nbsp;{facility.displayName}
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function OrgBar({ orgs }: OrgBarProps) {
  return (
    <Sheet>
      <SheetTrigger disabled={!orgs?.length}>
        <Teaser orgs={orgs} />
      </SheetTrigger>
      <SheetContent side="left" className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>(logo)&nbsp;ATLAS&nbsp;Platform</SheetTitle>
          <Separator />
        </SheetHeader>
        <Picker orgs={orgs} />
      </SheetContent>
    </Sheet>
  );
}
