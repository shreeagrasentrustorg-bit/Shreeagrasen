import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  let res = NextResponse.next({ request: req });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  // Auth not configured yet → let requests through (pages handle the notice).
  if (!url || !key) return res;

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return req.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value));
        res = NextResponse.next({ request: req });
        cookiesToSet.forEach(({ name, value, options }) =>
          res.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const path = req.nextUrl.pathname;
  const isAdminArea = path.startsWith("/admin");
  const isMemberArea = path.startsWith("/member");

  if (!user && (isAdminArea || isMemberArea)) {
    const redirect = new URL("/login", req.url);
    redirect.searchParams.set("next", path);
    return NextResponse.redirect(redirect);
  }

  if (user && isAdminArea) {
    const admins = (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
    if (!admins.includes((user.email || "").toLowerCase())) {
      return NextResponse.redirect(new URL("/member", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*", "/member/:path*"],
};
