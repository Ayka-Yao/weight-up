import { auth } from "../auth/auth";
import { Router } from "express";

const router = Router();

router.all("/api/auth/*", (req, res) => {
    return auth.handler(req, res);
});
export default router;