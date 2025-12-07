import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text, real } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
    id: integer('id').primaryKey({ autoIncrement:true }),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});

export const weightEntries = sqliteTable('weight_entries',{
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: integer('user_id').notNull().references(() => users.id),
    date: integer('date', { mode: 'timestamp' }).notNull(),
    notes: text('notes'),
    createdAt: integer('created_at', { mode: 'timestamp' })
.default(sql`CURRENT_TIMESTAMP`),
});