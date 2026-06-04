import mysql from "mysql2/promise";

// ── MySQL connection pool ─────────────────────────────────────────────────────
// Replaces Prisma. Uses the plain DB_* env vars so there is NO code-generation
// step (`prisma generate`) — which avoids the cPanel "did not initialize yet"
// error. mysql2 is already a dependency.
export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Create the registrations table if it doesn't exist yet. This replaces
// `prisma db push` so the schema is set up automatically on first run.
export async function ensureSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS registrations (
      id               INT AUTO_INCREMENT PRIMARY KEY,
      name             VARCHAR(255) NOT NULL,
      company_name     VARCHAR(255) NOT NULL,
      email            VARCHAR(255) NOT NULL,
      phone            VARCHAR(20)  NOT NULL,
      designation      VARCHAR(255) NOT NULL,
      industry         VARCHAR(255) NOT NULL,
      achievements     TEXT         NOT NULL,
      company_document VARCHAR(500) NULL,
      msme_certificate VARCHAR(500) NULL,
      status ENUM('pending','shortlisted','finalist','winner','rejected')
             NOT NULL DEFAULT 'pending',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_email (email),
      INDEX idx_status (status),
      INDEX idx_created_at (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
}
