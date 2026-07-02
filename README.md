# Shree Agrasen Trust — Website

Modern, responsive website for **Shree Agrasen Trust, Chinchwad–Pradhikaran**
built with **Next.js (App Router)** + **Supabase** + **Tailwind CSS v4**.

- Light theme, modern UI, subtle animations (Framer Motion), Lucide SVG icons.
- Real content: history, committee, health services, gallery, events, donation.
- **Booking system:** form → saves to Supabase DB, uploads ID document to a
  private Supabase Storage bucket, and emails both the trust and the applicant.
- Bilingual-ready (English + Marathi via Noto Sans Devanagari).

## Tech stack
| Layer | Tech |
|-------|------|
| Frontend + Backend | Next.js 16 (App Router, Route Handlers) |
| Styling | Tailwind CSS v4 |
| Icons | lucide-react |
| Animation | framer-motion |
| Database + Storage | Supabase |
| Email | Resend |
| Hosting | Vercel (recommended) or any Node host |

## 1. Install
```bash
pnpm install     # or npm install
```

## 2. Environment
```bash
cp .env.example .env.local
```
Fill in:
- **Supabase** → Project Settings → API: `NEXT_PUBLIC_SUPABASE_URL`,
  `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
- **Resend** → https://resend.com (free): `RESEND_API_KEY`, `EMAIL_FROM`,
  `OWNER_EMAIL`.

> The site builds and runs even without these — forms just won't persist/email
> until the vars are set.

## 3. Supabase setup
1. Create a free project at https://supabase.com.
2. Open **SQL Editor** and run the contents of [`supabase/schema.sql`](supabase/schema.sql).
   This creates the `bookings` + `contact_messages` tables and the private
   `booking-documents` storage bucket (with RLS enabled).
3. Copy the API keys into `.env.local`.

## 3b. Auth, Admin & Membership
The site includes **Supabase Auth** with two roles:

**Members**
- Register at `/register`, sign in at `/login`.
- Apply for membership at `/member` (saves to `membership_applications`, optional
  Aadhaar/PAN upload to the private `member-documents` bucket).
- Track their application status from `/member`.

**Admin (the trust)**
- Add each admin's email to `ADMIN_EMAILS` (comma-separated) **and** create that
  user in Supabase → **Authentication → Users → Add user** (set a password).
- Sign in at `/login` → you're taken to `/admin`.
- `/admin` dashboard lists all **bookings**, **contact enquiries** and
  **membership applications**, lets you change their status, and opens uploaded
  documents via secure 30-minute signed links.
- Route protection is enforced in `src/middleware.ts` (non-admins are bounced to
  `/member`, logged-out users to `/login`).

> If Supabase email confirmation is ON, new members must confirm their email
> before signing in (Supabase → Authentication → Providers → Email).

## 4. Run
```bash
pnpm dev         # http://localhost:3000
pnpm build       # production build
pnpm start       # run production build
```

## 5. Deploy (Vercel — free)
1. Push this folder to GitHub.
2. Import the repo at https://vercel.com/new.
3. Add the same env vars in **Project → Settings → Environment Variables**.
4. Deploy. Point `shreeagrasentrust.org` DNS to Vercel (auto HTTPS).

## How the booking flow works
1. User fills the form at `/booking` (can attach Aadhaar/PAN — optional).
2. `POST /api/booking` (server):
   - uploads the document to the **private** `booking-documents` bucket,
   - inserts the booking into the `bookings` table,
   - emails the **trust** (with a 30-day signed link to the document) and a
     **confirmation** to the applicant (via Resend).
3. Manage bookings in the Supabase dashboard (or build an admin panel later).

## Project structure
```
src/
  app/
    page.tsx            Home
    about/ committee/ services/ gallery/ events/ contact/ donate/ booking/
    events/[slug]/      Event detail
    api/booking/        Booking handler (DB + storage + email)
    api/contact/        Contact handler (DB + email)
    sitemap.ts robots.ts
  components/            Header, Footer, UI, forms, gallery, reveal
  lib/
    site.ts             All real site content (edit here)
    supabase.ts email.ts utils.ts
supabase/schema.sql     Run once in Supabase
public/images/          Real photos (gallery, committee, about, services)
```

## Editing content
Most text lives in [`src/lib/site.ts`](src/lib/site.ts) — committee, chairmen,
services, events, contact & bank details. Update there and redeploy.

## Notes / to-do for the trust
- Replace committee/gallery photos with high-res originals.
- Add the trust's UPI QR image on the Donate page.
- Confirm the WhatsApp number in `site.whatsapp`.
- Verify a sending domain in Resend for branded emails.
