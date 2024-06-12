"use client";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import React from "react";

const CreateItem = () => {
  const router = useRouter();
  const [, setName] = React.useState("");

  const createItem = api.menu.createItem.useMutation({
    onSuccess: () => {
      router.refresh();
    }
  })
  

  return <form onClick={(e) => {
    e.preventDefault()
    setN
  }}></form>;
};

export default CreateItem;
