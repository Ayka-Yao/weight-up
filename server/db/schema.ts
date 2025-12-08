import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text, real } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
    id: integer('id').primaryKey({ autoIncrement:true }),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    passwordHash: text('password_hash'),
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
export const sessionTable = sqliteTable('session_table',{
    id: text('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id),
    expiresAt: integer('expires_at', { mode: 'timestamp'}),
    token: text('token').notNull(),
});
export const accountTable = sqliteTable('account_table',{
    id: text('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id),
    provider: text('provider').notNull(),
    providerAccountId: text('provider_account_id').notNull(),
});