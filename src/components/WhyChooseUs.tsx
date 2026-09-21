"use client";
import React from "react";
import { useLanguage } from "./LanguageContext";
import { useWebsiteData } from "@/context/WebsiteContext";
import styles from "./WhyChooseUs.module.css";
import { Calculator, ShieldCheck, FileText, Baby } from "lucide-react";

export default function WhyChooseUs() {
  const { lang } = useLanguage();
  const { differencesData } = useWebsiteData();

  const icons = [Calculator, ShieldCheck, FileText, Baby];

  const t = {
    en: {
      badge: "Why Choose Surokkha365?",
      title: "The Compliance-Grade Choice"
    },
    bn: {
      badge: "কেন সুরক্ষা৩৬৫ বেছে নিবেন?",
      title: "কমপ্লায়েন্স-গ্রেড পেস্ট কন্ট্রোল"
    }
  }[lang];

  const mappedReasons = differencesData.map((d, index) => ({
    icon: icons[index % icons.length],
    title: d.title[lang as 'en' | 'bn']
  }));

  return (
    <section className={styles.section}>
      <div className="grid-container">
        
        <div className={styles.contentWrapper}>
          <div className={styles.header}>
            <div className={styles.badge}>
              <span className={styles.dot}></span>
              {t.badge}
            </div>
            <h2 className={styles.title}>{t.title}</h2>
          </div>

          <div className={styles.iconGrid}>
            {mappedReasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <div key={index} className={styles.iconCard}>
                  <div className={styles.hexagonIcon}>
                    <Icon size={28} color="currentColor" />
                  </div>
                  <h3 className={styles.iconTitle}>{reason.title}</h3>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
