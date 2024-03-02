import { Notice } from '@scratch/ui.elements/notice';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@scratch/ui.elements/page-header';
import { SiteFooter } from '@scratch/ui.elements/site-footer';
import { SiteHeader } from '@scratch/ui.elements/site-header';
import { ThemeProvider } from '@scratch/ui.elements/theme-provider';
import { Toaster } from '@scratch/ui.primitives/toaster';
import './App.css';
import reactLogo from './assets/react.svg';
import { UserOrgList } from './experiments/speakeasy';
import { Variants } from './experiments/variants';
import shadcnLogo from '/shadcn.png';
import viteLogo from '/vite.svg';

function App() {
  return (
    <ThemeProvider>
      <SiteHeader />
      <PageHeader>
        <Notice
          alt="Sup, mobile user?"
          text="I am happy to see that you are visiting our app on a huge monitor that has plenty of horizontal space for me to fill!"
        />
        <PageHeaderHeading>Lorem Ipsum</PageHeaderHeading>
        <PageHeaderDescription>Consectetur adipiscing elit.</PageHeaderDescription>
      </PageHeader>
      <div className="flex-col items-center justify-center space-y-4">
        <Variants />
        <UserOrgList />
      </div>
      <div className="flex items-center justify-center w-full">
        <a href="https://react.dev/">
          <img src={reactLogo} className="inline logo" alt="React logo" />
        </a>
        <a href="https://vitejs.dev/">
          <img src={viteLogo} className="inline logo" alt="Vite logo" />
        </a>
        <a href="https://ui.shadcn.com/">
          <img src={shadcnLogo} className="inline logo" alt="Vite logo" />
        </a>
      </div>
      <SiteFooter />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
