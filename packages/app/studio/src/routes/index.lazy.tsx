import { Link, createLazyFileRoute } from '@tanstack/react-router';
import reactLogo from '../assets/react.svg';
import { NormalLayout } from '../layouts/normal';
import shadcnLogo from '/shadcn.png';
import viteLogo from '/vite.svg';

import './index.css';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <NormalLayout>
      <h1>Next-Gen UI: Experiments</h1>
      <ul className="list-disc list-inside">
        <li>
          <Link to="/experiments/sdk">Atlas SDK</Link>
        </li>
        <li>
          <Link to="/experiments/frame">IFrame Hijinks</Link>
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
    </NormalLayout>
  );
}
