import { getSession } from "@/lib/session";

export default async function AdminHomePage() {
  const session = await getSession();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-brand-purple-dark">
        Welcome back{session ? `, ${session.email}` : ""}
      </h1>
      <p className="mt-2 text-brand-purple-dark/70">
        Use the nav above to review form submissions or manage Events and
        News.
      </p>
    </div>
  );
}
