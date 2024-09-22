import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE_TOKEN } from '../drizzle/drizzle.provider';
import * as schema from '../drizzle/schema';
import { IProjectRepository } from './project.port';

const { projects } = schema;

@Injectable()
export class ProjectRepository implements IProjectRepository {
  constructor(
    @Inject(DRIZZLE_TOKEN) private db: NodePgDatabase<typeof schema>,
  ) {}

  async findByDomain(domain: string) {
    const result = await this.db
      .select()
      .from(projects)
      .where(eq(projects.name, domain))
      .limit(1);
    return result[0];
  }

  async findByPublicKey(key: string) {
    const result = await this.db
      .select()
      .from(projects)
      .where(eq(projects.apiPublicKey, key))
      .limit(1);
    return result[0];
  }
}
