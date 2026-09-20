import { promises as fs } from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

export type GalleryItem = {
  id: string;
  src: string;
  caption?: string;
  addedAt: string;
};

const DATA_FILE = path.join(process.cwd(), "data", "gallery.json");
const TMP_DATA_FILE = path.join("/tmp", "gallery.json");
export const UPLOAD_DIR = path.join(process.cwd(), "public", "gallery");

if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

/** Seed shown until the client uploads their own photos via /admin. */
export const SEED: GalleryItem[] = [
  { id: "seed-storefront", src: "/gallery/storefront.jpg", caption: "The storefront", addedAt: "2026-09-18T00:00:00.000Z" },
  { id: "seed-atelier", src: "/gallery/atelier.jpg", caption: "Gown wall & machines", addedAt: "2026-09-18T00:00:00.000Z" },
  { id: "seed-boutique", src: "/gallery/boutique.jpg", caption: "Ready-to-wear floor", addedAt: "2026-09-18T00:00:00.000Z" },
  { id: "seed-sketch", src: "/gallery/sketch-room.jpg", caption: "Mannequin sketch room", addedAt: "2026-09-18T00:00:00.000Z" },
];

export async function readGallery(): Promise<GalleryItem[]> {
  const hasCloudinary = Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );

  if (hasCloudinary) {
    try {
      const res = await cloudinary.api.resources({
        type: "upload",
        prefix: "jennys-fashion-home",
        context: true,
        max_results: 100,
      });

      if (res && Array.isArray(res.resources)) {
        const cloudItems: GalleryItem[] = res.resources.map((r: any) => ({
          id: r.public_id,
          src: r.secure_url,
          caption: r.context?.custom?.caption || undefined,
          addedAt: r.created_at || new Date().toISOString(),
        }));
        cloudItems.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
        return [...cloudItems, ...SEED];
      }
    } catch (e) {
      console.error("Cloudinary fetch error:", e);
    }
  }

  // Fallback for local development or when Cloudinary is not configured
  if (process.env.VERCEL) {
    try {
      const raw = await fs.readFile(TMP_DATA_FILE, "utf8");
      const items = JSON.parse(raw) as GalleryItem[];
      if (Array.isArray(items)) return items;
    } catch {
      // Fallback to static data file
    }
  }

  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const items = JSON.parse(raw) as GalleryItem[];
    return Array.isArray(items) ? items : SEED;
  } catch {
    return SEED;
  }
}

export async function writeGallery(items: GalleryItem[]) {
  const targetFile = process.env.VERCEL ? TMP_DATA_FILE : DATA_FILE;
  try {
    await fs.mkdir(path.dirname(targetFile), { recursive: true });
    await fs.writeFile(targetFile, JSON.stringify(items, null, 2), "utf8");
  } catch (e) {
    console.error("Error writing gallery file:", e);
  }
}
