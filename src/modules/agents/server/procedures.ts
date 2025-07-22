import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agentInsertSchema } from "../schemas";
import { z } from "zod";
import { eq, getTableColumns, sql } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({

    getOne: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
        const [existingAgent] = await db
            .select({
                ...getTableColumns(agents),
                meetingCount: sql<number>`5`,

            })
            .from(agents)
            .where(eq(agents.id, input.id))
            .limit(1);

        return existingAgent;
    }),

    getMany: protectedProcedure.query(async () => {
        const data = await db.select().from(agents);
        return data;
    }),

    // with the create agent procedure 
    // This procedure allows users to create a new agent
    // It requires the user to be authenticated and validates the input using the agentInsertSchema
    // It inserts the new agent into the database and returns the created agent
    create: protectedProcedure
        .input(agentInsertSchema)
        .mutation(async ({ input, ctx }) => {
            const [createdAgent] = await db
                .insert(agents)
                .values({
                    name: input.name,
                    instructions: input.instructions,
                    userId: ctx.auth.user.id,
                })
                .returning();

            return createdAgent;
        }),

})