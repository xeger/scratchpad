import { Button } from "@scratch/lib.shadow/ui/button";
import { Toaster } from "@scratch/lib.shadow/ui/toaster";
import { useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import Thing from "./localstuff/Thing";
import { Announcement } from "./localstuff/announcement";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "./localstuff/page-header";
import { SiteFooter } from "./localstuff/site-footer";
import { SiteHeader } from "./localstuff/site-header";
import { ThemeProvider } from "./localstuff/theme-provider";
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla interdum
        vulputate diam. Nam turpis leo, iaculis vel diam nec, vestibulum
        molestie ante. Integer suscipit sem ac varius vehicula. Vivamus varius
        odio sit amet fringilla eleifend. Fusce placerat, purus in egestas
        euismod, erat velit fermentum metus, in convallis urna urna blandit
        massa. Phasellus at auctor purus. Ut fermentum, libero interdum
        fermentum posuere, sem augue mollis arcu, blandit interdum nisi massa
        non metus. Mauris pretium augue ut enim mollis posuere. Fusce nec neque
        tellus. Nam eu dui quis orci tempus porta. Praesent urna lectus, blandit
        eu faucibus ac, malesuada eu elit.
      </p>
      <Thing />
      <Button onClick={() => setCount(count + 1)} variant={variant}>
        {variant} {count}
      </Button>
      <p>
        Integer porta placerat risus, bibendum semper ex sodales non. Phasellus
        nunc quam, malesuada vel metus feugiat, lobortis suscipit ex. Nunc nec
        ex dapibus, consectetur orci quis, congue ipsum. Vivamus molestie purus
        vel quam aliquam vulputate. Curabitur id ligula lobortis est porta
        dignissim. Ut eu ligula mi. Nam lacinia est nec sem iaculis aliquam.
        Aenean laoreet libero nec nulla lacinia, sit amet molestie mauris
        sollicitudin.
      </p>
      <hr className="my-8" />
      <div className="flex-row w-full">
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
