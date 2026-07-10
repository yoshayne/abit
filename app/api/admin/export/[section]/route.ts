import { NextResponse } from "next/server";
import { queryAdminRows } from "@/lib/adminQuery";
import { ADMIN_TABLES } from "@/lib/adminTables";
import { toCsv } from "@/lib/csv";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ section: string }> }
) {
  const { section } = await params;
  const config = ADMIN_TABLES[section];
  if (!config) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? undefined;
  const rows = await queryAdminRows(config, q);
  const csv = toCsv(rows, [{ key: "id", label: "ID" }, ...config.columns]);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${config.slug}.csv"`,
    },
  });
}
