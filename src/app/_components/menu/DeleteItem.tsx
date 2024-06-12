"use client";

import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteItem = () => {
  const router = useRouter();
  const deleteItem = api.menu.deleteItem.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });
  
  return <div></div>;
};

export default DeleteItem;
