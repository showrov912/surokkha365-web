"use client";
import React from "react";
import { useLanguage } from "./LanguageContext";
import { useWebsiteData } from "@/context/WebsiteContext";
import styles from "./Hero.module.css";
import { Calculator, CheckCircle2, ShieldCheck, FileText, Baby } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const { lang } = useLanguage();
  const { heroData } = useWebsiteData();

  const t = {
    en: {
      hook: heroData.headline.en,
      support: heroData.subheadline.en,
      trust: [
        { icon: Calculator, text: "Fixed Pricing" },
        { icon: ShieldCheck, text: "Verified Techs" },
        { icon: FileText, text: "Digital Reports" },
        { icon: Baby, text: "Child/Pet Safe" },
      ]
    },
    bn: {
      hook: heroData.headline.bn,
      support: heroData.subheadline.bn,
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
      <div className={styles.bgImage}>
        <Image src={heroData.bgImage} alt="Hero Background" fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
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
