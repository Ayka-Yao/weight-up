import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/index";
import * as schema from "../db/schema";


// for better auth
export const auth = betterAuth({
    database: drizzleAdapter(db,{
        provider:"sqlite",
        schema: schema,
    }),
    emailAndPassword: {
        enabled:true
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            enabled: true
        }
    },
    secret: process.env.BETTER_AUTH_SECRET!,
    baseURL: process.env.BETTER_AUTH_URL!,
});
console.log("Better Auth baseURL:", process.env.BETTER_AUTH_URL);

