"use client";
import React from "react";
import CreateCategory from "./menu/CreateCategory";
import { api } from "@/trpc/react";
import DeleteCategory from "./menu/DeleteCategory";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { WrenchIcon } from "lucide-react";
const ManageCategories = () => {
  const getCategories = api.menu.getCategories.useQuery();
  const categories = getCategories.data;

  return (
    <Dialog>
      <CreateCategory />
      <DialogTrigger>
        <WrenchIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Gerenciar categorias</DialogTitle>
          <DialogDescription>
            {categories?.map((category, index) => (
              <p className=" min-w-full hover:bg-slate-400 flex justify-between" key={index}>
                {category.name}
                <DeleteCategory name={category.name} />
              </p>
            ))}
            <CreateCategory />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ManageCategories;
