"use client";
import React from "react";
import { useLanguage } from "../../components/LanguageContext";
import Link from "next/link";
import { CheckCircle, Home, LayoutDashboard } from "lucide-react";

export default function BookingSuccessPage() {
  const { lang } = useLanguage();
  
  // Generate a mock booking reference
  const referenceId = "SRK-" + Math.floor(100000 + Math.random() * 900000);
  
  const content = {
    en: {
      title: "Booking Confirmed!",
      subtitle: "Thank you for choosing Surokkha365.",
      reference: "Your Booking Reference:",
      nextSteps: "What happens next?",
      steps: [
        "One of our expert technicians will review your request.",
        "We will call you within 30 minutes to confirm the exact time and date.",
        "Our team arrives and ensures your premise is pest-free safely."
      ],
      homeBtn: "Return Home",
      dashBtn: "Go to Dashboard"
    },
    bn: {
      title: "বুকিং কনফার্ম হয়েছে!",
      subtitle: "সুরক্ষা৩৬৫ বেছে নেওয়ার জন্য ধন্যবাদ।",
      reference: "আপনার বুকিং রেফারেন্স:",
      nextSteps: "এরপর কী হবে?",
      steps: [
        "আমাদের একজন বিশেষজ্ঞ টেকনিশিয়ান আপনার রিকোয়েস্ট রিভিউ করবেন।",
        "আমরা ৩০ মিনিটের মধ্যে আপনাকে কল করে সময় এবং তারিখ কনফার্ম করব।",
        "আমাদের টিম পৌঁছে আপনার স্থানকে নিরাপদে পেস্ট-মুক্ত করবে।"
      ],
      homeBtn: "হোমে ফিরে যান",
      dashBtn: "ড্যাশবোর্ডে যান"
    }
  };

  const t = content[lang as keyof typeof content] || content.en;

  return (
    <div style={{ minHeight: "80vh", padding: "120px 0 80px", backgroundColor: "#f8fafc", display: "flex", flexDirection: "column" }}>
      <div className="grid-container" style={{ flex: 1 }}>
        <div style={{ gridColumn: "1 / -1", maxWidth: "600px", margin: "0 auto", width: "100%" }}>
          
          <div style={{ backgroundColor: "white", padding: "48px", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", textAlign: "center" }}>
            
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
              <div style={{ width: "80px", height: "80px", backgroundColor: "rgba(0, 200, 0, 0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "green" }}>
                <CheckCircle size={40} />
              </div>
            </div>
            
            <h1 style={{ fontSize: "36px", fontWeight: 700, color: "var(--color-black)", margin: "0 0 12px" }}>
              {t.title}
            </h1>
            <p style={{ fontSize: "18px", color: "var(--color-charcoal)", marginBottom: "32px" }}>
              {t.subtitle}
            </p>
            
            <div style={{ backgroundColor: "#f8fafc", padding: "24px", borderRadius: "8px", marginBottom: "32px", border: "1px dashed var(--color-line)" }}>
              <div style={{ fontSize: "14px", color: "var(--color-charcoal)", fontWeight: 600, marginBottom: "8px" }}>{t.reference}</div>
              <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-orange)", letterSpacing: "2px" }}>{referenceId}</div>
            </div>
            
            <div style={{ textAlign: "left", marginBottom: "40px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-black)", marginBottom: "16px" }}>{t.nextSteps}</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {t.steps.map((step, idx) => (
                  <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <div style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "var(--color-orange)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, flexShrink: 0 }}>
                      {idx + 1}
                    </div>
                    <span style={{ fontSize: "15px", color: "var(--color-charcoal)", lineHeight: "1.6" }}>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 24px", backgroundColor: "white", border: "2px solid var(--color-line)", borderRadius: "8px", color: "var(--color-black)", fontWeight: 700, textDecoration: "none" }}>
                <Home size={18} /> {t.homeBtn}
              </Link>
              <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 24px", backgroundColor: "var(--color-black)", border: "2px solid var(--color-black)", borderRadius: "8px", color: "white", fontWeight: 700, textDecoration: "none" }}>
                <LayoutDashboard size={18} /> {t.dashBtn}
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
