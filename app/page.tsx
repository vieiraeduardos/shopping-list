"use client";

import { DialogDemo } from "@/components/add-item";
import { Header } from "@/components/header";
import { ShoppingList } from "@/components/shopping-list";
import { useState } from "react";

export default function Home() {
  const [list, setList] = useState([
    {
      id: "1",
      title: "Arroz",
      category: "Caboidratos",
      amount: 2,
      price: "R$ 9.99",
    },
    {
      id: "2",
      title: "Arroz",
      category: "Caboidratos",
      amount: "2",
      price: "R$ 9.99",
    },
    {
      id: "3",
      title: "Arroz",
      category: "Caboidratos",
      amount: "2",
      price: "R$ 9.99",
    },
    {
      id: "4",
      title: "Arroz",
      category: "Caboidratos",
      amount: "2",
      price: "R$ 9.99",
    },
    {
      id: "5",
      title: "Arroz",
      category: "Caboidratos",
      amount: "2",
      price: "R$ 9.99",
    }
  ]);

  return (
    <div>
      <Header></Header>

      <DialogDemo setList={setList} list={list} />
      <ShoppingList shoppingList={list}></ShoppingList>
    </div>
  );
}