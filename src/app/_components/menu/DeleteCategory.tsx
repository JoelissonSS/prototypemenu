import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import {Trash2Icon } from "lucide-react";
import React from "react";
type PropsManageCategories = {
    name: string
}
    const DeleteCategory = ({name}: PropsManageCategories) => {
  const deleteCategory = api.menu.deleteCategory.useMutation({
    onSuccess: () => {
      toast({
        title: `categoria ${name} deletada`,
      });
    },
    onError: (e) => console.log(e.message)
  });
  function handleDeleteCategory() {
    deleteCategory.mutate({
      name: name
    });
  }
  return (
    <Button className="bg-inherit hover:bg-current" onClick={handleDeleteCategory}>
      <Trash2Icon className="h-6 w-4" color="black"  fill="none" width={15}/>
    </Button>
  );
};

export default DeleteCategory;
