"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, UserPlus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { AuthShell, authField, authLabel } from "./auth-shell";

export function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email")).trim().toLowerCase();
    const password = String(data.get("password"));
    const full_name = String(data.get("full_name")).trim();

    // 1) Create the account server-side, already confirmed (no verification email).
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, full_name }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(json.error || "Could not create your account. Please try again.");
      setLoading(false);
      return;
    }

    // 2) Sign in immediately so they can fill their details right away.
    const supabase = createClient();
    if (!supabase) {
      setError("Account created, but sign-in is not configured. Please sign in manually.");
      setLoading(false);
      return;
    }
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      // Account exists — send them to the login page to sign in.
      window.location.assign("/login");
      return;
    }
    window.location.assign("/member");
  }

  return (
    <AuthShell
      title="Create account"
      subtitle="Register instantly — no email verification. Then apply for membership & track your status."
      footer={<>Already have an account?{" "}<Link href="/login" className="font-semibold text-brand-700">Sign in</Link></>}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className={authLabel} htmlFor="full_name">Full name</label>
          <input id="full_name" name="full_name" required className={authField} placeholder="Your full name" />
        </div>
        <div>
          <label className={authLabel} htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required className={authField} placeholder="you@example.com" />
        </div>
        <div>
          <label className={authLabel} htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required minLength={6} className={authField} placeholder="At least 6 characters" />
        </div>
        {error && <p className="rounded-xl bg-danger/10 px-4 py-3 text-sm text-danger">{error}</p>}
        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? <><Loader2 className="h-5 w-5 animate-spin" /> Creating…</> : <><UserPlus className="h-5 w-5" /> Create account</>}
        </Button>
      </form>
    </AuthShell>
  );
}
