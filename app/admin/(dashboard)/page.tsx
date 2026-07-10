import Link from "next/link";
import { Card } from "@/components/Card";
import { ADMIN_TABLES } from "@/lib/adminTables";
import { query } from "@/lib/db";
import { getSession } from "@/lib/session";

async function getCounts() {
  const entries = Object.values(ADMIN_TABLES);
  const counts = await Promise.all(
    entries.map(async (config) => {
      const rows = await query<{ count: string }>(
        `SELECT count(*) FROM ${config.table}`
      );
      return { config, count: Number(rows[0]?.count ?? 0) };
    })
  );
  return counts;
}

export default async function AdminHomePage() {
  const [session, counts] = await Promise.all([getSession(), getCounts()]);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-brand-purple-dark">
        Welcome back{session ? `, ${session.email}` : ""}
      </h1>
      <p className="mt-2 text-brand-purple-dark/70">
        A quick look at form submissions. Use the nav above to manage Events
        and News.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {counts.map(({ config, count }) => (
          <Link key={config.slug} href={`/admin/${config.slug}`}>
            <Card className="p-6 transition-shadow hover:shadow-md">
              <p className="text-sm font-semibold text-brand-purple-dark/60">
                {config.label}
              </p>
              <p className="mt-2 font-display text-3xl font-bold text-brand-purple">
                {count}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
