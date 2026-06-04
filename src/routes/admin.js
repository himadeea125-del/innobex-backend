import { Router } from "express";
import { pool } from "../lib/db.js";
import { ADMIN_USERNAME, ADMIN_PASSWORD, sessionToken, requireAdmin } from "../lib/adminAuth.js";

const router = Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return res.json({ success: true, token: sessionToken() });
  }
  return res.status(401).json({ error: "Invalid credentials" });
});

router.post("/logout", (_req, res) => {
  return res.json({ success: true });
});

const SELECT_COLUMNS = `
  id, name,
  company_name     AS companyName,
  email, phone, designation, industry, achievements,
  company_document AS companyDocument,
  msme_certificate AS msmeCertificate,
  status,
  created_at       AS createdAt
`;

// Proxy Cloudinary files with correct PDF headers so browser opens inline
router.get("/proxy", async (req, res) => {
  const { url } = req.query;
  if (!url || !url.includes("res.cloudinary.com")) {
    return res.status(400).json({ error: "Invalid URL" });
  }
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=\"document.pdf\"");
    return res.send(Buffer.from(buffer));
  } catch (err) {
    console.error("Proxy error:", err);
    return res.status(500).json({ error: "Failed to fetch file" });
  }
});

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

export default router;
