'use client';

import * as React from 'react';

import { Button } from '@crossnokaye/ui-primitives/button';
import { Input } from '@crossnokaye/ui-primitives/input';
import { Label } from '@crossnokaye/ui-primitives/label';
import { cn } from '@crossnokaye/ui-primitives/utils';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  hasPassword?: boolean;
  onNext: (email: string, password?: string) => Promise<void>;
}

/**
 * TODO: allow caller to provide default email as a prop (for remember-me stuffs)
 */
export function UserAuthForm({ className, hasPassword, onNext, ...props }: UserAuthFormProps) {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    try {
      await onNext(email, password);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label htmlFor="email">User Email</Label>
            <Input
              id="email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => setEmail(e.target.value)}
            />
            {hasPassword ? (
              <Input
                id="password"
                type="password"
                autoCorrect="off"
                disabled={isLoading}
                onChange={(e) => setPassword(e.target.value)}
              />
            ) : null}
          </div>
          <Button disabled={!email || isLoading}>
            {isLoading && <span>icons.Spinner</span>}
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}
