import { Router } from "express";
import bcrypt from "bcrypt";
import { db } from "../db";
import { user } from "../db/schema";
import jwt from "jsonwebtoken";



const router = Router();

// Register route                                                       
router.post("/signup", async (req, res) => {
    const { email, password, name } = req.body;
    const plainPassword = password;
    const hash = await bcrypt.hash(plainPassword, 10);
    try {
        const [newUser] = await db.insert(user).values({
            email,
            password: hash,
            name,
        }).returning();
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET || "default_secret");
        res.status(201).json({ id: newUser.id, email: newUser.email, name: newUser.name, token: token });
    } catch (error) {
        res.status(500).json({ error: "User registration failed" });
    }
});

// Login route
router.post("/login", async (req, res) =>{
    const {email, password} = req.body;
    try{
        const [loginUser] = await db.select().from(user).where(user.email.eq(email));
        if(!loginUser){
            res.status(401).json({ error: "Wrong email or password"});
            return;
        }
        if(await bcrypt.compare(password, loginUser.password)) {
            const token = jwt.sign({ id: loginUser.id}, process.env.JWT_SECRET || "default_secret");
            res.status(200).json({ id: loginUser.id, email: loginUser.email, name: loginUser.name, token: token });
        } else {
            res.status(401).json({ error: "Wrong email or password"});
        }
    } catch (error) {
        res.status(500).json({ error: "Wrong email or password"})
    }
})

export default router;