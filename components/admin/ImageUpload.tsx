"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export function ImageUpload({
  name,
  keyPrefix,
  defaultValue,
}: {
  name: string;
  keyPrefix: "events" | "news";
  defaultValue?: string | null;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("keyPrefix", keyPrefix);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Upload failed");
      setUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <div>
      <input type="hidden" name={name} value={url} />
      {url && (
        <div className="relative mb-3 h-40 w-full max-w-xs overflow-hidden rounded-lg border border-black/10">
          <Image src={url} alt="" fill unoptimized className="object-cover" />
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        onChange={handleFileChange}
        disabled={uploading}
        className="text-sm text-brand-purple-dark"
      />
      {uploading && <p className="mt-1 text-xs text-brand-purple-dark/60">Uploading…</p>}
      {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}
