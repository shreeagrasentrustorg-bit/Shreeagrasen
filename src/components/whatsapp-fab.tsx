import { MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

export function WhatsAppFab() {
  const msg = encodeURIComponent(
    "Hello Shree Agrasen Trust, I would like to know more."
  );
  return (
    <a
      href={`https://wa.me/${site.whatsapp}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift ring-2 ring-gold-400/70 transition-transform hover:scale-110 animate-pulse-gold"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30" />
    </a>
  );
}
