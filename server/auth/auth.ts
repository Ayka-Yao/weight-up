import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/index";


// for better auth
export const auth = betterAuth({
    database: drizzleAdapter(db,{
        provider:"sqlite"
    }),
    emailAndPassword: {
        enabled:true
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRECT!,
            enabled: true
        }
    },
    secret: process.env.BETTER_AUTH_SECRET!,
    baseURL: process.env.BETTER_AUTH_URL!,
});

