import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
export type categoryType = "hambuguer" | "drink" | "portions";

const createItemSchema = z
  .object({
    name: z.string().min(1, { message: "Insira um nome" }),
    description: z
      .string()
      .min(1, { message: "campo de descrição deve ser descrito" }),
    category: z.custom<categoryType>((value) => {
      value !== (typeof value as categoryType);
      return false;
    }, "campo de categoria preenchido errado"),
  })
  .required();

export const menuRouter = createTRPCRouter({
  createItem: publicProcedure
    .input(createItemSchema)

    .mutation(async ({ input, ctx }) => {
      const validateData = createItemSchema.safeParse(input);
      const existing = await ctx.db.item.findMany({
        where: {
          name: input.name,
        },
      });
      if (!validateData.success){
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: validateData.error.message,
        });
      } else {
        if (existing) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Item já existe",
          });
        }
      }
      
    }),
  getItems: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.item.findMany();
  }),
});
