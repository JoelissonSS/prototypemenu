import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
export type categoryType = "hambuguer" | "drink" | "portions";
export const menuRouter = createTRPCRouter({
  createItem: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        category: z.custom<categoryType>(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const existingItem = await ctx.db.item.findUnique({
        where: { name: input.name },
      });
      if (existingItem) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Item já existe",
        });
      }
      return await ctx.db.item.create({
        data: {
          name: input.name,
          description: input.description,
          category: input.category,
        },
      });
    }),
  getItems: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.item.findMany();
  }),
});
