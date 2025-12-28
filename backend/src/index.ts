import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

import { db } from './db';
import { user, weightEntries } from './db/schema';
import { eq } from 'drizzle-orm';



const app = express();
const PORT = process.env.PORT || 5001;
app.use(cors());


app.use(express.json());



app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Weight-Up API is Running '});
});

app.get('/api/users', async (req, res) => {
    try {
        const allUsers = await db.select().from(user);
        res.json(allUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

app.get('/api/weights/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const entries = await db
            .select()
            .from(weightEntries)
            .where(eq(weightEntries.userId, userId));
        res.json(entries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch weight entries' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});