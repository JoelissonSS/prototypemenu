"use client";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { type TRPCClientErrorLike } from "@trpc/client";
import { type AppRouter } from "@/server/api/root";

import { Select, SelectItem } from "@/components/ui/select";
import {
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ManageCategories from "../ManageCategories";

interface ErrorJsonType {
  code: string;
  minimum?: number;
  type?: string;
  inclusive?: boolean;
  exact?: boolean;
  message: string[];
  path: string[];
  fatal?: boolean;
}
[];

const CreateItem = () => {
  const router = useRouter();
  const getCategories = api.menu.getCategories.useQuery();
  const categories = getCategories.data;

  const createItem = api.menu.createItem.useMutation({
    onSuccess: () => {
      router.refresh();
      toast({
        title: "Item criado com sucesso",
      });
    },
    onError: (error: TRPCClientErrorLike<AppRouter>) => {
      const errorJson = JSON.parse(error.message) as ErrorJsonType[];
      const errors = errorJson.map((err) => err.message);
      console.log(error);
      toast({
        title: "Item não foi criado",
        variant: "destructive",
        description: (
          <div>
            {errors.map((msg, index) => (
              <p key={index}>{msg}</p>
            ))}
          </div>
        ),
      });
    },
  });

  type createItemsType = z.infer<typeof createItemSchema>;

  const createItemSchema = z
    .object({
      name: z.string().min(3, { message: "Insira um nome" }),
      description: z.string(),
      category: z.string(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
    resetField,
    reset,
    setValue,
  } = useForm<createItemsType>({
    resolver: zodResolver(createItemSchema),
  });

  function handleCreateItem(data: createItemsType) {
    const { name, description, category } = data;
    console.log(`categoria: ${category}`);
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
        <Input className="inline" placeholder="Nome" {...register("name")} />
        {errors.name && <span className="inline">{errors.name.message}</span>}
      </label>

      <Input placeholder="Descrição" {...register("description")} />

      <Select onValueChange={(value) => setValue("category", value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Categoria" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup className="relative">
            <SelectLabel>Categorias</SelectLabel>
            {categories?.map((category, index) => (
              <SelectItem
                className=" min-w-full hover:bg-slate-400"
                key={index}
                value={category.name}
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <ManageCategories />

      <Button className="mx-4 w-max self-end">Crie o item</Button>
      <Toaster />
    </form>
  );
};

export default CreateItem;
