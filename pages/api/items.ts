import { NextApiRequest, NextApiResponse } from "next"
import SQLiteClient from "@/app/handlers/sqlite-client"

const sqliteClient = new SQLiteClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "GET") {
            const items = await sqliteClient.get_items();
            res.status(200).json(items);
        } else if (req.method === "POST") {
            const { title, category, price, amount } = req.body;

            if (!title || !category || !price || !amount) {
                return res.status(400).json({ error: "Todos os campos são obrigatórios." });
            }

            await sqliteClient.insert_item({
                title,
                category,
                price: parseFloat(price),
                amount: parseInt(amount),
                created_at: new Date().toISOString(),
            });

            res.status(201).json({ message: "Item adicionado com sucesso!" });
        } else {
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Método ${req.method} não permitido.`);
        }
    } catch (error) {
        console.error("Erro na API:", error);
        res.status(500).json({ error: "Erro interno do servidor." });
    }
}