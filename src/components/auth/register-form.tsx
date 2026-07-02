"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, UserPlus, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { AuthShell, authField, authLabel } from "./auth-shell";

export function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verify, setVerify] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const supabase = createClient();
    if (!supabase) {
      setError("Registration is not configured yet. Please set Supabase env vars.");
      return;
    }
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const { data: res, error } = await supabase.auth.signUp({
      email: String(data.get("email")),
      password: String(data.get("password")),
      options: { data: { full_name: String(data.get("full_name")) } },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    if (res.session) {
      window.location.assign("/member"); // auto-confirmed
    } else {
      setVerify(true); // email confirmation required
      setLoading(false);
    }
  }

  if (verify) {
    return (
      <AuthShell title="Almost there!" subtitle="Confirm your email to continue." footer={<Link href="/login" className="font-semibold text-brand-700">Back to sign in</Link>}>
        <div className="flex flex-col items-center py-4 text-center">
          <CheckCircle2 className="h-14 w-14 text-accent-600" />
          <p className="mt-4 text-body">
            We&apos;ve sent a confirmation link to your email. Please verify, then
            sign in to complete your membership application.
          </p>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Create account"
      subtitle="Register to apply for membership & track your status."
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
