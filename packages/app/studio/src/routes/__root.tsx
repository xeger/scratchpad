import { AtlasProvider, SDK } from '@scratch/svc.atlas';
import { ThemeProvider } from '@scratch/ui.elements/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

const { VITE_ATLAS_ACCESS_TOKEN, VITE_ATLAS_USER_ID, mode } = import.meta.env;
const sdk = new SDK({
  oauth2HeaderAuthorization:
    mode === 'development' ? `Bearer ${VITE_ATLAS_ACCESS_TOKEN}` : undefined,
  serverURL: window.origin,
});

const queryClient = new QueryClient();

const session =
  mode === 'development'
    ? {
        accessToken: VITE_ATLAS_ACCESS_TOKEN,
        status: 'authenticated' as const,
        userId: VITE_ATLAS_USER_ID,
      }
    : {
        accessToken: '',
        status: 'anonymous' as const,
        userId: '',
      };

export const Route = createRootRoute({
  component: () => (
    <>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AtlasProvider sdk={sdk} session={session}>
            <Outlet />
            <TanStackRouterDevtools />
          </AtlasProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  ),
});
