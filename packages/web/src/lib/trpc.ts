import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';
import type { AppRouter } from '@financial-planner/api';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { QueryClient } from '@tanstack/react-query';
import superjson from "superjson"


export const queryClient = new QueryClient();

const trpcClient = createTRPCClient<AppRouter>({
  links: [httpBatchLink({ url: 'http://localhost:3000/trpc', transformer: superjson })],
});

export const trpc = createTRPCOptionsProxy<AppRouter>({
  client: trpcClient,
  queryClient
});


