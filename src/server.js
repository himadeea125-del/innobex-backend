import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import registerRoute from "./routes/register.js";
import contactRoute from "./routes/contact.js";
import adminRoute from "./routes/admin.js";
import { ensureSchema } from "./lib/db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 4000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

// Trust proxy for Railway/reverse proxy deployments
app.set('trust proxy', 1);

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true, // allow the admin session cookie to be sent
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve uploaded files (company docs / MSME certificates) at /uploads/<file>
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// ── API routes ───────────────────────────────────────────────────────────────
app.use("/api/register", registerRoute);
app.use("/api/contact", contactRoute);
app.use("/api/admin", adminRoute);

app.get("/", (_req, res) => {
  res.json({ name: "IRIEA Summit API", status: "ok" });
});

// Start listening first so Passenger always sees a live app, then make sure the
// database table exists. If the DB is unreachable we log it but keep the server
// up (so "/" responds and the real error is visible in the logs) instead of
// crashing into Passenger's generic "something went wrong" page.
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});

ensureSchema()
  .then(() => console.log("✅ Database schema is ready"))
  .catch((err) => {
    console.error("⚠️  Failed to initialize database schema:", err);
  });
