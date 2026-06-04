import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { pool } from "../lib/db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.join(__dirname, "..", "..", "uploads");
fs.mkdirSync(uploadDir, { recursive: true });

// Map each upload field to the filename prefix used by the original app.
const PREFIX = { companyDocument: "company", msmeCertificate: "msme" };

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const prefix = PREFIX[file.fieldname] || "file";
    const safe = file.originalname.replace(/\s+/g, "_");
    cb(null, `${Date.now()}_${prefix}_${safe}`);
  },
});

const upload = multer({ storage }).fields([
  { name: "companyDocument", maxCount: 1 },
  { name: "msmeCertificate", maxCount: 1 },
]);

const router = Router();

router.post("/", (req, res) => {
  upload(req, res, async (uploadErr) => {
    try {
      if (uploadErr) throw uploadErr;

      const { name, company, email, phone, designation, industry, achievements } =
        req.body;

      // Validate required fields
      if (!name || !company || !email || !phone || !designation || !industry || !achievements) {
        return res.status(400).json({ error: "All required fields must be filled." });
      }

      const companyDoc = req.files?.companyDocument?.[0] || null;
      const msmeCert = req.files?.msmeCertificate?.[0] || null;

      const companyDocPath = companyDoc ? companyDoc.filename : null;
      const msmeCertPath = msmeCert ? msmeCert.filename : null;

      // Insert via mysql2
      await pool.query(
        `INSERT INTO registrations
           (name, company_name, email, phone, designation, industry,
            achievements, company_document, msme_certificate)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          name,
          company,
          email,
          phone,
          designation,
          industry,
          achievements,
          companyDocPath,
          msmeCertPath,
        ]
      );

      return res.json({ success: true, message: "Registration Summitted successfully." });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.error("Registration error:", errorMessage);
      return res.status(500).json({ error: "Server error. Please try again later." });
    }
  });
});

export default router;
