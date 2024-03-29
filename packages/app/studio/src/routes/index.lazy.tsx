import { Link, createLazyFileRoute } from '@tanstack/react-router';
import reactLogo from '../assets/react.svg';
import { DemoLayout } from '../layouts/demo';
import shadcnLogo from '/shadcn.png';
import viteLogo from '/vite.svg';

import { useAtlas } from '@scratch/svc.atlas';
import { Notice } from '@scratch/ui.elements/notice';
import './index.css';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  const { sessionMeta } = useAtlas();

  return (
    <DemoLayout>
      {sessionMeta.status === 'authenticated' ? (
        <Notice text={`Hello, ${sessionMeta.userId}!`} />
      ) : null}
      Welcome to the scratchpad: a disposable place to play with user interface technologies and
      design ideas.
      <h1>Hackathon Fodder</h1>
      <ul className="list-disc list-inside">
        <li>
          <Link to="/session">Login/Logout</Link>
        </li>
        <li>
          <Link to="/facilities/latest">Darkwing Mockup</Link>
        </li>
      </ul>
      <h1>User Interface Experiments</h1>
      <ul className="list-disc list-inside">
        <li>
          <Link to="/facilities/latest">Darkwing Mockup</Link>
        </li>
        <li>
          <Link to="/experiments/frame">IFrame Embedding</Link> (and{' '}
          <Link to="/experiments/shadow-root">ShadowRoot Embedding</Link>)
        </li>
        <li>
          <Link to="/experiments/variants">Stylistic Variants</Link>
        </li>
      </ul>
      <div className="flex items-center justify-center w-full">
        <a href="https://react.dev/">
          <img src={reactLogo} className="inline logo" alt="React logo" />
        </a>
        <a href="https://vitejs.dev/">
          <img src={viteLogo} className="inline logo" alt="Vite logo" />
        </a>
        <a href="https://ui.shadcn.com/">
          <img src={shadcnLogo} className="inline logo" alt="Vite logo" />
        </a>
      </div>
    </DemoLayout>
  );
}
