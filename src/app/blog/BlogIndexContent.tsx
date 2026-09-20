"use client";
import React from "react";
import { useLanguage } from "../../components/LanguageContext";
import { useWebsiteData } from "../../context/WebsiteContext";
import Link from "next/link";
import { ArrowLeft, Search, Clock, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function BlogIndexContent() {
  const { lang } = useLanguage();
  const { blogsData } = useWebsiteData();
  
  const content = {
    en: {
      back: "Back to Home",
      title: "Pest Control Blog",
      subtitle: "Insights, tips, and news from the Surokkha365 experts.",
      readMore: "Read Article",
      search: "Search articles..."
    },
    bn: {
      back: "হোমে ফিরে যান",
      title: "পেস্ট কন্ট্রোল ব্লগ",
      subtitle: "সুরক্ষা৩৬৫ বিশেষজ্ঞদের কাছ থেকে টিপস, খবর এবং ইনসাইট।",
      readMore: "আর্টিকেল পড়ুন",
      search: "আর্টিকেল খুঁজুন..."
    }
  };

  const t = content[lang as keyof typeof content] || content.en;

  return (
    <div style={{ minHeight: "80vh", padding: "120px 0 80px", backgroundColor: "#f8fafc" }}>
      <div className="grid-container">
        <div style={{ gridColumn: "1 / -1", maxWidth: "1000px", margin: "0 auto", width: "100%" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--color-charcoal)", marginBottom: "32px", fontWeight: 600 }}>
            <ArrowLeft size={20} />
            {t.back}
          </Link>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px", flexWrap: "wrap", gap: "24px" }}>
            <div>
              <h1 style={{ fontSize: "42px", fontWeight: 700, color: "var(--color-black)", margin: "0 0 8px" }}>
                {t.title}
              </h1>
              <p style={{ fontSize: "18px", color: "var(--color-charcoal)" }}>
                {t.subtitle}
              </p>
            </div>
            
            <div style={{ position: "relative", width: "100%", maxWidth: "300px" }}>
              <Search size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-charcoal)" }} />
              <input type="text" placeholder={t.search} style={{ width: "100%", padding: "12px 16px 12px 40px", border: "1px solid var(--color-line)", borderRadius: "24px", fontSize: "15px", outline: "none" }} />
            </div>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "32px" }}>
            {blogsData.map((article, idx) => {
              const langKey = lang as 'en' | 'bn';
              return (
                <div key={article.id} style={{ backgroundColor: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column" }}>
                  <div style={{ position: "relative", height: "200px", width: "100%" }}>
                    <Image src={article.image} alt={article.title[langKey]} fill style={{ objectFit: "cover" }} />
                    <div style={{ position: "absolute", top: "16px", left: "16px", backgroundColor: "white", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, color: "var(--color-orange)", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                      {article.category[langKey]}
                    </div>
                  </div>
                  
                  <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--color-charcoal)", fontSize: "13px", marginBottom: "12px", fontWeight: 500 }}>
                      <Clock size={14} />
                      {article.date[langKey]}
                    </div>
                    
                    <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--color-black)", marginBottom: "12px", lineHeight: "1.4" }}>
                      {article.title[langKey]}
                    </h3>
                    
                    <p style={{ fontSize: "14px", color: "var(--color-charcoal)", lineHeight: "1.6", marginBottom: "24px", flex: 1 }}>
                      {article.excerpt[langKey]}
                    </p>
                    
                    <Link href={`/blog/${article.id}`} style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "var(--color-orange)", fontWeight: 700, fontSize: "15px" }}>
                      {t.readMore} <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          
        </div>
      </div>
    </div>
  );
}
