import { query } from "./db";
import type { AdminTableConfig } from "./adminTables";

// Table/column names here always come from our own ADMIN_TABLES config,
// never from request input, so interpolating them into SQL is safe —
// only the search term itself is parameterized.
export async function queryAdminRows(
  config: AdminTableConfig,
  search: string | undefined
): Promise<Record<string, unknown>[]> {
  const columnList = config.columns.map((c) => c.key).join(", ");

  if (!search) {
    return query(
      `SELECT id, ${columnList} FROM ${config.table} ORDER BY created_at DESC LIMIT 500`
    );
  }

  const whereClause = config.searchColumns
    .map((col, i) => `${col} ILIKE $${i + 1}`)
    .join(" OR ");
  const params = config.searchColumns.map(() => `%${search}%`);

  return query(
    `SELECT id, ${columnList} FROM ${config.table} WHERE ${whereClause} ORDER BY created_at DESC LIMIT 500`,
    params
  );
}
