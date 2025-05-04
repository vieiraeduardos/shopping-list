import "../app/globals.css";

import { Header } from "@/components/header";
import { ShoppingList } from "@/components/shopping-list";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 

interface ShoppingItem {
  id: string;
  title: string;
  category: string;
  amount: number;
  price: number;
}

export default function Home() {
  const [list, setList] = useState([] as ShoppingItem[])
  const [isLogged, setIsLogged] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!isLogged) {
      router.push("/sign-in")
      return
    }

    async function fetchItems() {
      const response = await fetch("/api/items")
      const data = await response.json()
      setList(data)
    }

    fetchItems()
  }, [isLogged, router])

  return (
    <div>
      <Header></Header>

      <main className="container mx-auto mt-4">
        <ShoppingList list={list} setList={setList} />
      </main>
    </div>
  );
}