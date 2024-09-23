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
}
