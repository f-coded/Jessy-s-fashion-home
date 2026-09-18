import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "jfh_admin";
const password = () => process.env.ADMIN_PASSWORD ?? "";
const secret = () => process.env.ADMIN_SECRET ?? password() + "::jfh";

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

/** Session token = expiry + HMAC; no DB needed. */
export function makeToken(days = 7) {
  const exp = String(Date.now() + days * 86400000);
  return `${exp}.${sign(exp)}`;
}

export function verifyToken(token: string | undefined) {
  if (!token || !password()) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig) return false;
  if (Number(exp) < Date.now()) return false;
  const expected = sign(exp);
  return expected.length === sig.length && timingSafeEqual(Buffer.from(expected), Buffer.from(sig));
}

export function checkPassword(input: string) {
  const p = password();
  if (!p) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(p);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function isAdmin() {
  const store = await cookies();
  return verifyToken(store.get(COOKIE)?.value);
}

export const ADMIN_COOKIE = COOKIE;
export const adminConfigured = () => password().length > 0;
