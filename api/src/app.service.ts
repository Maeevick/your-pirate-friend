import { Inject, Injectable } from '@nestjs/common';

import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import * as schema from './drizzle/schema';
import { DRIZZLE_TOKEN } from './drizzle/drizzle.provider';

@Injectable()
export class AppService {
  constructor(
    @Inject(DRIZZLE_TOKEN) private db: NodePgDatabase<typeof schema>,
  ) {}

  getHealthCheck(): string {
    return 'ok';
  }
  async getHello(): Promise<{ hello: string }> {
    const [result] = await this.db.select().from(schema.health).limit(1);

    if (!result) {
      throw new Error('No health status found');
    }

    return { hello: result.status };
  }
}
