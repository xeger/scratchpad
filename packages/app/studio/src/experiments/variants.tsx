import { Button } from "@scratch/ui.primitives/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@scratch/ui.primitives/card';
import { useState } from "react";

const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const;

function Variants() {
  const [count, setCount] = useState(0);

  const variant = variants[count % variants.length];

  return (
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
  );
}

export { Variants };
