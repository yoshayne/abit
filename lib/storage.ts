import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

let client: S3Client | null = null;

function getClient(): S3Client {
  if (client) return client;

  const endpoint = process.env.BUCKET_ENDPOINT_URL;
  const region = process.env.BUCKET_REGION;
  const accessKeyId = process.env.BUCKET_ACCESS_KEY_ID;
  const secretAccessKey = process.env.BUCKET_SECRET_ACCESS_KEY;

  if (!endpoint || !region || !accessKeyId || !secretAccessKey) {
    throw new Error(
      "Storage bucket env vars are not set (BUCKET_ENDPOINT_URL, BUCKET_REGION, BUCKET_ACCESS_KEY_ID, BUCKET_SECRET_ACCESS_KEY)"
    );
  }

  client = new S3Client({
    endpoint,
    region,
    credentials: { accessKeyId, secretAccessKey },
    forcePathStyle: true,
  });
  return client;
}

export class UploadValidationError extends Error {}

export async function uploadImage(
  file: File,
  keyPrefix: "events" | "news"
): Promise<string> {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new UploadValidationError(
      "Only JPEG, PNG, WebP, or GIF images are allowed"
    );
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new UploadValidationError("Image must be smaller than 5MB");
  }

  const bucketName = process.env.BUCKET_NAME;
  if (!bucketName) {
    throw new Error("BUCKET_NAME is not set");
  }

  const extension = file.type.split("/")[1] === "jpeg" ? "jpg" : file.type.split("/")[1];
  const key = `${keyPrefix}/${crypto.randomUUID()}.${extension}`;
  const bytes = new Uint8Array(await file.arrayBuffer());

  await getClient().send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: bytes,
      ContentType: file.type,
      ACL: "public-read",
    })
  );

  // Path-style public URL. Verify this matches your bucket's actual public
  // access setup once real credentials are configured — Tigris (and other
  // S3-compatible providers) can be set up with a custom public domain
  // instead, in which case this should point at that domain.
  const endpoint = process.env.BUCKET_ENDPOINT_URL;
  return `${endpoint}/${bucketName}/${key}`;
}
