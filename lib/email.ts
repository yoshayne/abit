// All outbound email + newsletter-list sync goes through Brevo's API.
// Every function here is best-effort: a missing BREVO_API_KEY or a failed
// request never blocks a form submission — the database row is always the
// source of truth. BREVO_API_BASE lets tests point at a mock server instead
// of the real Brevo API; it defaults to the real one in production.

const BREVO_API_BASE = process.env.BREVO_API_BASE ?? "https://api.brevo.com/v3";
const NEWSLETTER_FOLDER_NAME = "ABIT Website";
const NEWSLETTER_LIST_NAME = "ABIT Newsletter";

function brevoHeaders(apiKey: string) {
  return {
    "api-key": apiKey,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

async function sendBrevoEmail({
  to,
  toName,
  subject,
  html,
  replyTo,
}: {
  to: string;
  toName?: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.ABIT_NOTIFY_EMAIL;

  if (!apiKey || !senderEmail) {
    console.warn("sendBrevoEmail skipped: BREVO_API_KEY or ABIT_NOTIFY_EMAIL is not set");
    return;
  }

  try {
    const res = await fetch(`${BREVO_API_BASE}/smtp/email`, {
      method: "POST",
      headers: brevoHeaders(apiKey),
      body: JSON.stringify({
        sender: { name: "ABIT Community Development Group", email: senderEmail },
        to: [{ email: to, name: toName }],
        subject,
        htmlContent: html,
        ...(replyTo ? { replyTo: { email: replyTo } } : {}),
      }),
    });

    if (!res.ok) {
      console.error("sendBrevoEmail failed:", res.status, await res.text());
    }
  } catch (err) {
    console.error("sendBrevoEmail error:", err);
  }
}

// Notifies the ABIT inbox about a new form submission.
export function sendNotificationEmail({
  subject,
  html,
  replyTo,
}: {
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<void> {
  const notifyEmail = process.env.ABIT_NOTIFY_EMAIL;
  if (!notifyEmail) {
    console.warn("sendNotificationEmail skipped: ABIT_NOTIFY_EMAIL is not set");
    return Promise.resolve();
  }
  return sendBrevoEmail({ to: notifyEmail, subject, html, replyTo });
}

// Confirms receipt back to whoever submitted a form.
export function sendConfirmationEmail({
  to,
  toName,
  subject,
  html,
}: {
  to: string;
  toName?: string;
  subject: string;
  html: string;
}): Promise<void> {
  return sendBrevoEmail({ to, toName, subject, html });
}

type BrevoFolder = { id: number; name: string };
type BrevoList = { id: number; name: string };

async function brevoGet<T>(path: string, apiKey: string): Promise<T> {
  const res = await fetch(`${BREVO_API_BASE}${path}`, {
    headers: brevoHeaders(apiKey),
  });
  if (!res.ok) {
    throw new Error(`Brevo GET ${path} failed: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

async function brevoPost<T>(path: string, apiKey: string, body: unknown): Promise<T | null> {
  const res = await fetch(`${BREVO_API_BASE}${path}`, {
    method: "POST",
    headers: brevoHeaders(apiKey),
    body: JSON.stringify(body),
  });
  if (!res.ok && res.status !== 204) {
    throw new Error(`Brevo POST ${path} failed: ${res.status} ${await res.text()}`);
  }
  return res.status === 204 ? null : res.json();
}

async function findOrCreateFolderId(apiKey: string): Promise<number> {
  const data = await brevoGet<{ folders?: BrevoFolder[] }>("/contacts/folders?limit=50", apiKey);
  const existing = data.folders?.find((folder) => folder.name === NEWSLETTER_FOLDER_NAME);
  if (existing) return existing.id;

  const created = await brevoPost<BrevoFolder>("/contacts/folders", apiKey, {
    name: NEWSLETTER_FOLDER_NAME,
  });
  if (!created) throw new Error("Brevo create folder returned no body");
  return created.id;
}

async function findOrCreateListId(apiKey: string): Promise<number> {
  const data = await brevoGet<{ lists?: BrevoList[] }>("/contacts/lists?limit=50", apiKey);
  const existing = data.lists?.find((list) => list.name === NEWSLETTER_LIST_NAME);
  if (existing) return existing.id;

  const folderId = await findOrCreateFolderId(apiKey);
  const created = await brevoPost<BrevoList>("/contacts/lists", apiKey, {
    name: NEWSLETTER_LIST_NAME,
    folderId,
  });
  if (!created) throw new Error("Brevo create list returned no body");
  return created.id;
}

// Adds/updates the subscriber in a real Brevo contact list (auto-created on
// first use) so the newsletter is actually sendable from Brevo, not just a
// row sitting in Postgres.
export async function syncNewsletterContact(
  email: string,
  firstName?: string | null
): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.warn("syncNewsletterContact skipped: BREVO_API_KEY is not set");
    return;
  }

  try {
    const listId = await findOrCreateListId(apiKey);
    await brevoPost("/contacts", apiKey, {
      email,
      listIds: [listId],
      updateEnabled: true,
      ...(firstName ? { attributes: { FIRSTNAME: firstName } } : {}),
    });
  } catch (err) {
    console.error("syncNewsletterContact error:", err);
  }
}
