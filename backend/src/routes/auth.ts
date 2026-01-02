import { Router } from "express";
import bcrypt from "bcrypt";
import { db } from "../db";
import { user} from "../db/schema";
import jwt from "jsonwebtoken";



const router = Router();

// Register route
const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "default_secret")
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
        res.status(201).json({ id: user.id, email: user.email, name: user.name, token: token });
    } catch (error) {
        res.status(500).json({ error: "User registration failed" });
    }
});

router.post("/login", async (req, res) =>{
    const {email, password} = req.body;
    try{
        const [user] = await db.select().from(users).where(users.email.eq(email));
        if(!user){
            res.status(401).json({ error: "Wrong email or password"});
            return;
        }
        if(await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET || "default_secret");
            res.status(200).json({ id: user.id, email: user.email, name: user.name, token: token });
        } else {
            res.status(401).json({ error: "Wrong email or password"});
        }
    } catch (error) {
        res.status(500).json({ error: "Wrong email or password"})
    }
})

export default router;