/**
 * A layout that fills the entire screen
 */
export function InlineFrameLayout({ children }: { children: React.ReactNode }) {
  return <div className="h-screen w-screen m-0 p-0">{children}</div>;
}
