import { cookies } from "next/headers";
import { SESSION_COOKIE, type SessionPayload, verifySessionToken } from "./auth";

// Server Components / Route Handlers only (uses next/headers, not Edge-safe
// the way middleware needs — middleware verifies the cookie itself).
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}
