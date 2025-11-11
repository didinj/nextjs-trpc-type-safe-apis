import { describe, it, expect } from 'vitest';
import { appRouter } from './appRouter';

describe('tRPC appRouter', () => {
    const caller = appRouter.createCaller({ user: { id: '1', name: 'Test', role: 'ADMIN' } });

    it('should return hello message', async () => {
        const result = await caller.hello({ name: 'Djamware' });
        expect(result.message).toBe('Hello, Djamware!');
    });

    it('should save message successfully', async () => {
        const result = await caller.saveMessage({
            username: 'John',
            message: 'Hello World!',
        });
        expect(result.success).toBe(true);
    });

    it('should return protected data for authorized user', async () => {
        const result = await caller.secretData();
        expect(result.message).toContain('ADMIN');
    });
});
