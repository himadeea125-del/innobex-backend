export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "iriea@2026";

const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET || "iriea-admin-session-secret-2026";

// Kept for backward compat reference but no longer used as cookie name
export const ADMIN_COOKIE = "iriea_admin";

export function sessionToken() {
  return SESSION_SECRET;
}

export function isAuthenticated(req) {
  const auth = req.headers["authorization"] || "";
  if (auth.startsWith("Bearer ")) {
    return auth.slice(7) === sessionToken();
  }
  // Fallback: also accept cookie (for any existing sessions)
  return req.cookies?.[ADMIN_COOKIE] === sessionToken();
}

export function requireAdmin(req, res, next) {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}
