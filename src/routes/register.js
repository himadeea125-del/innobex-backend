import { Router } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { pool } from "../lib/db.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Store files in memory so we can upload to Cloudinary directly
const upload = multer({ storage: multer.memoryStorage() }).fields([
  { name: "companyDocument", maxCount: 1 },
  { name: "msmeCertificate", maxCount: 1 },
]);

async function uploadToCloudinary(file) {
  if (!file) return null;
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "innobex2026", resource_type: "auto" },
      (err, result) => (err ? reject(err) : resolve(result.secure_url))
    );
    stream.end(file.buffer);
  });
}

const router = Router();

router.post("/", (req, res) => {
  upload(req, res, async (uploadErr) => {
    try {
      if (uploadErr) throw uploadErr;

      const { name, company, email, phone, designation, industry, achievements } = req.body;

      if (!name || !company || !email || !phone || !designation || !industry || !achievements) {
        return res.status(400).json({ error: "All required fields must be filled." });
      }

      const companyDocUrl = await uploadToCloudinary(req.files?.companyDocument?.[0]);
      const msmeCertUrl  = await uploadToCloudinary(req.files?.msmeCertificate?.[0]);

      await pool.query(
        `INSERT INTO registrations
           (name, company_name, email, phone, designation, industry,
            achievements, company_document, msme_certificate)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, company, email, phone, designation, industry, achievements, companyDocUrl, msmeCertUrl]
      );

      return res.json({ success: true, message: "Registration submitted successfully." });
    } catch (err) {
      console.error("Registration error:", err);
      return res.status(500).json({ error: "Server error. Please try again later." });
    }
  });
});

export default router;
