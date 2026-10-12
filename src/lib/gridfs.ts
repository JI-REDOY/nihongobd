import { GridFSBucket, ObjectId } from "mongodb";
import { db } from "./mongodb";

const BUCKET_NAME = "profileImages";

let bucket: GridFSBucket | null = null;

export function getBucket(): GridFSBucket {
  if (!bucket) {
    bucket = new GridFSBucket(db, { bucketName: BUCKET_NAME });
  }
  return bucket;
}

export async function uploadImage(
  buffer: Buffer,
  filename: string,
  contentType: string
): Promise<string> {
  const b = getBucket();

  return new Promise((resolve, reject) => {
    const uploadStream = b.openUploadStream(filename, {
      metadata: { uploadedAt: new Date(), contentType },
    });

    uploadStream.on("error", reject);
    uploadStream.on("finish", () => {
      resolve(uploadStream.id.toString());
    });

    uploadStream.end(buffer);
  });
}

export async function deleteImage(fileId: string): Promise<void> {
  try {
    const b = getBucket();
    await b.delete(new ObjectId(fileId));
  } catch (error) {
    console.error("GridFS delete error:", error);
  }
}

export async function getImageStream(fileId: string) {
  const b = getBucket();
  return b.openDownloadStream(new ObjectId(fileId));
}