import { Tabs, TabsList, TabsTrigger } from '@crossnokaye/ui-primitives/tabs';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { InlineFrameLayout } from '../../layouts/inline-frame';

export const Route = createLazyFileRoute('/experiments/shadow-root')({
  component: Frame,
});

function Frame() {
  const frame = useRef<HTMLDivElement>(null);
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null);
  const [indexHtml, setIndexHtml] = useState('');

  useEffect(() => {
    if (shadowRoot && indexHtml) {
      shadowRoot.innerHTML = indexHtml;
      return;
    }
    if (frame.current && !frame.current.shadowRoot) {
      setShadowRoot(frame.current.attachShadow({ delegatesFocus: true, mode: 'open' }));
    }
    if (!indexHtml) {
      fetch('https://local.darkwing.atlasoffice.io')
        .then((r) => r.text())
        .then(setIndexHtml);
    }
  }, [shadowRoot, indexHtml]);

  return (
    <InlineFrameLayout>
      <Tabs
        defaultValue="https://local.darkwing.atlasoffice.io"
        onValueChange={(value) => {
          //frame.current?.setAttribute('src', value);
        }}
      >
        <TabsList>
          <TabsTrigger value="https://local.darkwing.atlasoffice.io">Darkwing</TabsTrigger>
          <TabsTrigger value="https://crossnokaye.com">Marketing</TabsTrigger>
          <TabsTrigger value="https://xeger.net">Xeger</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="h-full w-full" ref={frame} />
    </InlineFrameLayout>
  );
}
