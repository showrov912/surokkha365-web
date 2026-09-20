"use client";
import React from "react";
import { useLanguage } from "./LanguageContext";
import styles from "./WhyChooseUs.module.css";
import { Calculator, ShieldCheck, FileText, Baby } from "lucide-react";

export default function WhyChooseUs() {
  const { lang } = useLanguage();

  const content = {
    en: {
      badge: "Why Choose Surokkha365?",
      title: "The Compliance-Grade Choice",
      reasons: [
        { icon: Calculator, title: "Fixed Transparent Pricing" },
        { icon: ShieldCheck, title: "Verified Technicians" },
        { icon: FileText, title: "Digital Audit Reports" },
        { icon: Baby, title: "Child & Pet Safe Methods" }
      ]
    },
    bn: {
      badge: "কেন সুরক্ষা৩৬৫ বেছে নিবেন?",
      title: "কমপ্লায়েন্স-গ্রেড পেস্ট কন্ট্রোল",
      reasons: [
        { icon: Calculator, title: "নির্ধারিত ও স্বচ্ছ মূল্য" },
        { icon: ShieldCheck, title: "ভেরিফাইড টেকনিশিয়ান" },
        { icon: FileText, title: "ডিজিটাল অডিট রিপোর্ট" },
        { icon: Baby, title: "শিশু ও পোষা প্রাণীর জন্য নিরাপদ" }
      ]
    }
  };

  const t = content[lang];

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
            {t.reasons.map((reason, index) => {
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
