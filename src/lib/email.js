import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BROCHURE_PATH = path.join(__dirname, "../../INNOBEX-BROCHURE.pdf");

function buildHtml({ name, email, phone, company, designation, industry, registrationDate }) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0f0;padding:20px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;">

  <tr>
    <td style="background:linear-gradient(135deg,#1a8a7a 0%,#0d2340 100%);padding:44px 30px;text-align:center;">
      <div style="font-size:44px;margin-bottom:14px;">&#127881;</div>
      <h1 style="color:#e8c96a;margin:0;font-size:30px;font-weight:bold;letter-spacing:1px;">Registration Confirmed!</h1>
      <p style="color:#a0d9d0;margin:12px 0 0;font-size:14px;line-height:1.6;">
        INNOBEX 2026 &#8211; Innovation Business Excellence<br/>Global Summit and Awards 2026
      </p>
    </td>
  </tr>

  <tr>
    <td style="padding:36px 30px;">
      <p style="font-size:20px;font-weight:bold;color:#0d2340;margin:0 0 6px;">Dear ${name},</p>
      <p style="color:#444;line-height:1.7;margin:0 0 8px;">Welcome to INNOBEX 2026!</p>
      <p style="color:#444;line-height:1.7;margin:0 0 24px;">We're thrilled to have you join our Innovation Business Excellence Global Summit and Awards event.</p>

      <table width="100%" cellpadding="0" cellspacing="0" style="border-left:4px solid #1a8a7a;background:#f0faf8;border-radius:6px;margin-bottom:28px;">
        <tr><td style="padding:20px 24px;">
          <h2 style="color:#0d2340;margin:0 0 16px;font-size:16px;font-weight:bold;">&#128203; Your Registration Details</h2>
          <table cellpadding="6" cellspacing="0">
            <tr><td style="color:#555;font-weight:bold;min-width:130px;">Name:</td><td style="color:#0d2340;font-weight:bold;">${name}</td></tr>
            <tr><td style="color:#555;font-weight:bold;">Email:</td><td style="color:#1a8a7a;">${email}</td></tr>
            <tr><td style="color:#555;font-weight:bold;">Phone:</td><td style="color:#333;">${phone}</td></tr>
            <tr><td style="color:#555;font-weight:bold;">Company:</td><td style="color:#333;">${company}</td></tr>
            <tr><td style="color:#555;font-weight:bold;">Designation:</td><td style="color:#333;">${designation}</td></tr>
            <tr><td style="color:#555;font-weight:bold;">Industry:</td><td style="color:#333;">${industry}</td></tr>
            <tr><td style="color:#555;font-weight:bold;">Reg. Date:</td><td style="color:#333;">${registrationDate}</td></tr>
          </table>
        </td></tr>
      </table>

      <h2 style="color:#1a8a7a;font-size:16px;margin:0 0 10px;">&#128197; Conference Details</h2>
      <ul style="color:#444;line-height:2.2;padding-left:20px;margin:0 0 24px;">
        <li><strong>Date:</strong> 11 June 2026</li>
        <li><strong>Venue:</strong> India International Centre, Lodhi Road, Delhi, India &#8211; 110003</li>
      </ul>

      <h2 style="color:#1a8a7a;font-size:16px;margin:0 0 10px;">&#128269; What's Next?</h2>
      <ul style="color:#444;line-height:2.2;padding-left:20px;margin:0 0 24px;">
        <li>Keep checking our website for updates</li>
      </ul>

      <p style="color:#444;line-height:1.7;margin:0 0 20px;">
        We look forward to your participation in making INNOBEX 2026 a grand success in driving Business Growth Through Leadership, Investment, Innovation &amp; Financial Excellence.
      </p>

      <h2 style="color:#1a8a7a;font-size:16px;margin:0 0 10px;">&#127942; INNOBEX 2026 Awards</h2>
      <p style="color:#555;font-size:13px;margin:0 0 8px;">Recognition across key categories including:</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
        <tr>
          <td style="width:50%;vertical-align:top;">
            <ul style="color:#444;line-height:2;padding-left:18px;font-size:13px;margin:0;">
              <li>Business Leader of the Year</li>
              <li>Innovation Excellence Award</li>
              <li>MSME Excellence Award</li>
              <li>Startup of the Year</li>
              <li>Green Business Award</li>
            </ul>
          </td>
          <td style="width:50%;vertical-align:top;">
            <ul style="color:#444;line-height:2;padding-left:18px;font-size:13px;margin:0;">
              <li>Women Leadership Award</li>
              <li>Young Entrepreneur Award</li>
              <li>Lifetime Achievement Award</li>
              <li>Digital Transformation Award</li>
              <li>Export Excellence Award</li>
            </ul>
          </td>
        </tr>
      </table>

      <h2 style="color:#1a8a7a;font-size:16px;margin:0 0 10px;">&#128222; Stay Connected</h2>
      <p style="color:#444;margin:0 0 8px;">For any questions or assistance, please contact us at:</p>
      <ul style="color:#444;line-height:2.2;padding-left:20px;margin:0 0 24px;">
        <li><strong>Email:</strong> info@traveon.in</li>
        <li><strong>Phone:</strong> +91 95401 11307</li>
      </ul>

      <p style="color:#444;line-height:1.7;margin:0 0 20px;">We look forward to welcoming you at the India International Centre, New Delhi on <strong>11 June 2026</strong>.</p>
      <p style="color:#444;margin:0 0 4px;">Best regards,</p>
      <p style="color:#0d2340;font-weight:bold;margin:0;font-size:15px;">Organizing Committee<br/>INNOBEX 2026</p>
    </td>
  </tr>

  <tr>
    <td style="background:#f8f8f8;padding:18px 30px;text-align:center;border-top:1px solid #eee;">
      <p style="color:#aaa;font-size:11px;margin:0 0 4px;">This is an automated confirmation email. Please do not reply to this email.</p>
      <p style="color:#aaa;font-size:11px;margin:0;">&#169; 2026 INNOBEX. All rights reserved.</p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

export async function sendRegistrationEmail({ name, email, phone, company, designation, industry }) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.warn("BREVO_API_KEY not set — skipping confirmation email.");
    return;
  }

  const registrationDate = new Date().toLocaleDateString("en-IN", {
    year: "numeric", month: "long", day: "numeric",
  });

  const payload = {
    sender: {
      name: process.env.BREVO_SENDER_NAME || "INNOBEX 2026",
      email: process.env.BREVO_SENDER_EMAIL || "traveonventures@gmail.com",
    },
    to: [{ email, name }],
    subject: "Registration Confirmed – INNOBEX 2026 Global Summit & Awards",
    htmlContent: buildHtml({ name, email, phone, company, designation, industry, registrationDate }),
  };

  // Attach brochure — try local file first, then Cloudinary URL fallback
  const brevoUrl = process.env.BROCHURE_URL;
  if (fs.existsSync(BROCHURE_PATH)) {
    payload.attachment = [{
      name: "INNOBEX-2026-Brochure.pdf",
      content: fs.readFileSync(BROCHURE_PATH).toString("base64"),
    }];
  } else if (brevoUrl) {
    const pdfRes = await fetch(brevoUrl);
    const buffer = await pdfRes.arrayBuffer();
    payload.attachment = [{
      name: "INNOBEX-2026-Brochure.pdf",
      content: Buffer.from(buffer).toString("base64"),
    }];
  }

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Brevo API error ${res.status}: ${err}`);
  }
}
