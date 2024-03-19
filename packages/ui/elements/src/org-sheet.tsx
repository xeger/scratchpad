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
import { cn } from '@crossnokaye/ui-primitives/utils';
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

export interface OrgSheetProps {
  children: React.ReactNode;
  orgs?: OrganizationSubset[];
  side?: 'left' | 'right';
}

function shorten(displayName: string) {
  let fallback = displayName.replace(/[^A-Z0-9]/g, '');
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

function Teaser({ orgs, side }: Pick<OrgSheetProps, 'orgs' | 'side'>) {
  return (
    <div className={cn('fixed', 'flex', 'flex-col', `${side}-0`, 'h-full', 'z-50', 'w-10', 'm-1')}>
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

function ChildContent({ children, side }: Pick<OrgSheetProps, 'children' | 'side'>) {
  return <div className={side === 'left' ? 'mr-14' : 'ml-14'}>{children}</div>;
}

function Picker({ orgs }: Pick<OrgSheetProps, 'orgs'>) {
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

export function OrgSheet({ children, orgs, side = 'left' }: OrgSheetProps) {
  return (
    <Sheet>
      <SheetTrigger disabled={!orgs?.length}>
        <Teaser orgs={orgs} side={side} />
      </SheetTrigger>
      <ChildContent>{children}</ChildContent>
      <SheetContent side={side} className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>(logo)&nbsp;ATLAS&nbsp;Platform</SheetTitle>
          <Separator />
        </SheetHeader>
        <Picker orgs={orgs} />
      </SheetContent>
    </Sheet>
  );
}
