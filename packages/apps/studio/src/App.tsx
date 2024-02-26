import { Announcement } from "@scratch/components.ego/announcement";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@scratch/components.ego/page-header";
import { SiteFooter } from "@scratch/components.ego/site-footer";
import { SiteHeader } from "@scratch/components.ego/site-header";
import { ThemeProvider } from "@scratch/components.ego/theme-provider";
import { Button } from "@scratch/components.shadow/ui/button";
import { Toaster } from "@scratch/components.shadow/ui/toaster";
import { useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import UserOrgList from "./ui/UserOrgList";
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
      <p>
        Here is proof that the API SDK works:
        <UserOrgList />
      </p>
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
