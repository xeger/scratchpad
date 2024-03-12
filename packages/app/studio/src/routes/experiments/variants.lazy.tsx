import { Button } from '@crossnokaye/ui-primitives/button';
import { Card, CardContent, CardHeader, CardTitle } from '@crossnokaye/ui-primitives/card';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { NormalLayout } from '../../layouts/normal';

export const Route = createLazyFileRoute('/experiments/variants')({
  component: Variants,
});

const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const;

function Variants() {
  const [count, setCount] = useState(0);

  const variant = variants[count % variants.length];

  return (
    <NormalLayout>
      <Card>
        <CardHeader>
          <CardTitle>Component Variants</CardTitle>
        </CardHeader>
        <CardContent>
          Here is a pretty button to prove that theme colors work:
          <Button className="block" onClick={() => setCount(count + 1)} variant={variant}>
            {variant} {count}
          </Button>
        </CardContent>
      </Card>
    </NormalLayout>
  );
}
