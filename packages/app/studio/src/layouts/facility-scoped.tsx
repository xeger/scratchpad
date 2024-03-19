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
import { Toaster } from '@crossnokaye/ui-primitives/toaster';
import { cn } from '@crossnokaye/ui-primitives/utils';
import { useListUserOrgs_facilitiesDefault } from '@scratch/svc.atlas/hooks/iam';
import { SiteHeader } from '@scratch/ui.elements/site-header';
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

export interface ChooserProps {
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

function Teaser({ orgs, side }: Pick<ChooserProps, 'orgs' | 'side'>) {
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

function PageContent({ children, side }: Pick<ChooserProps, 'children' | 'side'>) {
  return <div className={side === 'left' ? 'mr-14' : 'ml-14'}>{children}</div>;
}

function Chooser({ orgs }: Pick<ChooserProps, 'orgs'>) {
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
              <Link
                to={'/facilities/$facilityId'}
                params={{ facilityId: facility.facilityId }}
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

function ChooserSheet({ children, orgs, side = 'left' }: ChooserProps) {
  return (
    <Sheet>
      <SheetTrigger disabled={!orgs?.length}>
        <Teaser orgs={orgs} side={side} />
      </SheetTrigger>
      <PageContent>{children}</PageContent>
      <SheetContent side={side} className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>(logo)&nbsp;ATLAS&nbsp;Platform</SheetTitle>
          <Separator />
        </SheetHeader>
        <Chooser orgs={orgs} />
      </SheetContent>
    </Sheet>
  );
}

/**
 * Layout that emulates the look of Darkwing.
 * Suitable for routes that are interacting with a specific facility.
 */
export function FacilityScopedLayout({ children }: { children: React.ReactNode }) {
  const { data } = useListUserOrgs_facilitiesDefault();

  return (
    <>
      <SiteHeader />
      <ChooserSheet orgs={data} side="left">
        {children}
      </ChooserSheet>
      <Toaster />
    </>
  );
}
