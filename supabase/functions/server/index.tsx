import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-101cd544/health", (c) => {
  return c.json({ status: "ok" });
});

// Send contact form email via Resend
app.post("/make-server-101cd544/send-email", async (c) => {
  try {
    const { name, email, message } = await c.req.json();

    if (!name || !email || !message) {
      return c.json({ error: "Missing required fields: name, email, message" }, 400);
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.log("Error: RESEND_API_KEY environment variable is not set");
      return c.json({ error: "Email service not configured" }, 500);
    }

    console.log(`RESEND_API_KEY loaded — length: ${RESEND_API_KEY.length}, starts with: ${RESEND_API_KEY.substring(0, 6)}, ends with: ${RESEND_API_KEY.slice(-4)}`);

    const htmlBody = `
      <div style="font-family: 'Roboto', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0d1117; color: #e6edf3; padding: 32px; border-radius: 16px;">
        <div style="background: linear-gradient(135deg, #5BA8FF 0%, #26C6B0 100%); padding: 24px; border-radius: 12px; margin-bottom: 24px;">
          <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #fff; letter-spacing: -0.03em;">New Project Enquiry — Switch Point</h1>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid rgba(189,195,206,0.1);">
              <span style="font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #5BA8FF;">From</span><br/>
              <span style="font-size: 16px; color: #e6edf3;">${name}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid rgba(189,195,206,0.1);">
              <span style="font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #5BA8FF;">Reply To</span><br/>
              <a href="mailto:${email}" style="font-size: 16px; color: #26C6B0; text-decoration: none;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 0;">
              <span style="font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #5BA8FF;">Message</span><br/>
              <p style="font-size: 15px; line-height: 1.8; color: #b0bac6; margin: 8px 0 0; white-space: pre-wrap;">${message}</p>
            </td>
          </tr>
        </table>
        <p style="font-size: 12px; color: #5a6270; margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(189,195,206,0.1);">
          Sent via the Switch Point portfolio contact form at sw-point.com
        </p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Switch Point <noreply@email.sw-point.com>",
        to: ["support@sw-point.com"],
        reply_to: email,
        subject: `New Project Enquiry from ${name} — Switch Point`,
        html: htmlBody,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log(`Resend API error (${res.status}):`, JSON.stringify(data));
      return c.json({ error: `Failed to send email: ${JSON.stringify(data)}` }, 500);
    }

    console.log("Email sent successfully:", data.id);
    return c.json({ success: true, id: data.id });
  } catch (err) {
    console.log("Unexpected error in /send-email route:", err);
    return c.json({ error: `Unexpected server error: ${err}` }, 500);
  }
});

Deno.serve(app.fetch);