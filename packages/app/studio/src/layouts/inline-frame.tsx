/**
 * A layout that fills the entire screen.
 * Use with janky darkwing-embedded-in-iframe experiments.
 */
export function InlineFrameLayout({ children }: { children: React.ReactNode }) {
  return <div className="h-screen w-screen m-0 p-0">{children}</div>;
}
