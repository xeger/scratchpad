import { Separator } from "@scratch/ui.primitives/separator";

export function Announcement() {
  return (
    <a
      href="/docs/changelog"
      className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
    >
      🎉 <Separator className="mx-2 h-4" orientation="vertical" />{" "}
      <span className="sm:hidden">Good stuff!</span>
      <span className="hidden sm:inline">
        An abundance of amazing changes have landed!
      </span>
    </a>
  );
}
