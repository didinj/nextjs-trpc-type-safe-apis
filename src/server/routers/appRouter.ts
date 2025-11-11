import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';

export const appRouter = router({
    // Existing hello query
    hello: publicProcedure
        .input(z.object({ name: z.string().optional() }))
        .query(({ input }) => {
            return { message: `Hello, ${input?.name ?? 'World'}!` };
        }),

    // New mutation
    saveMessage: publicProcedure
        .input(
            z.object({
                username: z.string().min(3, 'Name must be at least 3 characters'),
                message: z.string().min(5, 'Message must be at least 5 characters'),
            })
        )
        .mutation(({ input }) => {
            // Simulate saving to a database
            console.log('Saved message:', input);
            return {
                success: true,
                response: `Message from ${input.username} saved successfully!`,
            };
        }),

    // New protected route
    secretData: protectedProcedure.query(({ ctx }) => {
        return {
            message: `Welcome ${ctx.user?.name}, you have ${ctx.user?.role} access!`,
        };
    }),
});

export type AppRouter = typeof appRouter;
