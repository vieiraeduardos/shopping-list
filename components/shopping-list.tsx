import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button"
import { Trash, Edit } from "lucide-react"

interface ShoppingItem {
  id: string;
  title: string;
  category: string;
  amount: number;
  price: number;
}

export function ShoppingList({ list, setList}: any) {  
  function getCategoryName(category: string): string {
    switch (category) {
      case "caboidrate":
        return "Caboidrato"
      case "protein":
        return "Proteína"
      case "drink":
        return "Bebidas"
      case "vegetable":
        return "Vegetais"
      case "snack":
        return "Lanches"
      case "dairy":
        return "Laticínios"
      case "cleaning":
        return "Limpeza"
      case "personal-care":
        return "Cuidados Pessoais"
      default:
        return "Outros"
    }
  }

  const deleteItem = (key: string) => {
    const updatedShoppingList = list.filter((item: ShoppingItem) => item.id !== key)

    setList(updatedShoppingList)
  }

  return (
    <Table>
      <TableCaption>Uma lista de compras recente.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Título</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Quantidade</TableHead>
          <TableHead>Preço</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map((item: any) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.title}</TableCell>
            <TableCell>{getCategoryName(item.category)}</TableCell>
            <TableCell>{item.amount}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell className="text-right">
              <Button variant="secondary" size="icon">
                <Edit />
              </Button>

              <Button variant="destructive" size="icon" onClick={() => deleteItem(item.id)}>
                <Trash />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
