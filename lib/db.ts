import { Pool } from "pg";

// One shared connection pool for the whole app.
// Railway provides DATABASE_URL automatically when you add the Postgres plugin.
// Use the INTERNAL url (no SSL needed). If you ever connect over the public
// url, set DATABASE_SSL=true in your env vars.

declare global {
  // eslint-disable-next-line no-var
  var _abitPool: Pool | undefined;
}

const pool =
  global._abitPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:
      process.env.DATABASE_SSL === "true"
        ? { rejectUnauthorized: false }
        : undefined,
  });

if (process.env.NODE_ENV !== "production") {
  global._abitPool = pool;
}

export { pool };

// Small helper so pages can run queries simply.
export async function query<T = unknown>(
  text: string,
  params?: unknown[]
): Promise<T[]> {
  const result = await pool.query(text, params as never);
  return result.rows as T[];
}
