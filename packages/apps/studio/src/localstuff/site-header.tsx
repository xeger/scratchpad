import { ModeToggle } from "./mode-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        MainNav MobileNav
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            CommandMenu
          </div>
          <nav className="flex gap-2 items-center">
            <a href="https://youtu.be/dQw4w9WgXcQ">lorem</a>
            <a href="https://youtu.be/dQw4w9WgXcQ">ipsum</a>
            <a href="https://youtu.be/dQw4w9WgXcQ">dolor</a>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
