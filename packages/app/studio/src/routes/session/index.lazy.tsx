import { Card, CardContent, CardHeader, CardTitle } from '@crossnokaye/ui-primitives/card';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@scratch/ui.elements/page-header';
import { UserAuthForm } from '@scratch/ui.elements/user-auth-form';
import { createLazyFileRoute } from '@tanstack/react-router';
import { EmptyLayout } from '../../layouts/empty';

export const Route = createLazyFileRoute('/session/')({
  component: SessionShow,
});

function SessionShow() {
  return (
    <EmptyLayout>
      <Card>
        <CardHeader>
          <CardTitle>Session</CardTitle>
        </CardHeader>
        <CardContent>
          <PageHeader>
            <PageHeaderDescription>Hello</PageHeaderDescription>
            <PageHeaderHeading>Sign In</PageHeaderHeading>
            <div className="lg:p-8">
              <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <UserAuthForm
                  onNext={async (_email, _password) => {
                    return;
                  }}
                />
              </div>
            </div>
          </PageHeader>
        </CardContent>
      </Card>
    </EmptyLayout>
  );
}
