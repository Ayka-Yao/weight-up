import { auth } from "../auth/auth";
import { Router } from "express";

const router = Router();

router.use("/api/auth", async (req, res, next) => {
    console.log("Auth route is fucking working");
    console.log("Method:", req.method);
    console.log("URL:", req.originalUrl);
    console.log("Body:", req.body);
    try {
        const protocol = req.protocol;
        const host = req.get('host');
        const originalUrl = req.originalUrl;
        const fullUrl = `${protocol}://${host}${originalUrl}`;

        console.log("Full URL:", fullUrl);
        console.log("About to call auth.handler..");
        
        const response = await auth.handler(new Request(fullUrl, {
            method: req.method,
            headers: new Headers(req.headers as any),
            body: req.method !== "GET" && req.method !== "HEAD" 
                ? JSON.stringify(req.body) 
                : undefined,
        }));
        
        console.log("Got response from auth.handler");
        console.log("Response status:", response.status);

        res.status(response.status);
        response.headers.forEach((value, key) => {
            res.setHeader(key, value);
        });
        
        const body = await response.text();
        res.send(body);
    } catch (error) {
        console.error("Auth Errur:", error);
        next(error);
    }
});

export default router;