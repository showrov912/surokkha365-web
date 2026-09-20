"use client";
import React from "react";
import { useLanguage } from "./LanguageContext";
import styles from "./SolutionPillars.module.css";
import { Calculator, ShieldCheck, FileText, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useWebsiteData } from "@/context/WebsiteContext";

export default function SolutionPillars() {
  const { lang } = useLanguage();
  const { differencesData } = useWebsiteData();

  const iconMap = [Calculator, ShieldCheck, FileText, CheckCircle2];

  const content = {
    en: {
      badge: "Our Difference",
      title: "Your Trusted Partner In Pest Control",
      subtitle: "See the exact method, exact chemical, and exact price before you commit.",
      features: differencesData.map((d, index) => ({
        icon: iconMap[index % iconMap.length],
        title: d.title,
        desc: d.desc
      }))
    },
    bn: {
      badge: "আমাদের বিশেষত্ব",
      title: "পেস্ট কন্ট্রোলে আপনার বিশ্বস্ত পার্টনার",
      subtitle: "বুক করার আগেই সঠিক পদ্ধতি, কেমিক্যাল এবং মূল্য জেনে নিন।",
      features: [
        { icon: Calculator, title: "স্বচ্ছ মূল্য তালিকা", desc: "কোনো লুকানো চার্জ নেই।" },
        { icon: ShieldCheck, title: "ভেরিফাইড টেকনিশিয়ান", desc: "যাচাইকৃত প্রফেশনালস।" },
        { icon: FileText, title: "অডিট-রেডি রিপোর্ট", desc: "ডিজিটাল কমপ্লায়েন্স লগ।" },
        { icon: CheckCircle2, title: "ফলাফলের গ্যারান্টি", desc: "ওয়ারেন্টির অন্তর্ভুক্ত ফলো-আপ।" }
      ]
    }
  };

  const t = content[lang];

  return (
    <section className={styles.section}>
      <div className="grid-container">
        
        <div className={styles.contentWrapper}>
          <div className={styles.grid}>
          {/* Left Content */}
          <div className={styles.textContent}>
            <div className={styles.badge}>
              <span className={styles.dot}></span>
              {t.badge}
            </div>
            <h2 className={styles.title}>{t.title}</h2>
            <p className={styles.subtitle}>{t.subtitle}</p>

            <div className={styles.featureGrid}>
              {t.features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className={styles.featureItem}>
                    <div className={styles.iconBox}>
                      <Icon size={24} color="var(--color-white)" />
                    </div>
                    <div className={styles.featureText}>
                      <h4>{feature.title}</h4>
                      <p>{feature.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Image */}
          <div className={styles.imageContent}>
            {/* Using a placeholder for the technicians image */}
            <div className={styles.imagePlaceholder}>
              <Image 
                src="/technicians.jpg" 
                alt="Our Pest Control Technicians"
                fill
                style={{ objectFit: 'cover', borderRadius: '24px' }}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className={styles.shieldOverlay}>
                <ShieldCheck size={48} color="white" />
              </div>
            </div>
          </div>
          </div>
        </div>

      </div>
    </section>
  );
}
