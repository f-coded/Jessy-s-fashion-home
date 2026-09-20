import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { randomBytes } from "crypto";
import { v2 as cloudinary } from "cloudinary";
import { isAdmin } from "@/lib/auth";
import { readGallery, writeGallery, UPLOAD_DIR, type GalleryItem } from "@/lib/gallery";

if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

const ALLOWED: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/avif": ".avif",
};
const MAX_BYTES = 12 * 1024 * 1024;

export async function GET() {
  return NextResponse.json(await readGallery());
}

/** Multipart upload: one or more `photos` files + optional `caption`. */
export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const form = await req.formData();
  const caption = String(form.get("caption") ?? "").trim().slice(0, 80);
  const files = form.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0);
  if (!files.length) return NextResponse.redirect(new URL("/admin?error=nofile", req.url), 303);

  const items = await readGallery();
  const hasCloudinary = Boolean(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY);

  if (!hasCloudinary) {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  }

  for (const file of files) {
    const ext = ALLOWED[file.type];
    if (!ext || file.size > MAX_BYTES) continue;
    const id = `${Date.now().toString(36)}-${randomBytes(4).toString("hex")}`;
    let srcUrl = "";

    if (hasCloudinary) {
      try {
        const buffer = Buffer.from(await file.arrayBuffer());
        const res = await new Promise<{ secure_url: string }>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "jennys-fashion-home" },
            (err, result) => {
              if (err || !result) reject(err);
              else resolve(result);
            }
          );
          stream.end(buffer);
        });
        srcUrl = res.secure_url;
      } catch {
        const name = `${id}${ext}`;
        await fs.writeFile(path.join(UPLOAD_DIR, name), Buffer.from(await file.arrayBuffer()));
        srcUrl = `/gallery/${name}`;
      }
    } else {
      const name = `${id}${ext}`;
      await fs.writeFile(path.join(UPLOAD_DIR, name), Buffer.from(await file.arrayBuffer()));
      srcUrl = `/gallery/${name}`;
    }

    const item: GalleryItem = { id, src: srcUrl, caption: caption || undefined, addedAt: new Date().toISOString() };
    items.unshift(item);
  }
  await writeGallery(items);
  return NextResponse.redirect(new URL("/admin?ok=1", req.url), 303);
}

/** Remove one item by id (and its file when it lives in the upload folder). */
export async function DELETE(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = (await req.json()) as { id?: string };
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const items = await readGallery();
  const target = items.find((i) => i.id === id);
  if (!target) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await writeGallery(items.filter((i) => i.id !== id));
  if (!id.startsWith("seed-")) {
    const file = path.join(UPLOAD_DIR, path.basename(target.src));
    await fs.rm(file, { force: true });
  }
  return NextResponse.json({ ok: true });
}
