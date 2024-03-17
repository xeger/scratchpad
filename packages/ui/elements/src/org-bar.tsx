import { Avatar, AvatarFallback } from '@crossnokaye/ui-primitives/avatar';
import { Skeleton } from '@crossnokaye/ui-primitives/skeleton';

export interface OrgBarProps {
  orgs?: { organizationId: string; displayName: string }[];
}

function shorten(displayName: string) {
  let fallback = displayName.replace(/[^A-Z]/g, '');
  if (fallback.length > 2) {
    fallback = fallback[0] + fallback[fallback.length - 1];
  }
  return fallback;
}

export function OrgBar({ orgs: orgs }: OrgBarProps) {
  return (
    <div className="flex flex-col sticky left-0 h-full z-50">
      <Avatar>
        <AvatarFallback>CK</AvatarFallback>
      </Avatar>
      <hr />
      {orgs ? (
        orgs.map((org) => (
          <Avatar key={org.organizationId}>
            <AvatarFallback>{shorten(org.displayName)}</AvatarFallback>
          </Avatar>
        ))
      ) : (
        <>
          <Skeleton className="rounded-full" />
          <Skeleton className="rounded-full" />
          <Skeleton className="rounded-full" />
        </>
      )}
      <hr />
      (sess)
    </div>
  );
}
