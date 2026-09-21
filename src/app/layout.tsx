import type { Metadata } from "next";
import { Montserrat, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { WebsiteProvider } from "@/context/WebsiteContext";
import { JourneyProvider } from "@/context/JourneyContext";
import { LanguageProvider } from "@/components/LanguageContext";
import SEOClientUpdater from "@/components/SEOClientUpdater";
import WhatsAppWidget from "@/components/WhatsAppWidget";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
  variable: "--font-en",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
  variable: "--font-bn",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Surokkha365 Pest Control Dhaka",
    default: "Surokkha365 | Professional Pest Control Services in Dhaka",
  },
  description: "Evidence-based pest control in Dhaka & Bangladesh. Transparent per-sq-ft pricing. Specialized in termite, cockroach, and rodent eradication. Audit-ready reports.",
  icons: {
    icon: '/orange-favicon.svg',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Default language is English. 
  // We'll manage the language toggle via context in a client wrapper later.
  return (
    <html lang="en" className={`${montserrat.variable} ${hindSiliguri.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <JourneyProvider>
          <WebsiteProvider>
            <LanguageProvider>
              <SEOClientUpdater />
              {children}
              <WhatsAppWidget />
            </LanguageProvider>
          </WebsiteProvider>
        </JourneyProvider>
      </body>
    </html>
  );
}
