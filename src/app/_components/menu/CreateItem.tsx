"use client";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ZodError, getErrorMap, z } from "zod";
import { type categoryType } from "@/server/api/routers/menu";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { type TRPCClientErrorLike } from "@trpc/client";
import { type AppRouter } from "@/server/api/root";
import errorMap from "zod/locales/en.js";

const CreateItem = () => {
  const router = useRouter();
  const toast = useToast();

  const createItem = api.menu.createItem.useMutation({
    onSuccess: () => {
      router.refresh();
      toast.toast({
        title: "Item criado com sucesso",
        status: "success",
      });
    },
    onError: (error: TRPCClientErrorLike<AppRouter>) => {
      toast.toast({
        title: error.message,
      });
    },
  });

  type CreateItemsSchema = z.infer<typeof createItemSchema>;

  const createItemSchema = z.object({
    name: z
      .string()
      .min(4, { message: "o campo de nome deve ser preechido  " }),
    description: z.string(),
    category: z.custom<categoryType>(),
  });

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
    resetField,
    reset,
  } = useForm<CreateItemsSchema>({
    resolver: zodResolver(createItemSchema),
  });

  function handleCreateItem(data: CreateItemsSchema) {
    const { name, description, category } = data;

    createItem.mutate({
      name,
      description,
      category,
    });
  }

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      resetField("name");
      resetField("description");
      resetField("category");
      reset();
    }
  }, [formState, reset, resetField]);

  return (
    <form onSubmit={handleSubmit(handleCreateItem)}>
      <Input placeholder="Insira o nome do item aqui" {...register("name")} />{" "}
      {errors.name && }
      <Input
        placeholder="Insira a descrição do item"
        {...register("description")}
      />
      <Input
        placeholder="Insira o nome da categoria aqui"
        {...register("category")}
      />
      <Button>Crie o item</Button>
      <Toaster />
    </form>
  );
};

export default CreateItem;
