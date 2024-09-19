import { pgTable, varchar, uuid } from 'drizzle-orm/pg-core';

export const health = pgTable('health', {
  id: uuid('id').defaultRandom().primaryKey(),
  status: varchar('status', { length: 256 }).notNull().default('Pirate!'),
});
