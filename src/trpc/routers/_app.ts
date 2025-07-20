import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),

  // Add other routers here
  // add a basic example router
  greeting: baseProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query((opts) => {
      return {
        message: `Hello, ${opts.input.name}!`,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;