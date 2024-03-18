import { Button } from '@crossnokaye/ui-primitives/button';
import { Card, CardContent, CardHeader, CardTitle } from '@crossnokaye/ui-primitives/card';
import { useAtlas } from '@scratch/svc.atlas';
import { Link, createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { CenteredLayout } from '../../layouts/centered';

export const Route = createLazyFileRoute('/session/')({
  component: SessionShow,
});

function SessionShow() {
  const { sessionMeta, setSessionMeta } = useAtlas();
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
              <p>Greetings, {sessionMeta.userId}.</p>
              <p>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setSessionMeta((prev) => ({
                      ...prev,
                      security: {
                        oauth2HeaderAuthorization: '',
                      },
                      status: 'anonymous',
                      timestamps: { expires: new Date(0) },
                      userId: '',
                    }));
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
