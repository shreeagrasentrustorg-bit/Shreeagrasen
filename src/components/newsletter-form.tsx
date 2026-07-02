"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

/** Compact email subscription form (footer). Posts to /api/newsletter. */
export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMsg("");
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.get("email") }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("ok");
      setMsg(json.already ? "You're already subscribed 🙏" : "Subscribed! Thank you 🙏");
    } catch (err) {
      setStatus("error");
      setMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "ok") {
    return (
      <p className="flex items-center gap-2 text-sm font-medium text-accent-700">
        <CheckCircle2 className="h-5 w-5" /> {msg}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-3">
      <div className="flex gap-2">
        <input
          type="email"
          name="email"
          required
          placeholder="Your email"
          className="gold-focus min-w-0 flex-1 rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink placeholder:text-muted"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          aria-label="Subscribe"
          className="btn-shine grid h-10 w-11 shrink-0 place-items-center rounded-xl bg-gold-gradient text-[#3d2600] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>
      </div>
      {status === "error" && <p className="mt-2 text-xs text-danger">{msg}</p>}
    </form>
  );
}
