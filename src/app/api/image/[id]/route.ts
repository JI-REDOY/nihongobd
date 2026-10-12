import { NextRequest, NextResponse } from "next/server";
import { GridFSBucket, ObjectId } from "mongodb";
import { db } from "@/lib/mongodb";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;

  try {
    const bucket = new GridFSBucket(db, { bucketName: "profileImages" });

    const chunks: Buffer[] = [];
    const downloadStream = bucket.openDownloadStream(new ObjectId(id));

    const buffer = await new Promise<Buffer>((resolve, reject) => {
      downloadStream.on("data", (chunk: Buffer) => chunks.push(chunk));
      downloadStream.on("error", reject);
      downloadStream.on("end", () => resolve(Buffer.concat(chunks)));
    });

    // Content type from metadata
    const files = await bucket.find({ _id: new ObjectId(id) }).toArray();
    const contentType =
      (files[0]?.metadata?.contentType as string) || "image/jpeg";

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Image serve error:", error);
    return new NextResponse("Image not found", { status: 404 });
  }
}