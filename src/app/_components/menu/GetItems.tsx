"use client";
import { api } from "@/trpc/react";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const GetItems = () => {
  const getItems = api.menu.getItems.useQuery();
  const items = getItems.data;
  return (
    <Table className="max-h-48 w-[30%]">
      <TableCaption className="">
        <div className="flex justify-between items-center">
          Listagem dos itens
          <Button
            onClick={async () => {
              await getItems.refetch({});
            }}
          >
            {!getItems.isRefetching ? (
              <RefreshCw />
            ) : (
              <RefreshCw className="animate-spin" />
            )}
          </Button>
        </div>
      </TableCaption>
      <TableHeader className="w-full">
        <TableRow>
          <TableHead className="">id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>categoria</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="w-full">
        {items?.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.categoryName}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className="w-full">
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{items?.length} items</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default GetItems;
