import express from 'express';
import {PrismaClient} from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/list", async (req, res) => {
    try {
        const userList = await prisma.user.findMany({select: { id: true, name: true, email: true }});
        res.status(200).json(userList);
    } catch (e) {
        res.status(500).json({message: e.message})
    }
})

export default router;