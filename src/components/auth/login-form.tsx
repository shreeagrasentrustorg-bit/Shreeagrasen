"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Loader2, LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { AuthShell, authField, authLabel } from "./auth-shell";

export function LoginForm() {
  const params = useSearchParams();
  const next = params.get("next") || "/admin";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const supabase = createClient();
    if (!supabase) {
      setError("Login is not configured yet. Please set Supabase env vars.");
      return;
    }
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const { error } = await supabase.auth.signInWithPassword({
      email: String(data.get("email")),
      password: String(data.get("password")),
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    // Full reload so middleware routes admin→/admin, member→/member.
    window.location.assign(next);
  }

  return (
    <AuthShell
      title="Sign in"
      subtitle="Members & committee — access your account."
      footer={
        <>
          New member?{" "}
          <Link href="/register" className="font-semibold text-brand-700">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className={authLabel} htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required className={authField} placeholder="you@example.com" />
        </div>
        <div>
          <label className={authLabel} htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required className={authField} placeholder="••••••••" />
        </div>
        {error && (
          <p className="rounded-xl bg-danger/10 px-4 py-3 text-sm text-danger">{error}</p>
        )}
        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? <><Loader2 className="h-5 w-5 animate-spin" /> Signing in…</> : <><LogIn className="h-5 w-5" /> Sign in</>}
        </Button>
      </form>
    </AuthShell>
  );
}
