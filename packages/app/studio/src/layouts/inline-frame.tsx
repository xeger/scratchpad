import { Notice } from '@scratch/ui.elements/notice';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@scratch/ui.elements/page-header';
import { SiteHeader } from '@scratch/ui.elements/site-header';

export function InlineFrameLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <div>
        <SiteHeader />
        <PageHeader>
          <Notice
            alt="Sup, mobile user?"
            text="I am happy to see that you are visiting our app on a huge monitor that has plenty of horizontal space for me to fill!"
          />
          <PageHeaderHeading>Lorem Ipsum</PageHeaderHeading>
          <PageHeaderDescription>Consectetur adipiscing elit.</PageHeaderDescription>
        </PageHeader>
      </div>
      <div className="flex-1 h-full">{children}</div>
    </div>
  );
}
