import { notFound } from "next/navigation";
import { DataTable } from "@/components/admin/DataTable";
import { SearchBar } from "@/components/admin/SearchBar";
import { ADMIN_TABLES } from "@/lib/adminTables";
import { queryAdminRows } from "@/lib/adminQuery";

export default async function AdminSectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ section: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { section } = await params;
  const config = ADMIN_TABLES[section];
  if (!config) notFound();

  const { q } = await searchParams;
  const rows = await queryAdminRows(config, q);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-purple-dark">
            {config.label}
          </h1>
          <p className="mt-1 text-sm text-brand-purple-dark/60">
            {rows.length} {rows.length === 1 ? "result" : "results"}
            {q ? ` for "${q}"` : ""}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <SearchBar defaultValue={q} placeholder={`Search ${config.label.toLowerCase()}…`} />
          <a
            href={`/api/admin/export/${config.slug}${q ? `?q=${encodeURIComponent(q)}` : ""}`}
            className="whitespace-nowrap rounded-lg bg-brand-teal px-4 py-2 text-sm font-semibold text-white hover:bg-brand-teal/90"
          >
            Export CSV
          </a>
        </div>
      </div>

      <div className="mt-6">
        <DataTable columns={config.columns} rows={rows} />
      </div>
    </div>
  );
}
