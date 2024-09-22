import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE_TOKEN } from '../drizzle/drizzle.provider';
import * as schema from '../drizzle/schema';
import { IEventRepository } from './event.port';

@Injectable()
export class EventRepository implements IEventRepository {
  constructor(
    @Inject(DRIZZLE_TOKEN) private db: NodePgDatabase<typeof schema>,
  ) {}

  async save(event: Omit<schema.NewEvent, 'id'>) {
    await this.db.insert(schema.events).values(event);
  }
}
