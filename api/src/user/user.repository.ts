import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { DRIZZLE_TOKEN } from '../drizzle/drizzle.provider';
import * as schema from '../drizzle/schema';

import { IUserRepository } from '../user/user.port';

const { users } = schema;

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @Inject(DRIZZLE_TOKEN) private db: NodePgDatabase<typeof schema>,
  ) {}

  async findByUsername(username: string): Promise<schema.User | null> {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);
    return result[0] || null;
  }

  async create(user: schema.NewUser): Promise<schema.User> {
    const [createdUser] = await this.db.insert(users).values(user).returning();
    return createdUser;
  }

  async updateToken(userId: string, token: string | null): Promise<void> {
    await this.db.update(users).set({ token }).where(eq(users.id, userId));
  }

  async findByToken(token: string): Promise<schema.User | null> {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.token, token))
      .limit(1);
    return result[0] || null;
  }

  async delete(userId: string): Promise<void> {
    await this.db.delete(users).where(eq(users.id, userId));
  }
}
