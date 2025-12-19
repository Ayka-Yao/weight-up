import { drizzle  } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as dotenv from 'dotenv';
import * as schema from './schema';

dotenv.config();

const client = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
});
export const db = drizzle(client, { schema });