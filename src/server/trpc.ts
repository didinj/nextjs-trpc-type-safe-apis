import { initTRPC, TRPCError } from '@trpc/server';

type CreateContextOptions = {
    user?: {
        id: string;
        name: string;
        role: 'USER' | 'ADMIN';
    };
};

// Simple context simulation (replace with real auth in production)
export const createContext = async (): Promise<CreateContextOptions> => {
    // For demonstration, we'll just return a fake logged-in user
    return {
        user: {
            id: '1',
            name: 'Djamware',
            role: 'ADMIN',
        },
    };
};

const t = initTRPC.context<typeof createContext>().create();

// Export reusable helpers
export const router = t.router;
export const publicProcedure = t.procedure;

// Middleware for protected routes
const isAuthed = t.middleware(({ ctx, next }) => {
    if (!ctx.user) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'User not authenticated' });
    }
    return next({
        ctx: {
            user: ctx.user,
        },
    });
});

export const protectedProcedure = t.procedure.use(isAuthed);
