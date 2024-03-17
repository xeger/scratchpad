import { GrantType } from '@crossnokaye/typescript-sdk/models/components';
import { Card, CardContent } from '@crossnokaye/ui-primitives/card';
import { useAtlas } from '@scratch/svc.atlas';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@scratch/ui.elements/page-header';
import { UserAuthForm } from '@scratch/ui.elements/user-auth-form';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { CenteredLayout } from '../../layouts/centered';

export const Route = createLazyFileRoute('/session/new')({
  component: SessionNew,
});

function hackishlyExtractUserID(token: string) {
  const payloadB64URL = token.split('.')[1];

  const payloadB64 = payloadB64URL.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(payloadB64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  const payload = JSON.parse(jsonPayload);
  if (typeof payload.aid === 'string' && payload.aid) {
    return payload.aid;
  } else {
    throw new Error('JWT token lacks aid claim (or is falsey/non-string)');
  }
}

function SessionNew() {
  const { sdk, setSessionMeta } = useAtlas();
  const navigate = useNavigate();

  const [hasPassword, setHasPassword] = useState(false);

  return (
    <CenteredLayout>
      <Card>
        <CardContent>
          <PageHeader>
            <PageHeaderDescription>Hello</PageHeaderDescription>
            <PageHeaderHeading>Sign In</PageHeaderHeading>
            <div className="lg:p-8">
              <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <UserAuthForm
                  hasPassword={hasPassword}
                  onNext={async (email, password) => {
                    if (hasPassword && password) {
                      // We're completing password-based login
                      const { tokenGrant } = await sdk.loginv2.loginv2Login({
                        grantType: GrantType.Password,
                        email,
                        password,
                      });
                      if (tokenGrant) {
                        setSessionMeta((prev) => ({
                          ...prev,
                          security: {
                            oauth2HeaderAuthorization: `Bearer ${tokenGrant.accessToken}`,
                          },
                          status: 'authenticated',
                          userId: hackishlyExtractUserID(tokenGrant.accessToken),
                        }));
                        navigate({ to: '/' });
                      } else {
                        alert('TODO - show error message');
                      }
                    } else {
                      // We're completing discovery (i.e. how does the given email perform login: password or SSO?)
                      const { loginURL } = await sdk.loginv2.loginv2Loginurl(email, 'state');
                      if (loginURL?.url) {
                        window.location.replace(loginURL.url);
                      } else {
                        setHasPassword(true);
                      }
                    }
                  }}
                />
              </div>
            </div>
          </PageHeader>
        </CardContent>
      </Card>
    </CenteredLayout>
  );
}
