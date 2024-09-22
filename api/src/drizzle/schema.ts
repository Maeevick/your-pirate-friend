import { pgTable, varchar, uuid, text, timestamp } from 'drizzle-orm/pg-core';

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

export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  ownerId: uuid('owner_id')
    .notNull()
    .references(() => users.id),
  name: text('name').notNull().unique(),
  apiPublicKey: text('api_public_key').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const events = pgTable('events', {
  id: uuid('id').defaultRandom().primaryKey(),
  type: text('type').notNull(),
  timestamp: timestamp('timestamp').notNull(),
  source: text('source').notNull(),
  name: text('name').notNull(),
  projectId: uuid('project_id')
    .notNull()
    .references(() => projects.id),
});

export type NewEvent = typeof events.$inferInsert;
