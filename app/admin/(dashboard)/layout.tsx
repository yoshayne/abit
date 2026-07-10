import Image from "next/image";
import Link from "next/link";
import { AdminNav } from "@/components/admin/AdminNav";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { getSession } from "@/lib/session";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-brand-purple-dark">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center">
              <Image
                src="/logo.png"
                alt="ABIT"
                width={100}
                height={50}
                unoptimized
                className="h-8 w-auto rounded bg-white p-1"
              />
            </Link>
            <AdminNav />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/60">{session?.email}</span>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>
    </div>
  );
}
