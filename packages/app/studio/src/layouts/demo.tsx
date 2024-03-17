import { Toaster } from '@crossnokaye/ui-primitives/toaster';
import { Notice } from '@scratch/ui.elements/notice';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@scratch/ui.elements/page-header';
import { SiteFooter } from '@scratch/ui.elements/site-footer';
import { SiteHeader } from '@scratch/ui.elements/site-header';

/**
 * Copied from https://ui.shadcn.com to explore the way the ShadCN guy thinks about page layout.
 */
export function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <PageHeader>
        <Notice
          alt="Sup, mobile user?"
          text="I am happy to see that you are visiting our app on a huge monitor that has plenty of horizontal space for me to fill!"
        />
        <PageHeaderHeading>Lorem Ipsum</PageHeaderHeading>
        <PageHeaderDescription>Consectetur adipiscing elit.</PageHeaderDescription>
      </PageHeader>
      {children}
      <SiteFooter />
      <Toaster />
    </>
  );
}
