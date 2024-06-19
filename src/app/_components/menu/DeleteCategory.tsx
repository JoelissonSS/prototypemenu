import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import { TrashIcon } from "lucide-react";
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
    <Button onClick={handleDeleteCategory}>
      <TrashIcon />
    </Button>
  );
};

export default DeleteCategory;
