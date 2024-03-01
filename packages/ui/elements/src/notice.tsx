import { cn } from '@scratch/ui.primitives/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const announcementVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-muted text-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface NoticeProps extends VariantProps<typeof announcementVariants> {
  alt?: string;
  text: string;
}

/**
 * An example of a trivial UI element that has the same features (e.g. responsiveness, variants) as a ShadCN primitive.
 */
export function Notice({ alt, text, variant }: NoticeProps) {
  return (
    <span
      className={cn(
        announcementVariants({
          variant,
          className: 'inline-flex items-center rounded-lg px-3 py-1 text-sm font-medium',
        })
      )}
    >
      <span className="max-w-screen-sm sm:hidden text-ellipsis">{alt ?? text}</span>
      <span className="hidden sm:inline">{text}</span>
    </span>
  );
}
