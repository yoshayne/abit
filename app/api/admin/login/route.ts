import { NextResponse } from "next/server";
import { createSessionToken, sessionCookieOptions, SESSION_COOKIE, verifyPassword } from "@/lib/auth";
import { query } from "@/lib/db";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { adminLoginSchema } from "@/lib/validation";

type AdminRow = {
  id: number;
  email: string;
  password_hash: string;
  role: string;
};

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const allowed = await checkRateLimit(`admin-login:${ip}`, 10, 15 * 60);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many login attempts. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = adminLoginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
  }

  const rows = await query<AdminRow>(
    "SELECT id, email, password_hash, role FROM admins WHERE email = $1",
    [parsed.data.email]
  );
  const admin = rows[0];

  // Always run a hash comparison, even with no matching row, so a
  // nonexistent email doesn't respond measurably faster than a wrong
  // password and leak which emails have accounts via timing.
  const DUMMY_HASH =
    "$2b$10$wvUqO7UFAIJUZQeW9FGlFuozeb9YqpaVTdjqdp9FCsOszvOYaWQAm";
  const passwordMatches = admin
    ? await verifyPassword(parsed.data.password, admin.password_hash)
    : await verifyPassword(parsed.data.password, DUMMY_HASH);

  if (!admin || !passwordMatches) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const token = await createSessionToken({
    adminId: admin.id,
    email: admin.email,
    role: admin.role,
  });

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions);
  return res;
}
