/**
 * Made from scratch to push the limits of iframes.
 */
export function InlineFrameLayout({ children }: { children: React.ReactNode }) {
  return <div className="absolute bottom-0 left-0 right-0 top-0">{children}</div>;
}
