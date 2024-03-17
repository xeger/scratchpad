import { AtlasProvider } from '@scratch/svc.atlas';
import { ThemeProvider } from '@scratch/ui.elements/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AtlasProvider>
            <Outlet />
            <TanStackRouterDevtools />
          </AtlasProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  ),
});
