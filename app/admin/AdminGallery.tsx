"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { GalleryItem } from "@/lib/gallery";

export default function AdminGallery({ items }: { items: GalleryItem[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  const remove = async (id: string) => {
    if (!confirm("Remove this photo from the gallery?")) return;
    setBusy(id);
    await fetch("/api/gallery", { method: "DELETE", headers: { "content-type": "application/json" }, body: JSON.stringify({ id }) });
    setBusy(null);
    router.refresh();
  };

  return (
    <div className="jfh-admin__grid">
      {items.map((it) => (
        <figure key={it.id} className="jfh-admin__tile">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={it.src} alt={it.caption ?? ""} loading="lazy" />
          <figcaption>
            <span>{it.caption || "—"}</span>
            <button type="button" onClick={() => remove(it.id)} disabled={busy === it.id}>
              {busy === it.id ? "Removing…" : "Remove"}
            </button>
          </figcaption>
        </figure>
      ))}
      {!items.length && <p>No photos yet — upload the first one above.</p>}
    </div>
  );
}
