import { isAdmin, adminConfigured } from "@/lib/auth";
import { readGallery } from "@/lib/gallery";
import AdminGallery from "./AdminGallery";
import "./admin.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Gallery admin — Jenny's Fashion Home", robots: { index: false, follow: false } };

/**
 * Lightweight password-protected upload page for the gallery.
 * Set ADMIN_PASSWORD (and optionally ADMIN_SECRET) in .env.local.
 */
export default async function AdminPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const params = await searchParams;
  const authed = await isAdmin();

  if (!adminConfigured()) {
    return (
      <main className="jfh-admin">
        <div className="jfh-admin__card">
          <h1>Gallery admin</h1>
          <p className="jfh-admin__warn">
            No password is set. Add <code>ADMIN_PASSWORD=your-password</code> to <code>.env.local</code> and restart the server.
          </p>
        </div>
      </main>
    );
  }

  if (!authed) {
    return (
      <main className="jfh-admin">
        <form className="jfh-admin__card" method="post" action="/api/admin/login">
          <h1>Gallery admin</h1>
          <p>Sign in to add or remove store photos.</p>
          {params.error && <p className="jfh-admin__warn">Wrong password — try again.</p>}
          <label>
            Password
            <input type="password" name="password" autoFocus required />
          </label>
          <button type="submit">Sign in</button>
        </form>
      </main>
    );
  }

  const items = await readGallery();
  return (
    <main className="jfh-admin">
      <div className="jfh-admin__card jfh-admin__card--wide">
        <div className="jfh-admin__head">
          <div>
            <h1>Gallery admin</h1>
            <p>Photos appear on the dedicated gallery page (<a href="/gallery" target="_blank" rel="noopener noreferrer">/gallery</a>) in the order below (newest first).</p>
          </div>
          <form method="post" action="/api/admin/logout">
            <button type="submit" className="jfh-admin__ghost">Sign out</button>
          </form>
        </div>

        {params.ok && <p className="jfh-admin__ok">Uploaded. It&apos;s live on the gallery page!</p>}
        {params.error === "nofile" && <p className="jfh-admin__warn">Pick at least one image first.</p>}

        <form className="jfh-admin__upload" method="post" action="/api/gallery" encType="multipart/form-data">
          <label>
            Photos (JPG, PNG, WEBP · up to 12 MB each)
            <input type="file" name="photos" accept="image/*" multiple required />
          </label>
          <label>
            Caption (optional, shown on hover)
            <input type="text" name="caption" maxLength={80} placeholder="e.g. New season gowns" />
          </label>
          <button type="submit">Upload</button>
        </form>

        <AdminGallery items={items} />
      </div>
    </main>
  );
}
