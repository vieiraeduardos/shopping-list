"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Edit } from "lucide-react"
import { toast } from "sonner"

export function EditItemDialog({setList, list, item}: any) {
    const [title, setTitle] = useState(item.title)
    const [category, setCategory] = useState(item.category)
    const [amount, setAmount] = useState(item.amount)
    const [price, setPrice] = useState(item.price)
    const [open, setOpen] = React.useState(false)

    const handleEdit = () => {
        const updatedList = list.map((shoppingItem: any) => {
            if (shoppingItem.id === item.id) {
                return { ...shoppingItem, title, category, amount, price }
            }
            return shoppingItem
        })

        setList(updatedList)
        setOpen(false)

        toast("🎉 Item editado com sucesso!")
    }

    return (
        <Dialog defaultOpen={open} open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
            <Button variant="secondary" size="icon">
                <Edit />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Editar Item Na Lista De Compras</DialogTitle>
                    <DialogDescription>
                        Edite os detalhes do item selecionado.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Título
                        </Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">
                            Categoria
                        </Label>
                        <Select defaultValue={item.category} onValueChange={(value) => setCategory(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione uma categoria" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Categorias</SelectLabel>
                                    <SelectItem value="caboidrate">Caboidrato</SelectItem>
                                    <SelectItem value="protein">Proteína</SelectItem>
                                    <SelectItem value="drink">Bebidas</SelectItem>
                                    <SelectItem value="vegetable">Vegetais</SelectItem>
                                    <SelectItem value="snack">Lanches</SelectItem>
                                    <SelectItem value="dairy">Laticínios</SelectItem>
                                    <SelectItem value="cleaning">Limpeza</SelectItem>
                                    <SelectItem value="personal-care">Cuidados Pessoais</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right">
                            Quantidade
                        </Label>
                        <Input
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                            Preço
                        </Label>
                        <Input
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={() => handleEdit()}>
                        Editar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
