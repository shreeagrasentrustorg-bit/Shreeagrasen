"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const field =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30";
const label = "mb-1.5 block text-sm font-medium text-ink";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "ok") {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-line bg-white p-10 text-center shadow-soft">
        <CheckCircle2 className="h-14 w-14 text-accent-600" />
        <h3 className="mt-4 font-head text-xl font-bold text-ink">Message sent!</h3>
        <p className="mt-2 text-muted">
          Thank you for reaching out. We&apos;ll get back to you shortly.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-line bg-white p-6 shadow-soft md:p-8"
    >
      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="name">Full name *</label>
          <input id="name" name="name" required className={field} placeholder="Your name" />
        </div>
        <div>
          <label className={label} htmlFor="phone">Phone *</label>
          <input id="phone" name="phone" required className={field} placeholder="+91 …" />
        </div>
      </div>
      <div className="mt-5">
        <label className={label} htmlFor="email">Email</label>
        <input id="email" name="email" type="email" className={field} placeholder="you@example.com" />
      </div>
      <div className="mt-5">
        <label className={label} htmlFor="subject">Subject</label>
        <input id="subject" name="subject" className={field} placeholder="How can we help?" />
      </div>
      <div className="mt-5">
        <label className={label} htmlFor="message">Message *</label>
        <textarea id="message" name="message" required rows={5} className={field} placeholder="Write your message…" />
      </div>

      {status === "error" && (
        <p className="mt-4 rounded-xl bg-danger/10 px-4 py-3 text-sm text-danger">{error}</p>
      )}

      <Button type="submit" size="lg" className="mt-6 w-full" disabled={status === "loading"}>
        {status === "loading" ? (
          <><Loader2 className="h-5 w-5 animate-spin" /> Sending…</>
        ) : (
          <><Send className="h-5 w-5" /> Send Message</>
        )}
      </Button>
    </form>
  );
}
