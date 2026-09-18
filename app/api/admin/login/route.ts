import { NextResponse } from "next/server";
import { ADMIN_COOKIE, checkPassword, makeToken } from "@/lib/auth";

export async function POST(req: Request) {
  const form = await req.formData();
  const pw = String(form.get("password") ?? "");
  if (!checkPassword(pw)) {
    return NextResponse.redirect(new URL("/admin?error=1", req.url), 303);
  }
  const res = NextResponse.redirect(new URL("/admin", req.url), 303);
  res.cookies.set(ADMIN_COOKIE, makeToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 7 * 86400,
  });
  return res;
}
