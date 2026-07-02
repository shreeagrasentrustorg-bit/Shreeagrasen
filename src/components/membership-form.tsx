"use client";

import { useState } from "react";
import { Loader2, Send, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const field =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30";
const label = "mb-1.5 block text-sm font-medium text-ink";

export function MembershipForm({ defaultEmail }: { defaultEmail?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/membership", {
        method: "POST",
        body: new FormData(e.currentTarget),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      window.location.reload(); // show submitted status
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-line bg-white p-6 shadow-card md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="full_name">Full name *</label>
          <input id="full_name" name="full_name" required className={field} placeholder="Your full name" />
        </div>
        <div>
          <label className={label} htmlFor="father_name">Father&apos;s / Husband&apos;s name</label>
          <input id="father_name" name="father_name" className={field} placeholder="Name" />
        </div>
        <div>
          <label className={label} htmlFor="phone">Phone *</label>
          <input id="phone" name="phone" required className={field} placeholder="+91 …" />
        </div>
        <div>
          <label className={label} htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" required defaultValue={defaultEmail} className={field} placeholder="you@example.com" />
        </div>
        <div>
          <label className={label} htmlFor="gotra">Gotra</label>
          <input id="gotra" name="gotra" className={field} placeholder="e.g. Garg, Bansal…" />
        </div>
        <div>
          <label className={label} htmlFor="occupation">Occupation</label>
          <input id="occupation" name="occupation" className={field} placeholder="Business / Service / …" />
        </div>
        <div>
          <label className={label} htmlFor="dob">Date of birth</label>
          <input id="dob" name="dob" type="date" className={field} />
        </div>
        <div>
          <label className={label} htmlFor="family_count">Family members</label>
          <input id="family_count" name="family_count" type="number" min={1} className={field} placeholder="e.g. 4" />
        </div>
      </div>

      <div className="mt-5">
        <label className={label} htmlFor="address">Residential address *</label>
        <textarea id="address" name="address" required rows={3} className={field} placeholder="Full address" />
      </div>

      <div className="mt-5">
        <label className={label} htmlFor="document">ID proof (Aadhaar / PAN) — optional</label>
        <label htmlFor="document" className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-line bg-surface px-4 py-4 text-sm text-muted transition-colors hover:border-brand-500 hover:bg-brand-50">
          <Upload className="h-5 w-5 text-brand-600" />
          <span>{fileName || "Click to upload (PDF, JPG, PNG · max 5 MB)"}</span>
        </label>
        <input id="document" name="document" type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")} />
      </div>

      {status === "error" && (
        <p className="mt-4 rounded-xl bg-danger/10 px-4 py-3 text-sm text-danger">{error}</p>
      )}

      <Button type="submit" size="lg" className="mt-6 w-full" disabled={status === "loading"}>
        {status === "loading" ? <><Loader2 className="h-5 w-5 animate-spin" /> Submitting…</> : <><Send className="h-5 w-5" /> Submit Application</>}
      </Button>
    </form>
  );
}
