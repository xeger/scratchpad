import { Button } from '@crossnokaye/ui-primitives/button';
import { Card, CardContent, CardHeader, CardTitle } from '@crossnokaye/ui-primitives/card';
import { useAtlas } from '@scratch/svc.atlas';
import { Link, createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { CenteredLayout } from '../../layouts/centered';

export const Route = createLazyFileRoute('/session/')({
  component: SessionShow,
});

function SessionShow() {
  const { reset, sessionMeta } = useAtlas();
  const navigate = useNavigate();

  return (
    <CenteredLayout>
      <Card>
        <CardHeader>
          <CardTitle>Session</CardTitle>
        </CardHeader>
        <CardContent>
          {sessionMeta.status === 'authenticated' ? (
            <>
              <p>Greetings, {sessionMeta.userinfo.name}.</p>
              <p>
                <Button
                  variant="destructive"
                  onClick={() => {
                    reset();
                    navigate({ to: '/session/new' });
                  }}
                >
                  Log out
                </Button>
              </p>
            </>
          ) : (
            <>
              <p>You're logged out.</p>
              <p>
                <Link to="/session/new">Log in</Link> to continue.
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </CenteredLayout>
  );
}
