"use client";

import { useState } from "react";
import { CalendarCheck, CheckCircle2, Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { eventTypes, venues, propertyTypes, memberTypes } from "@/lib/site";

const field =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30";
const label = "mb-1.5 block text-sm font-medium text-ink";

export function BookingForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [eventType, setEventType] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = e.currentTarget;
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        body: new FormData(form), // multipart (includes file)
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("ok");
      form.reset();
      setFileName("");
      setEventType("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "ok") {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-line bg-white p-10 text-center shadow-card">
        <CheckCircle2 className="h-16 w-16 text-accent-600" />
        <h3 className="mt-4 font-head text-2xl font-bold text-ink">Booking request received!</h3>
        <p className="mt-2 max-w-md text-muted">
          Thank you. Our team will review your request and contact you shortly to
          confirm availability. A confirmation email has been sent to you.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setStatus("idle")}>
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-line bg-white p-6 shadow-card md:p-8"
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
        <div>
          <label className={label} htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" required className={field} placeholder="you@example.com" />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="address">Address</label>
          <input id="address" name="address" className={field} placeholder="Your address" />
        </div>
        <div>
          <label className={label} htmlFor="property_type">Property type *</label>
          <select id="property_type" name="property_type" required className={field} defaultValue="">
            <option value="" disabled>Select…</option>
            {propertyTypes.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="member_type">Member type *</label>
          <select id="member_type" name="member_type" required className={field} defaultValue="">
            <option value="" disabled>Select…</option>
            {memberTypes.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="check_in">Check-in date</label>
          <input id="check_in" name="check_in" type="date" className={field} />
        </div>
        <div>
          <label className={label} htmlFor="check_out">Check-out date</label>
          <input id="check_out" name="check_out" type="date" className={field} />
        </div>
        <div>
          <label className={label} htmlFor="rooms_required">No. of rooms required</label>
          <input id="rooms_required" name="rooms_required" type="number" min={0} defaultValue={1} className={field} placeholder="e.g. 2" />
        </div>
        <div>
          <label className={label} htmlFor="guests">Expected guests</label>
          <input id="guests" name="guests" type="number" min={1} className={field} placeholder="e.g. 300" />
        </div>
        <div>
          <label className={label} htmlFor="event_type">Event type *</label>
          <select
            id="event_type"
            name="event_type"
            required
            className={field}
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          >
            <option value="" disabled>Select…</option>
            {eventTypes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          {eventType === "Other" && (
            <input
              name="event_type_other"
              required
              className={`${field} mt-2`}
              placeholder="Please specify your event type"
            />
          )}
        </div>
        <div>
          <label className={label} htmlFor="venue">Venue *</label>
          <select id="venue" name="venue" required className={field} defaultValue="">
            <option value="" disabled>Select…</option>
            {venues.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="event_date">Preferred date *</label>
          <input id="event_date" name="event_date" type="date" required className={field} />
        </div>
        <div>
          <label className={label} htmlFor="alt_date">Alternate date</label>
          <input id="alt_date" name="alt_date" type="date" className={field} />
        </div>
      </div>

      <div className="mt-5">
        <label className={label} htmlFor="message">Message / special requirements</label>
        <textarea id="message" name="message" rows={4} className={field} placeholder="Tell us about your event…" />
      </div>

      {/* Document upload */}
      <div className="mt-5">
        <label className={label} htmlFor="document">
          ID document (Aadhaar / PAN) — optional
        </label>
        <label
          htmlFor="document"
          className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-line bg-surface px-4 py-4 text-sm text-muted transition-colors hover:border-brand-500 hover:bg-brand-50"
        >
          <Upload className="h-5 w-5 text-brand-600" />
          <span>{fileName || "Click to upload (PDF, JPG, PNG · max 5 MB)"}</span>
        </label>
        <input
          id="document"
          name="document"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
        />
      </div>

      {status === "error" && (
        <p className="mt-4 rounded-xl bg-danger/10 px-4 py-3 text-sm text-danger">{error}</p>
      )}

      <Button type="submit" size="lg" className="mt-6 w-full" disabled={status === "loading"}>
        {status === "loading" ? (
          <><Loader2 className="h-5 w-5 animate-spin" /> Submitting…</>
        ) : (
          <><CalendarCheck className="h-5 w-5" /> Submit Booking Request</>
        )}
      </Button>
      <p className="mt-3 text-center text-xs text-muted">
        This is an enquiry. Our team will confirm availability before your booking
        is final.
      </p>
    </form>
  );
}
