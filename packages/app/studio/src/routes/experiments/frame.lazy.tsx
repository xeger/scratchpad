import { Tabs, TabsList, TabsTrigger } from '@crossnokaye/ui-primitives/tabs';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useRef } from 'react';
import { InlineFrameLayout } from '../../layouts/inline-frame';

export const Route = createLazyFileRoute('/experiments/frame')({
  component: Frame,
});

function Frame() {
  const frame = useRef<HTMLIFrameElement>(null);

  return (
    <InlineFrameLayout>
      <Tabs
        defaultValue="https://atlassandbox.io"
        onValueChange={(value) => {
          frame.current?.setAttribute('src', value);
        }}
      >
        <TabsList>
          <TabsTrigger value="https://atlassandbox.io">One</TabsTrigger>
          <TabsTrigger value="https://crossnokaye.com">Two</TabsTrigger>
        </TabsList>
      </Tabs>
      <iframe className="h-full w-full" ref={frame} src="https://atlassandbox.io" />
    </InlineFrameLayout>
  );
}
