import { Router } from "express";
import { pool } from "../lib/db.js";
import {
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  sessionToken,
  requireAdmin,
} from "../lib/adminAuth.js";

const router = Router();

// ── GET /api/admin/me ─────────────────────────────────────────────────────
router.get("/me", requireAdmin, (req, res) => {
  return res.json({ authenticated: true, username: ADMIN_USERNAME });
});

// ── POST /api/admin/login ──────────────────────────────────────────────────
router.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      return res.json({ success: true, token: sessionToken() });
    }
    return res.status(401).json({ error: "Invalid credentials" });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// ── POST /api/admin/logout ─────────────────────────────────────────────────
router.post("/logout", (_req, res) => {
  return res.json({ success: true });
});

// Columns aliased to camelCase so the JSON shape matches what Prisma returned.
const SELECT_COLUMNS = `
  id,
  name,
  company_name      AS companyName,
  email,
  phone,
  designation,
  industry,
  achievements,
  company_document  AS companyDocument,
  msme_certificate  AS msmeCertificate,
  status,
  created_at        AS createdAt,
  updated_at        AS updatedAt
`;

const ALLOWED_STATUSES = [
  "pending",
  "shortlisted",
  "finalist",
  "winner",
  "rejected",
];

// ── GET /api/admin/registrations ───────────────────────────────────────────
router.get("/registrations", requireAdmin, async (_req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT ${SELECT_COLUMNS} FROM registrations ORDER BY created_at DESC`
    );
    return res.json(rows);
  } catch (err) {
    console.error("Fetch registrations error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// ── PATCH /api/admin/registrations/:id ─────────────────────────────────────
router.patch("/registrations/:id", requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const id = parseInt(req.params.id, 10);

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }
    if (!ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const [result] = await pool.query(
      `UPDATE registrations SET status = ? WHERE id = ?`,
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Registration not found" });
    }

    const [rows] = await pool.query(
      `SELECT ${SELECT_COLUMNS} FROM registrations WHERE id = ?`,
      [id]
    );
    return res.json(rows[0]);
  } catch (err) {
    console.error("Update registration error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
