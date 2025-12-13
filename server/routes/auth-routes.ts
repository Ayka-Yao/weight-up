import { auth } from "../auth/auth";
import { Router } from "express";

const router = Router();

router.all("/api/auth/*", async (req, res) =>{
    const response = await auth.handler(new Request(req.url, {
        method:req.method,
        headers: req.headers as any,
        body: req.body ? JSON.stringify(req.body) : undefined
    }));
    res.status(response.status).send(await response.text());
});
export default router;