import { NextApiRequest, NextApiResponse } from "next"
import SQLiteClient from "@/app/handlers/sqlite-client"

const sqliteClient = new SQLiteClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "GET") {
            const items = await sqliteClient.get_users();
            res.status(200).json(items);
        } else if (req.method === "POST") {
            const { name, email, phone, password } = req.body;

            if (!name || !email || !phone || !password) {
                return res.status(400).json({ error: "Todos os campos são obrigatórios." });
            }

            await sqliteClient.insert_user({
                "name": name,
                "email": email,
                "phone": email,
                "password": password,
                "created_at": new Date().toISOString(),
            });

            res.status(201).json({ message: "Usuário adicionado com sucesso!" });
        } else {
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Método ${req.method} não permitido.`);
        }
    } catch (error) {
        console.error("Erro na API:", error);
        res.status(500).json({ error: "Erro interno do servidor." });
    }
}