import { Toaster } from '@crossnokaye/ui-primitives/toaster';
import { SiteHeader } from '@scratch/ui.elements/site-header';

/**
 * Layout that emulates the look of Darkwing.
 * Suitable for routes that are interacting with a specific facility.
 *
 * TODO - figure out OrgBar, sheet, etc ... more darkwing-ish
 */
export function FacilityScopedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
      <Toaster />
    </>
  );
}
