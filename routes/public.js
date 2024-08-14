import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Register
router.post("/cadastre", async (req, res) => {
    try {
        const user = req.body;
        const saltRounds = 10;

        const salt = await bcrypt.genSalt(saltRounds);
        const encryptedPassword = await bcrypt.hash(user.password, salt);

        const userDB = await prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                password: encryptedPassword
            }
        });

        res.status(201).json(userDB);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

//Login
router.post("/login", async (req, res) => {
    try {
        const userInfo = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email: userInfo.email
            },
        })

        if(!user) return res.status(404).json({ message: 'Usuário não encontrado.'});

        const isMatch = await bcrypt.compare(userInfo.password, user.password);
        
        if(!isMatch) res.status(400).json({message: 'Senha inválida.'});

        //Gen token JWT
        const jwtSecret = process.env.JWT_SECRET;
        const token = jwt.sign({ id: user.id}, jwtSecret, { expiresIn: "1h" });
        return res.status(200).json(token);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

export default router;
