import { Card, CardContent, CardHeader, CardTitle } from '@crossnokaye/ui-primitives/card';
import { useAtlas } from '@scratch/svc.atlas';
import { Link, createLazyFileRoute } from '@tanstack/react-router';
import { CenteredLayout } from '../../layouts/centered';

export const Route = createLazyFileRoute('/session/')({
  component: SessionShow,
});

function SessionShow() {
  const { session } = useAtlas();

  return (
    <CenteredLayout>
      <Card>
        <CardHeader>
          <CardTitle>Session</CardTitle>
        </CardHeader>
        <CardContent>
          {session.status === 'authenticated' ? (
            <p>
              You're logged in. <Link to="/session">Log out</Link> to end your session.
            </p>
          ) : (
            <p>
              You're logged out. <Link to="/session/new">Log in</Link> to continue.
            </p>
          )}
        </CardContent>
      </Card>
    </CenteredLayout>
  );
}
