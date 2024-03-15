/**
 * Creates a screen-filling div; you can divide it up as you please.
 */
export function EmptyLayout({ children }: { children: React.ReactNode }) {
  return <div className="absolute bottom-0 left-0 right-0 top-0">{children}</div>;
}
