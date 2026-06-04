// ── Hardcoded admin credentials ───────────────────────────────────────────
// Override via .env (ADMIN_USERNAME / ADMIN_PASSWORD) if you want, otherwise
// these defaults are used.
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "iriea@2026";

const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET || "iriea-admin-session-secret-2026";

export const ADMIN_COOKIE = "iriea_admin";

/** Opaque value stored in the auth cookie. */
export function sessionToken() {
  return SESSION_SECRET;
}

/** True when the given request carries a valid admin session cookie. */
export function isAuthenticated(req) {
  return req.cookies?.[ADMIN_COOKIE] === sessionToken();
}

/** Express middleware that rejects requests without a valid admin session. */
export function requireAdmin(req, res, next) {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}
