import { Dialog, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const createCategorySchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "insira o nome da categoria que deseja criar" }),
  })
  .required();
type createCategoryType = z.infer<typeof createCategorySchema>;
const CreateCategory = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<createCategoryType>();
  const createCategory = api.menu.createCategory.useMutation({
    onSuccess: () => {
      router.refresh();
      toast({
        title: "Categoria criada com sucesso! ",
      });
    },
    onError: () => {
      toast({
        title: "Categoria não foi criada!",
        variant: "destructive",
      });
    },
  });
  function handleCreateCategory(data: createCategoryType) {
    createCategory.mutate({
      name: data.name,
    });
  }
  return (
    <Dialog>
      <DialogTrigger>
        <PlusIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar mais uma categoria</DialogTitle>
          <DialogDescription>
            <form className="flex flex-col " onSubmit={handleSubmit(handleCreateCategory)}>
              <Input
                placeholder="Insira o nome da categoria"
                {...register("name")}
              />
              <Button className="self-end">Criar</Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategory;
