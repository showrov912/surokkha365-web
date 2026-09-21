"use client";
import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "./LanguageContext";
import { useWebsiteData } from "@/context/WebsiteContext";
import styles from "./ProblemBlock.module.css";
import Image from "next/image";

const enToBn: Record<string, string> = { '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯' };
const bnToEn: Record<string, string> = { '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4', '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9' };

function AnimatedCounter({ value }: { value: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Convert Bengali numbers to English for parsing
  const englishValue = value.replace(/[০-৯]/g, match => bnToEn[match]);
  const numStrMatch = englishValue.match(/\d+/);
  const numericPart = numStrMatch ? parseInt(numStrMatch[0]) : 0;
  
  // Get prefix/suffix (e.g. 100% -> suffix '%', 24/7 -> prefix '', suffix '/7')
  const prefix = numStrMatch ? englishValue.substring(0, numStrMatch.index) : '';
  const suffix = numStrMatch ? englishValue.substring(numStrMatch.index! + numStrMatch[0].length) : englishValue;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated || numericPart === 0) return;
    
    let start = 0;
    const duration = 2000;
    const increment = numericPart / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericPart) {
        setCount(numericPart);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [hasAnimated, numericPart]);

  const displayCount = hasAnimated ? count : 0;
  
  // Re-convert to Bengali if original value had Bengali numerals
  const isBengali = /[০-৯]/.test(value);
  let finalString = `${prefix}${numericPart === 0 ? englishValue : displayCount}${suffix}`;
  
  if (isBengali) {
    finalString = finalString.replace(/\d/g, match => enToBn[match]);
  } else {
    // Edge case if 0 and hasn't animated, keep original
    if (numericPart === 0) finalString = value;
  }

  return <span ref={ref}>{finalString}</span>;
}

export default function ProblemBlock() {
  const { lang } = useLanguage();
  const { problemData } = useWebsiteData();
  const [audience, setAudience] = useState<"homes" | "facilities">("facilities");

  const content = {
    en: {
      badge: "The Problem",
      title: problemData.title.en,
      facilitiesText: problemData.desc.en,
      homesText: "Homeowners face a trust gap. Unverified technicians enter personal spaces without accountability or guaranteed results.",
      stats: [
        { value: "100%", label: "Audit-Ready" },
        { value: "365", label: "Days Protected" },
        { value: "0", label: "Hidden Fees" },
        { value: "24/7", label: "Support" }
      ],
      toggleFacilities: "For Facilities",
      toggleHomes: "For Homes"
    },
    bn: {
      badge: "সমস্যা",
      title: problemData.title.bn,
      facilitiesText: problemData.desc.bn,
      homesText: "বাসাবাড়ির ক্ষেত্রে আস্থার অভাব রয়েছে। অদক্ষ ও অপরিচিত টেকনিশিয়ানরা কোনো জবাবদিহিতা ছাড়াই কাজ করে।",
      stats: [
        { value: "১০০%", label: "অডিট-রেডি" },
        { value: "৩৬৫", label: "দিনের সুরক্ষা" },
        { value: "০", label: "লুকানো চার্জ" },
        { value: "২৪/৭", label: "সাপোর্ট" }
      ],
      toggleFacilities: "ফ্যাসিলিটিজ এর জন্য",
      toggleHomes: "বাসাবাড়ির জন্য"
    }
  };

  const t = content[lang];

  return (
    <section className={styles.section}>
      <div className="grid-container">
        <div className={styles.contentWrapper}>
          <div className={styles.grid}>
            {/* Left Graphic */}
            <div className={styles.graphicContent}>
              <div className={styles.pillBackground}>
                {/* Floating Bug Top Right */}
                <div className={styles.floatingBugTop}>
                  <Image src="/pest3.jpg" alt="Cockroach eradication in Dhaka" fill style={{ objectFit: 'cover' }} sizes="70px" />
                </div>
                
                {/* Floating Bug Bottom Left */}
                <div className={styles.floatingBugBottom}>
                  <Image src="/pest4.jpg" alt="Mosquito control service Bangladesh" fill style={{ objectFit: 'cover' }} sizes="70px" />
                </div>

                <div className={styles.imageContainer}>
                  <Image 
                    src={problemData.image} 
                    alt="Commercial pest control audit-ready documentation"
                    fill
                    style={{ objectFit: 'cover', transform: 'scale(1.15)' }}
                    sizes="(max-width: 768px) 100vw, 450px"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Right Content */}
          <div className={styles.textContent}>
            <div className={styles.badge}>
              <span className={styles.dot}></span>
              {t.badge}
            </div>
            
            <h2 className={styles.title}>{t.title}</h2>
            
            <div className={styles.toggleGroup}>
              <button 
                className={audience === "facilities" ? styles.toggleActive : styles.toggleBtn}
                onClick={() => setAudience("facilities")}
              >{t.toggleFacilities}</button>
              <button 
                className={audience === "homes" ? styles.toggleActive : styles.toggleBtn}
                onClick={() => setAudience("homes")}
              >{t.toggleHomes}</button>
            </div>

            <p className={styles.desc}>
              {audience === "facilities" ? t.facilitiesText : t.homesText}
            </p>

            <div className={styles.statsGrid}>
              {t.stats.map((stat, index) => (
                <div key={index} className={styles.statItem}>
                  <div className={styles.statValue}>
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>

          </div>
        </div>

        </div>
      </div>
    </section>
  );
}
