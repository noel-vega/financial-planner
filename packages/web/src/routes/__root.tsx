import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import { Navigation } from "../components/Navigation";
import { DataProvider } from "../contexts/DataContext";

import type { QueryClient } from "@tanstack/react-query";
import { getListGoals } from "@/features/goals/api/test";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: () => {
    getListGoals()
  },
  component: RootComponent,
});

function RootComponent() {
  return (
    <DataProvider>
      <div className="min-h-screen w-full overflow-x-hidden">
        <Navigation />
        <Outlet />
      </div>
      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
          TanStackQueryDevtools,
        ]}
      />
    </DataProvider>
  );
}
