import { NextApiRequest, NextApiResponse } from "next"
import SQLiteClient from "@/app/handlers/sqlite-client"
import jwt from "jsonwebtoken"

const sqliteClient = new SQLiteClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "POST") {
            const { email, password } = req.body

            if (!email || !password) {
                return res.status(400).json({ error: "Todos os campos são obrigatórios." })
            }

            const response = await sqliteClient.login_user({
                email: email,
                password: password,
            });

            if (response) {
                // Gera o token JWT
                const token = jwt.sign(
                    { email: email },
                    process.env.SECRET_KEY || "",
                    { expiresIn: "1h" }
                );

                return res.status(200).json({ message: "Login realizado com sucesso!", token })
            } else {
                return res.status(401).json({ error: "Email ou senha inválidos." })
            }
        } else {
            res.setHeader("Allow", ["POST"])
            res.status(405).end(`Método ${req.method} não permitido.`)
        }
    } catch (error) {
        console.error("Erro na API:", error)
        res.status(500).json({ error: "Erro interno do servidor." })
    }
}