"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogIn, LogOut, LayoutDashboard, UserCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Me = { email: string | null; isAdmin: boolean };

export function AuthNav({ mobile = false }: { mobile?: boolean }) {
  const [me, setMe] = useState<Me | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/me")
      .then((r) => r.json())
      .then((d: Me) => active && setMe(d))
      .catch(() => active && setMe({ email: null, isAdmin: false }));
    return () => {
      active = false;
    };
  }, []);

  async function logout() {
    const supabase = createClient();
    await supabase?.auth.signOut();
    window.location.assign("/");
  }

  if (me === null) return null; // avoid flicker until known

  if (!me.email) {
    return (
      <Link
        href="/login"
        className={
          mobile
            ? "flex items-center justify-center gap-2 rounded-xl bg-surface px-3 py-3 text-sm font-semibold text-ink"
            : "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-body hover:text-brand-700"
        }
      >
        <LogIn className="h-4 w-4" /> Login
      </Link>
    );
  }

  const dashHref = me.isAdmin ? "/admin" : "/member";
  const dashLabel = me.isAdmin ? "Dashboard" : "My Account";
  const DashIcon = me.isAdmin ? LayoutDashboard : UserCircle;

  if (mobile) {
    return (
      <div className="grid grid-cols-2 gap-3">
        <Link href={dashHref} className="flex items-center justify-center gap-2 rounded-xl bg-surface px-3 py-3 text-sm font-semibold text-ink">
          <DashIcon className="h-4 w-4" /> {dashLabel}
        </Link>
        <button onClick={logout} className="flex items-center justify-center gap-2 rounded-xl bg-surface px-3 py-3 text-sm font-semibold text-ink">
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <Link href={dashHref} className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-body hover:text-brand-700">
        <DashIcon className="h-4 w-4" /> {dashLabel}
      </Link>
      <button onClick={logout} aria-label="Logout" className="grid h-9 w-9 place-items-center rounded-full text-body hover:bg-surface2 hover:text-brand-700">
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  );
}
