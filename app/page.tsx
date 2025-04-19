"use client";

import { AddItemDialog } from "@/components/add-item";
import { Header } from "@/components/header";
import { ShoppingList } from "@/components/shopping-list";
import { useState } from "react";

interface ShoppingItem {
  id: string;
  title: string;
  category: string;
  amount: number;
  price: number;
}

export default function Home() {

  const [list, setList] = useState([] as ShoppingItem[]);

  return (
    <div>
      <Header></Header>

      <main className="container mx-auto mt-4">
        <AddItemDialog setList={setList} list={list} />
        <ShoppingList list={list} setList={setList} />
      </main>
    </div>
  );
}