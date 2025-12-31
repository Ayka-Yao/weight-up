import { Router } from "express";
import bcrypt from "bcrypt";
import { db } from "../db";
import { users } from "../db/schema";
import jwt from "jsonwebtoken";



const router = Router();

// Register route
router.post("/signup", async (req, res) => {
    const { email, password, name } = req.body;
});