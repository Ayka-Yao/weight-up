import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text, index } from 'drizzle-orm/sqlite-core';

//new shit
export const user = sqliteTable('user', {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    emailVerified: integer("email_verified",{ mode: "boolean"}).default(false).notNull(),
    image: text("image"),
    createdAt: integer('created_at', { mode: 'timestamp_ms' }).default(sql`(cast(unixepoch('subsecond') * 100 as integer))`)
    .$onUpdate(() => new Date())
    .notNull(),
});


export const session = sqliteTable(
    "session",
    {
        id: text("id").primaryKey(),
        expiredAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
        token: text("token").notNull().unique(),
        createdAt: integer("created_at", { mode: "timestamp_ms" })
        .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
        .notNull(),
    }
)
export const accountTable = sqliteTable('account_table',{
    id: text('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => user.id),
    provider: text('provider').notNull(),
    providerAccountId: text('provider_account_id').notNull(),
});

export const weightEntries = sqliteTable('weight_entries',{
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: integer('user_id').notNull().references(() => user.id),
    date: integer('date', { mode: 'timestamp' }).notNull(),
    notes: text('notes'),
    createdAt: integer('created_at', { mode: 'timestamp' })
    .default(sql`CURRENT_TIMESTAMP`),
});