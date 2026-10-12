import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { uploadImage, deleteImage } from "@/lib/gridfs";
import { db } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const MAX_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "ছবির সাইজ ২MB এর কম হতে হবে" },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "শুধু JPEG, PNG, WebP, GIF allow করা হয়" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // পুরানো ছবি delete
    const user = await db
      .collection("user")
      .findOne({ _id: new ObjectId(session.user.id) });

    if (user?.image?.startsWith("/api/image/")) {
      const oldFileId = user.image.replace("/api/image/", "");
      await deleteImage(oldFileId);
    }

    // নতুন ছবি upload
    const fileId = await uploadImage(buffer, file.name, file.type);
    const imageUrl = `/api/image/${fileId}`;

    // User update
    await db
      .collection("user")
      .updateOne(
        { _id: new ObjectId(session.user.id) },
        { $set: { image: imageUrl, updatedAt: new Date() } }
      );

    return NextResponse.json({ imageUrl, fileId });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}