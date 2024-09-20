import { pgTable, varchar, uuid, text } from 'drizzle-orm/pg-core';

export const health = pgTable('health', {
  id: uuid('id').defaultRandom().primaryKey(),
  status: varchar('status', { length: 256 }).notNull().default('Pirate!'),
});

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: text('password').notNull(),
  token: text('token'),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
