import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from './schema';

export const DRIZZLE_TOKEN = 'drizzleProvider';

export const drizzleProvider = {
  provide: DRIZZLE_TOKEN,
  useFactory: async () => {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    try {
      await pool.query('SELECT NOW()');
    } catch (error) {
      throw error;
    }

    return drizzle(pool, { schema });
  },
  exports: [DRIZZLE_TOKEN],
};
