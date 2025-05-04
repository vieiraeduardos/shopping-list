import "../app/globals.css"

import { Header } from "@/components/header"
import { ShoppingList } from "@/components/shopping-list"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface ShoppingItem {
  id: string
  title: string
  category: string
  amount: number
  price: number
}

export default function Home() {
  const [list, setList] = useState([] as ShoppingItem[])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (!token) {
      router.push("/sign-in")
      return
    }

    async function validateToken() {
      try {
        const response = await fetch("/api/validate-token", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          },
        })

        if (response.status !== 200) {
          localStorage.removeItem("authToken")
          router.push("/sign-in")
          return
        }

        const itemsResponse = await fetch("/api/items")
        const itemsData = await itemsResponse.json()
        setList(itemsData)
      } catch (error) {
        console.error("Erro ao validar o token:", error)
        localStorage.removeItem("authToken")
        router.push("/sign-in")
      } finally {
        setLoading(false)
      }
    }

    validateToken()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    router.push("/sign-in")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div>
      <Header></Header>

      <main className="container mx-auto mt-4">
        <ShoppingList list={list} setList={setList} />
        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Sair
        </button>
      </main>
    </div>
  );
}