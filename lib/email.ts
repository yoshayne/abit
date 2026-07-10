// Notifies the ABIT inbox when a new form submission comes in, via Brevo's
// transactional email API. Best-effort: a missing BREVO_API_KEY (not yet
// set on Railway) or a failed send never blocks the form submission itself
// — the database row is always the source of truth.

const BREVO_SEND_URL = "https://api.brevo.com/v3/smtp/email";

export async function sendNotificationEmail({
  subject,
  html,
}: {
  subject: string;
  html: string;
}): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  const notifyEmail = process.env.ABIT_NOTIFY_EMAIL;

  if (!apiKey || !notifyEmail) {
    console.warn(
      "sendNotificationEmail skipped: BREVO_API_KEY or ABIT_NOTIFY_EMAIL is not set"
    );
    return;
  }

  try {
    const res = await fetch(BREVO_SEND_URL, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: "ABIT Website", email: notifyEmail },
        to: [{ email: notifyEmail }],
        subject,
        htmlContent: html,
      }),
    });

    if (!res.ok) {
      console.error(
        "sendNotificationEmail failed:",
        res.status,
        await res.text()
      );
    }
  } catch (err) {
    console.error("sendNotificationEmail error:", err);
  }
}
