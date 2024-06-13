import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
export type categoryType = "hambuguer" | "drink" | "portions";

const createItemSchema = z
  .object({
    name: z.string().min(1, { message: "Insira um nome" }),
    description: z.string().min(1, {message: 'campo de descrição deve ser descrito'}),
    category: z.custom<categoryType>(),
  })
  .required();

export const menuRouter = createTRPCRouter({
  createItem: publicProcedure
    .input(createItemSchema)
    
    .mutation(async ({ input, ctx }) => {
      try {
        // Verifica se todos os campos obrigatórios foram fornecidos
        const validatedInput = createItemSchema.parse(input);

        // Verifica se o item com o mesmo nome já existe no banco de dados
        const existingItem = await ctx.db.item.findUnique({
          where: { name: validatedInput.name },
        });
        
        if (existingItem) {
          throw new Error('Um item com este nome já existe.');
        }

        // Cria o novo item no banco de dados
        const createdItem = await ctx.db.item.create({
          data: validatedInput,
        });

        return createdItem;
      } catch (error) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `erro ao criar${error.message} item` 
        });
      }
    }),
  getItems: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.item.findMany();
  }),
});
