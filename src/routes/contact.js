import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Please fill in all required fields." });
    }

    // Here you would typically save to database or send email
    // For now, just return success
    console.log("Contact form submission:", { name, email, phone, subject, message });

    return res.json({ success: true, message: "Message received successfully." });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Contact form error:", errorMessage);
    return res.status(500).json({ error: "Server error. Please try again later." });
  }
});

export default router;
