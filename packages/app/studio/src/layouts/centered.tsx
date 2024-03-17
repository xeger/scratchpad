export function CenteredLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="block">{children}</div>
    </div>
  );
}
