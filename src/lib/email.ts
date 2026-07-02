import { Resend } from "resend";
import { site } from "./site";

const apiKey = process.env.RESEND_API_KEY;
const FROM = process.env.EMAIL_FROM || "Shree Agrasen Trust <onboarding@resend.dev>";
const OWNER = process.env.OWNER_EMAIL || site.email;

const resend = apiKey ? new Resend(apiKey) : null;

type Row = { label: string; value?: string | null };

function table(rows: Row[]) {
  return rows
    .filter((r) => r.value)
    .map(
      (r) =>
        `<tr><td style="padding:6px 12px;color:#78716c;font-size:13px">${r.label}</td><td style="padding:6px 12px;color:#1c1917;font-size:14px;font-weight:600">${r.value}</td></tr>`
    )
    .join("");
}

function shell(title: string, inner: string) {
  return `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #ece7e1;border-radius:16px;overflow:hidden">
    <div style="background:#f69323;padding:20px 24px;color:#fff;font-size:18px;font-weight:700">${site.name}</div>
    <div style="padding:24px">
      <h2 style="margin:0 0 12px;color:#1c1917;font-size:20px">${title}</h2>
      ${inner}
    </div>
    <div style="background:#faf7f2;padding:16px 24px;color:#78716c;font-size:12px">${site.address.full}</div>
  </div>`;
}

export type BookingPayload = {
  name: string; phone: string; email: string;
  event_type: string; venue: string; event_date: string;
  alt_date?: string; guests?: string; message?: string;
  documentUrl?: string;
};

export async function sendBookingEmails(b: BookingPayload) {
  if (!resend) return { sent: false, reason: "email-not-configured" };

  const rows = table([
    { label: "Name", value: b.name },
    { label: "Phone", value: b.phone },
    { label: "Email", value: b.email },
    { label: "Event type", value: b.event_type },
    { label: "Venue", value: b.venue },
    { label: "Preferred date", value: b.event_date },
    { label: "Alternate date", value: b.alt_date },
    { label: "Guests", value: b.guests },
    { label: "Message", value: b.message },
  ]);
  const docLine = b.documentUrl
    ? `<p style="margin-top:12px"><a href="${b.documentUrl}" style="color:#e07c0c">View uploaded document</a></p>`
    : "";

  // 1) Owner notification
  await resend.emails.send({
    from: FROM,
    to: OWNER,
    replyTo: b.email,
    subject: `New Hall Booking Enquiry — ${b.name} (${b.event_date})`,
    html: shell(
      "New booking enquiry",
      `<table style="width:100%;border-collapse:collapse">${rows}</table>${docLine}`
    ),
  });

  // 2) Booker confirmation
  await resend.emails.send({
    from: FROM,
    to: b.email,
    subject: `We received your booking request — ${site.name}`,
    html: shell(
      `Namaste ${b.name},`,
      `<p style="color:#44403c;font-size:14px;line-height:1.6">Thank you for your booking enquiry at ${site.venue}. We have received the following details and our team will contact you shortly to confirm availability.</p>
       <table style="width:100%;border-collapse:collapse;margin-top:12px">${rows}</table>
       <p style="color:#44403c;font-size:14px;margin-top:16px">For anything urgent, call us at ${site.phones.join(" / ")}.</p>`
    ),
  });

  return { sent: true };
}

export async function sendContactEmails(c: {
  name: string; phone: string; email?: string; subject?: string; message: string;
}) {
  if (!resend) return { sent: false, reason: "email-not-configured" };

  const rows = table([
    { label: "Name", value: c.name },
    { label: "Phone", value: c.phone },
    { label: "Email", value: c.email },
    { label: "Subject", value: c.subject },
    { label: "Message", value: c.message },
  ]);

  await resend.emails.send({
    from: FROM,
    to: OWNER,
    replyTo: c.email || undefined,
    subject: `New Contact Enquiry — ${c.name}`,
    html: shell("New contact message", `<table style="width:100%;border-collapse:collapse">${rows}</table>`),
  });

  if (c.email) {
    await resend.emails.send({
      from: FROM,
      to: c.email,
      subject: `Thanks for contacting ${site.name}`,
      html: shell(
        `Namaste ${c.name},`,
        `<p style="color:#44403c;font-size:14px;line-height:1.6">Thank you for reaching out to ${site.name}. We have received your message and will get back to you soon.</p>`
      ),
    });
  }

  return { sent: true };
}
