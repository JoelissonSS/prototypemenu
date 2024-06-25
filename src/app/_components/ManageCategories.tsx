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
import { RefreshCw, WrenchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
const ManageCategories = () => {
  const getCategories = api.menu.getCategories.useQuery();
  const categories = getCategories.data;

  return (
    <Dialog>
      <DialogTrigger >
        <WrenchIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between py-2">
            <h2>Gerenciar categorias</h2>{" "}
            <Button
              onClick={async () => {
                await getCategories.refetch({});
              }}
            >
              {!getCategories.isRefetching ? (
                <RefreshCw />
              ) : (
                <RefreshCw className="animate-spin" />
              )}
            </Button>
          </DialogTitle>
          <DialogDescription>
            {categories?.map((category, index) => (
              <div
                className=" flex min-w-full justify-between gap-2 items-center hover:bg-slate-100 px-4 "
                key={index}
              >
                {category.name}
                <DeleteCategory name={category.name} />
              </div>
            ))}
            <CreateCategory />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ManageCategories;
