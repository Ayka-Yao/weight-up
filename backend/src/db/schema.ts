import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    password: text('password').notNull(),
    token: text('token'),
});

export const weightEntries = sqliteTable('weight_entries', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: text('user_id').notNull().references(() => user.id),
    date: integer('date', { mode: 'timestamp' }).notNull(),
    weight: integer('weight').notNull(),
    notes: text('notes'),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});

export const userRelations = relations(user, ({ many }) => ({
    weightEntries: many(weightEntries),
}));

export const weightEntriesRelations = relations(weightEntries, ({ one }) => ({
    user: one(user, {
        fields: [weightEntries.userId],
        references: [user.id],
    }),
}));