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

import { Plus } from "lucide-react"
import { toast } from "sonner"

export function AddItemDialog({setList, list}: any) {
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [amount, setAmount] = useState("")
    const [price, setPrice] = useState("")
    const [open, setOpen] = React.useState(false)

    const handleSave = () => {
        const itemData = {
            id: Math.random().toString(36).substr(2, 9), 
            title,
            category,
            amount,
            price,
        }

        setList([...list, itemData])
        setOpen(false)

        toast("🎉 Item adicionado com sucesso!")
    }

    return (
        <Dialog defaultOpen={open} open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="mb-10 ml-auto flex">
                    <Plus />
                    Novo Item
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Adicionar Item Na Lista De Compras</DialogTitle>
                    <DialogDescription>
                        Faça as mudanças aqui. Clique em salvar quando finalizar.
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
                        <Select onValueChange={(value) => setCategory(value)}>
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
                    <Button type="submit" onClick={handleSave}>
                        Salvar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
