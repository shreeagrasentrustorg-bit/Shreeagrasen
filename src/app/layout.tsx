import type { Metadata } from "next";
import { Inter, Poppins, Playfair_Display, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { BackToTop } from "@/components/back-to-top";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});
// Regal serif for display headings — gives the trust a dignified, traditional feel.
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
});
const noto = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-deva",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shreeagrasentrust.org"),
  title: {
    default: `${site.nameFull} | Agrasen Bhawan, Pune`,
    template: `%s | ${site.name}`,
  },
  description:
    "Shree Agrasen Trust, Chinchwad–Pradhikaran — serving the Agrawal community of PCMC since 1981. Hall & room booking, health services, cultural programs and events at Shree Agrasen Bhawan, Chinchwad, Pune.",
  keywords: [
    "Shree Agrasen Trust",
    "Agrasen Bhawan Chinchwad",
    "hall booking Chinchwad Pradhikaran",
    "banquet hall Chinchwad Pune",
    "Agrawal Samaj Pune",
    "Agrasen Trust Pune",
  ],
  openGraph: {
    title: `${site.nameFull} | Agrasen Bhawan, Pune`,
    description:
      "Serving the Agrawal community of PCMC since 1981 — hall booking, health services, cultural programs and events.",
    type: "website",
    locale: "en_IN",
    siteName: site.name,
  },
  icons: { icon: "/images/logo/logo.jpg", apple: "/images/logo/logo.jpg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: site.nameFull,
    foundingDate: "1981-10-12",
    url: "https://shreeagrasentrust.org",
    email: site.email,
    telephone: site.phones[0],
    sameAs: [site.facebook, site.youtube],
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: site.address.city,
      postalCode: site.address.pin,
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${playfair.variable} ${noto.variable}`}
    >
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFab />
        <BackToTop />
      </body>
    </html>
  );
}
