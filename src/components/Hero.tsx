"use client";
import React from "react";
import { useLanguage } from "./LanguageContext";
import { useWebsiteData } from "@/context/WebsiteContext";
import styles from "./Hero.module.css";
import { Calculator, CheckCircle2, ShieldCheck, FileText, Baby } from "lucide-react";

export default function Hero() {
  const { lang } = useLanguage();
  const { heroData } = useWebsiteData();

  const t = {
    en: {
      hook: heroData.headline,
      support: heroData.subheadline,
      trust: [
        { icon: Calculator, text: "Fixed Pricing" },
        { icon: ShieldCheck, text: "Verified Techs" },
        { icon: FileText, text: "Digital Reports" },
        { icon: Baby, text: "Child/Pet Safe" },
      ]
    },
    bn: {
      hook: "এক মিনিটে বুক করুন পেস্ট কন্ট্রোল, এবং পরে প্রমাণ পান।",
      support: "স্কয়ার ফিট প্রতি নির্ধারিত মূল্য। যাচাইকৃত টেকনিশিয়ান। প্রতিটি ভিজিটের পর অডিট-রেডি ডিজিটাল রিপোর্ট।",
      trust: [
        { icon: Calculator, text: "নির্ধারিত মূল্য" },
        { icon: ShieldCheck, text: "ভেরিফাইড টেকনিশিয়ান" },
        { icon: FileText, text: "ডিজিটাল রিপোর্ট" },
        { icon: Baby, text: "নিরাপদ পদ্ধতি" },
      ]
    }
  }[lang];

  return (
    <section className={styles.heroSection} data-lang={lang}>
      {/* Background Image / Overlay */}
      <div className={styles.bgImage} style={{ backgroundImage: `url(${heroData.bgImage})` }}>
        <div className={styles.bgOverlay} />
      </div>

      <div className={`grid-container ${styles.heroContent}`}>
        <div className={styles.textContent}>
          <div className={styles.badge}>
            <span className={styles.dot}></span>
            <span>Expert Pest Control</span>
          </div>
          <h1 className={styles.hook}>{t.hook}</h1>
          <p className={styles.support}>{t.support}</p>
        </div>
      </div>
    </section>
  );
}
