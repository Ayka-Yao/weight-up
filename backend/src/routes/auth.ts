import { Router } from "express";
import bcrypt from "bcrypt";
import { db } from "../db";
import { users } from "../db/schema";
import jwt from "jsonwebtoken";



const router = Router();

// Register route
router.post("/signup", async (req, res) => {
    const { email, password, name } = req.body;
    const PlainPass = password;
    const hash = await bcrypt.hash(PlainPass, 10);
    try {
        const [user] = await db.insert(users).values({
            email,
            password: hash,
            name,
        }).returning();
        res.status(201).json({ id: user.id, email: user.email, name: user.name });
    } catch (error) {
        res.status(500).json({ error: "User registration failed" });
    }
});