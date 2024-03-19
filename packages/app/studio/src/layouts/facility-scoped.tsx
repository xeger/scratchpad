import { Toaster } from '@crossnokaye/ui-primitives/toaster';
import { useListUserOrgs_facilitiesDefault } from '@scratch/svc.atlas/hooks/iam';
import { OrgSheet } from '@scratch/ui.elements/org-sheet';
import { SiteHeader } from '@scratch/ui.elements/site-header';

/**
 * Layout that emulates the look of Darkwing.
 * Suitable for routes that are interacting with a specific facility.
 *
 * TODO - figure out OrgBar, sheet, etc ... more darkwing-ish
 */
export function FacilityScopedLayout({ children }: { children: React.ReactNode }) {
  const { data } = useListUserOrgs_facilitiesDefault();

  return (
    <>
      <SiteHeader />
      <OrgSheet orgs={data} side="left">
        {children}
      </OrgSheet>
      <Toaster />
    </>
  );
}
