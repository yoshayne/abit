"use client";

import Script from "next/script";

// Zeffy's official inline embed snippet for this form. zeffy-embed.js finds
// the [data-zeffy-embed] container and replaces it with the live donation
// form. If that script fails to load (network issue, ad blocker), the
// onError handler below reveals the fallback iframe instead. Keep the
// form URL, script src, and attribute names exactly as Zeffy provided them.
const ZEFFY_FORM_PATH = "/embed/donation-form/donate-to-make-a-difference-978";
const ZEFFY_FORM_URL = `https://www.zeffy.com${ZEFFY_FORM_PATH}`;

function showZeffyFallback() {
  document.querySelectorAll<HTMLElement>("[data-zeffy-embed-fallback]").forEach((el) => {
    el.style.display = "block";
    el.querySelectorAll<HTMLIFrameElement>("iframe[data-zeffy-embed-src]").forEach((frame) => {
      const src = frame.getAttribute("data-zeffy-embed-src");
      if (src) frame.src = src;
    });
  });
}

export function DonateEmbed() {
  return (
    <div>
      <div {...{ "data-zeffy-embed": "", "data-form-url": ZEFFY_FORM_PATH }} />
      <div {...{ "data-zeffy-embed-fallback": "" }} style={{ display: "none" }}>
        <div style={{ position: "relative", overflow: "hidden", height: 450, width: "100%" }}>
          <iframe
            title="Donation form powered by Zeffy"
            style={{
              position: "absolute",
              border: 0,
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              width: "100%",
              height: "100%",
            }}
            {...{
              "data-zeffy-embed-src": ZEFFY_FORM_URL,
              allowpaymentrequest: "true",
              allowtransparency: "true",
            }}
          />
        </div>
      </div>
      <Script
        src="https://www.zeffy.com/embed/v2/zeffy-embed.js"
        strategy="afterInteractive"
        onError={showZeffyFallback}
      />
    </div>
  );
}
