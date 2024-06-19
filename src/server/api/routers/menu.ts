import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

const createItemSchema = z
  .object({
    name: z.string().min(1, { message: "Insira um nome" }),
    description: z
      .string()
      .min(1, { message: "campo de descrição deve ser inserido" }),
    category: z.string().min(1, { message: "campo de categoria deve ser inserido"})
  })
  .required();

export const menuRouter = createTRPCRouter({
  createItem: publicProcedure
    .input(createItemSchema)

    .mutation(async ({ input, ctx }) => {
      
      try {
        return await ctx.db.item.create({
          data: {
            name: input.name,
            description: input.description,
            category: {
              connect: {
                name: input.category
              }
            }
          }
        })
      } catch (error) {
        return new TRPCError({
          code: "BAD_REQUEST",
          message: 'dados enviados incorretamente',
        })
      }
      
      
    }),
    createCategory: publicProcedure
      .input(z.object({
        name: z.string().min(1, { message: "Insira uma categoria" })
      }).required())
      .mutation(async ({input, ctx}) => {
        return await ctx.db.category.create({
          data: {
            name: input.name
          }
        })
      })
      ,
  getItems: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.item.findMany();
  }),
  getCategories: publicProcedure.query( async ({ ctx }) => {
    return await ctx.db.category.findMany();
  }),
  deleteCategory: publicProcedure
    .input(
      z.object({
        name: z.string()
      })
    )
    .mutation(async ({input, ctx}) => {
      return await ctx.db.category.delete({
        where: {
          name: input.name
        }
      })
    })
  
});
