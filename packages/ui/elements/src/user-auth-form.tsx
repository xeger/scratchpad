'use client';

import * as React from 'react';

import { Button } from '@crossnokaye/ui-primitives/button';
import { Input } from '@crossnokaye/ui-primitives/input';
import { Label } from '@crossnokaye/ui-primitives/label';
import { cn } from '@crossnokaye/ui-primitives/utils';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * TODO: allow caller to provide default email as a prop (for remember-me stuffs)
 */
export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              User Email
            </Label>
            <Input
              id="email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <span>icons.Spinner</span>}
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}
