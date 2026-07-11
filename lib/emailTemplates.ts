// Shared HTML wrapper for every outbound email (ABIT notifications and
// submitter confirmations) so they share consistent ABIT branding instead
// of arriving as bare unstyled text.
export function renderEmail({
  heading,
  bodyHtml,
}: {
  heading: string;
  bodyHtml: string;
}): string {
  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:24px 16px;background:#f4f2f7;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:520px;margin:0 auto;">
      <div style="background:#4B1E71;border-radius:12px 12px 0 0;padding:20px 24px;">
        <span style="color:#ffffff;font-size:18px;font-weight:bold;">ABIT Community Development Group</span>
      </div>
      <div style="background:#ffffff;border-radius:0 0 12px 12px;padding:24px;color:#2c1a3d;line-height:1.5;">
        <h2 style="margin:0 0 16px;color:#4B1E71;font-size:20px;">${heading}</h2>
        ${bodyHtml}
      </div>
      <p style="text-align:center;color:#8a7a99;font-size:12px;margin-top:16px;">
        ABIT Community Development Group &middot; Columbia, SC
      </p>
    </div>
  </body>
</html>`;
}
