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
        defaultValue="https://local.darkwing.atlasoffice.io"
        onValueChange={(value) => {
          frame.current?.setAttribute('src', value);
        }}
      >
        <TabsList>
          <TabsTrigger value="https://local.darkwing.atlasoffice.io">Darkwing</TabsTrigger>
          <TabsTrigger value="https://crossnokaye.com">Marketing</TabsTrigger>
          <TabsTrigger value="https://xeger.net">Xeger</TabsTrigger>
          <TabsTrigger value="https://google.com">Google</TabsTrigger>
        </TabsList>
      </Tabs>
      <iframe
        className="h-full w-full"
        ref={frame}
        src="/f/office_everett_(boston_harbor)/process-view"
      />
    </InlineFrameLayout>
  );
}
