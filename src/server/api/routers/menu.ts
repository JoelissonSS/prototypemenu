import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
type categoryType = "hambuguer" | "drink" | "portions"
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
        
             return await ctx.db.item.create({
              data: {
                name: input.name,
                description: input.description,
                category: input.category,
              
             }});
        }),
  getItems: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.item.findMany();
  }),
  deleteItem: publicProcedure
   .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async({input, ctx}) => await ctx.db.item.deleteMany({
      where: {
        name: input.name,
      },
    }))
    
    
})
