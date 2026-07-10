// Drop the Zeffy embed snippet in here once the donation form exists in
// the Zeffy dashboard (Zeffy → your form → Share → Embed). It's normally
// a <div class="zeffy-embed-container">...<iframe .../></div> block —
// replace the placeholder below with that exact markup, unmodified.
//
// If Zeffy's snippet includes a <script> tag, it can't go directly in a
// Server Component — ask to have it wired in via next/script instead.

export function DonateEmbed() {
  return (
    <div className="flex min-h-[500px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-brand-purple/30 bg-slate-50 p-10 text-center">
      <p className="font-display text-lg font-bold text-brand-purple-dark">
        Donation form coming soon
      </p>
      <p className="mt-2 max-w-sm text-sm text-brand-purple-dark/60">
        This is where the Zeffy donation form will be embedded once it&apos;s
        set up. In the meantime, email{" "}
        <a href="mailto:abitcommunity@gmail.com" className="text-brand-teal underline">
          abitcommunity@gmail.com
        </a>{" "}
        to give.
      </p>
    </div>
  );
}
