import { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: "Token não fornecido." })
    }

    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY || "")
        res.status(200).json({ message: "Token válido", user: decoded })
    } catch (error) {
        res.status(401).json({ message: "Token inválido ou expirado." })
    }
}