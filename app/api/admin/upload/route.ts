import { NextResponse } from "next/server";
import { UploadValidationError, uploadImage } from "@/lib/storage";

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file");
  const keyPrefix = formData.get("keyPrefix");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (keyPrefix !== "events" && keyPrefix !== "news") {
    return NextResponse.json({ error: "Invalid keyPrefix" }, { status: 400 });
  }

  try {
    const url = await uploadImage(file, keyPrefix);
    return NextResponse.json({ url });
  } catch (err) {
    if (err instanceof UploadValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error("Image upload failed:", err);
    return NextResponse.json(
      { error: "Upload failed. The storage bucket may not be configured yet." },
      { status: 500 }
    );
  }
}
