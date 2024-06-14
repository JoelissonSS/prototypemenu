"use client";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { type categoryType } from "@/server/api/routers/menu";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { type TRPCClientErrorLike } from "@trpc/client";
import { type AppRouter } from "@/server/api/root";

const CreateItem = () => {
  const router = useRouter();
  const toast = useToast();

  const createItem = api.menu.createItem.useMutation({
    onSuccess: () => {
      router.refresh();
      toast.toast({
        title: "Item criado com sucesso",
      });
    },
    onError: (error) => {
      console.log(error.message);
      toast.toast({
        title: error.message,
        variant: "destructive",
      });
    },
  });

  type CreateItemsSchema = z.infer<typeof createItemSchema>;

  const createItemSchema = z.object({
    name: z.string().min(1, { message: "Insira um nome" }),
    description: z.string(),
    category: z.custom<categoryType>(),
  }).required();

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
    <form
      className="flex min-w-64 flex-col content-center justify-center gap-2"
      onSubmit={handleSubmit(handleCreateItem)}
    >
      <label className="inline min-w-max ">
        <Input
          className="inline"
          placeholder="Nome"
          {...register("name")}
        />
        {errors.name && <span className="inline">{errors.name.message}</span>}
      </label>

      <Input
        placeholder="Descrição"
        {...register("description")}
      />
      <Input
        placeholder="Categoria"
        {...register("category")}
      />
      <Button className="mx-4 w-max self-end">Crie o item</Button>
      <Toaster />
    </form>
  );
};

export default CreateItem;
