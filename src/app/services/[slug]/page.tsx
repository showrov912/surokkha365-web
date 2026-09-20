"use client";
import React from "react";
import { useLanguage } from "../../../components/LanguageContext";
import { useWebsiteData } from "../../../context/WebsiteContext";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Header from "../../../components/Header";
import PricingOffer from "../../../components/PricingOffer";
import Footer from "../../../components/Footer";

export default function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { lang } = useLanguage();
  const { servicesData, footerServices } = useWebsiteData();
  const { slug } = React.use(params);
  
  // Basic string formatting for the title fallback
  const rawTitle = slug.split("-").map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  
  const currentService = servicesData.find(s => s.slug === slug);
  const currentFooterService = footerServices.find(l => l.url.includes(slug));
  const serviceTitle = currentFooterService?.text || currentService?.title || rawTitle;
  
  const content = {
    en: {
      back: "Back to Home",
      title: serviceTitle,
      subtitle: currentFooterService?.pageSubtitleEn || currentService?.pageSubtitleEn || `Professional ${rawTitle} services by Surokkha365.`,
      description: currentFooterService?.pageContentEn || currentService?.pageContentEn || "We are currently updating our detailed service documentation. Please check back soon or contact us directly to book this service.",
      bookNow: "Book Now"
    },
    bn: {
      back: "হোমে ফিরে যান",
      title: serviceTitle, 
      subtitle: currentFooterService?.pageSubtitleBn || currentService?.pageSubtitleBn || `সুরক্ষা৩৬৫ এর প্রফেশনাল ${rawTitle} সার্ভিস।`,
      description: currentFooterService?.pageContentBn || currentService?.pageContentBn || "আমরা বর্তমানে আমাদের বিস্তারিত সার্ভিস ডকুমেন্টেশন আপডেট করছি। অনুগ্রহ করে শীঘ্রই আবার চেক করুন অথবা সরাসরি বুক করতে আমাদের সাথে যোগাযোগ করুন।",
      bookNow: "বুক করুন"
    }
  };

  const t = content[lang as keyof typeof content] || content.en;

  return (
    <main>
      <Header />
      <div style={{ minHeight: "60vh", padding: "120px 0 80px", backgroundColor: "#f8fafc" }}>
        <div className="grid-container">
          <div style={{ gridColumn: "1 / -1", maxWidth: "800px", margin: "0 auto", width: "100%" }}>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--color-charcoal)", marginBottom: "32px", fontWeight: 600 }}>
              <ArrowLeft size={20} />
              {t.back}
            </Link>
            
            <div style={{ backgroundColor: "white", padding: "48px", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "inline-block", padding: "6px 16px", backgroundColor: "var(--color-orange)", color: "white", borderRadius: "20px", fontSize: "14px", fontWeight: 600, marginBottom: "24px" }}>
                Service
              </div>
              <h1 style={{ fontSize: "42px", fontWeight: 700, color: "var(--color-black)", margin: "0 0 16px" }}>
                {t.title}
              </h1>
              <p style={{ fontSize: "20px", color: "var(--color-charcoal)", marginBottom: "32px", fontWeight: 500 }}>
                {t.subtitle}
              </p>
              <div style={{ height: "1px", backgroundColor: "var(--color-line)", marginBottom: "32px" }}></div>
              <p style={{ fontSize: "16px", lineHeight: "1.8", color: "var(--color-charcoal)", marginBottom: "48px" }}>
                {t.description}
              </p>
              
              <Link href="/" style={{ display: "inline-block", backgroundColor: "var(--color-orange)", color: "white", padding: "16px 32px", borderRadius: "8px", fontWeight: 700, textTransform: "uppercase" }}>
                {t.bookNow}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <PricingOffer />
      <Footer />
    </main>
  );
}
