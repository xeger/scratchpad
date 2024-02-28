import { Announcement } from "@scratch/ui.elements/announcement";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@scratch/ui.elements/page-header";
import { SiteFooter } from "@scratch/ui.elements/site-footer";
import { SiteHeader } from "@scratch/ui.elements/site-header";
import { ThemeProvider } from "@scratch/ui.elements/theme-provider";
import { Button } from "@scratch/ui.primitives/button";
import { Toaster } from "@scratch/ui.primitives/toaster";
import { useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import { UserOrgList } from "./experiments/speakeasy";
import shadcnLogo from "/shadcn.png";
import viteLogo from "/vite.svg";

const variants = [
  "default",
  "destructive",
  "outline",
  "secondary",
  "ghost",
  "link",
] as const;

function App() {
  const [count, setCount] = useState(0);

  const variant = variants[count % variants.length];

  return (
    <ThemeProvider>
      <SiteHeader />
      <PageHeader>
        <Announcement />
        <PageHeaderHeading>Lorem Ipsum</PageHeaderHeading>
        <PageHeaderDescription>
          Consectetur adipiscing elit.
        </PageHeaderDescription>
      </PageHeader>
      <p>
        Here is a pretty button to prove that theme colors work:
        <Button
          className="block"
          onClick={() => setCount(count + 1)}
          variant={variant}
        >
          {variant} {count}
        </Button>
      </p>
      <p>Here is proof that the API SDK works:</p>
      <UserOrgList />
      <hr className="my-8" />
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
