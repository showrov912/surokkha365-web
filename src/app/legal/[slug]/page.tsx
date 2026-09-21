"use client";
import React from "react";
import { useLanguage } from "../../../components/LanguageContext";
import { useWebsiteData } from "../../../context/WebsiteContext";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Header from "../../../components/Header";
import PricingOffer from "../../../components/PricingOffer";
import Footer from "../../../components/Footer";

export default function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { lang } = useLanguage();
  const { footerQuickLinks } = useWebsiteData();
  const { slug } = React.use(params);
  
  // Basic string formatting for the title
  const rawTitle = slug.split("-").map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  
  const currentLink = footerQuickLinks.find(l => l.url.includes(slug));
  const pageTitle = currentLink ? currentLink.text[lang as "en"|"bn"] : rawTitle;
  
  const content = {
    en: {
      back: "Back to Home",
      title: pageTitle,
      lastUpdated: "Last Updated: September 19, 2026",
      description: currentLink?.pageSubtitle?.en || `This is the official ${rawTitle} for Surokkha365.`,
      content: currentLink?.pageContent?.en || `Welcome to the ${rawTitle} of Surokkha365. 
      
      We are currently drafting the finalized legal documentation for this section to ensure compliance with local regulations and to protect both our customers and our business. 
      
      Please check back soon for the full text. If you have any immediate legal inquiries or need clarification on our terms of service, please contact us at contact@surokkha365.com.
      
      Thank you for choosing Surokkha365.`
    },
    bn: {
      back: "হোমে ফিরে যান",
      title: pageTitle,
      lastUpdated: "সর্বশেষ আপডেট: ১৯ সেপ্টেম্বর, ২০২৬",
      description: currentLink?.pageSubtitle?.bn || `এটি সুরক্ষা৩৬৫ এর অফিসিয়াল ${rawTitle}।`,
      content: currentLink?.pageContent?.bn || `সুরক্ষা৩৬৫ এর ${rawTitle} পৃষ্ঠায় স্বাগতম। 
      
      আমরা বর্তমানে এই বিভাগের জন্য চূড়ান্ত আইনি ডকুমেন্টেশন তৈরি করছি। স্থানীয় আইন মেনে চলা এবং আমাদের গ্রাহক ও ব্যবসা উভয়কে সুরক্ষিত করার জন্যই এই পদক্ষেপ।
      
      সম্পূর্ণ টেক্সটের জন্য অনুগ্রহ করে শীঘ্রই আবার চেক করুন। আপনার যদি কোনো তাৎক্ষণিক আইনি জিজ্ঞাসা থাকে অথবা আমাদের পরিষেবার শর্তাবলী সম্পর্কে ব্যাখ্যার প্রয়োজন হয়, তবে অনুগ্রহ করে contact@surokkha365.com এ আমাদের সাথে যোগাযোগ করুন।
      
      সুরক্ষা৩৬৫ বেছে নেওয়ার জন্য আপনাকে ধন্যবাদ।`
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
            <div style={{ display: "inline-block", padding: "6px 16px", backgroundColor: "var(--color-charcoal)", color: "white", borderRadius: "20px", fontSize: "14px", fontWeight: 600, marginBottom: "24px" }}>
              Legal Document
            </div>
            <h1 style={{ fontSize: "42px", fontWeight: 700, color: "var(--color-black)", margin: "0 0 8px" }}>
              {t.title}
            </h1>
            <p style={{ fontSize: "14px", color: "var(--color-orange)", marginBottom: "32px", fontWeight: 600 }}>
              {t.lastUpdated}
            </p>
            <div style={{ height: "1px", backgroundColor: "var(--color-line)", marginBottom: "32px" }}></div>
            
            <p style={{ fontSize: "18px", color: "var(--color-black)", marginBottom: "24px", fontWeight: 600 }}>
              {t.description}
            </p>
            
            <div style={{ fontSize: "16px", lineHeight: "1.8", color: "var(--color-charcoal)", whiteSpace: "pre-wrap" }}>
              {t.content}
            </div>
          </div>
        </div>
      </div>
      </div>
      <PricingOffer />
      <Footer />
    </main>
  );
}
