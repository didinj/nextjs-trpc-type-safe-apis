import { appRouter } from '@/src/server/routers/appRouter';
import { createContext } from '@/src/server/trpc';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

const handler = (request: Request) =>
    fetchRequestHandler({
        endpoint: '/api/trpc',
        req: request,
        router: appRouter,
        createContext,
    });

export { handler as GET, handler as POST };
