"use client";
import React from "react";
import { useLanguage } from "./LanguageContext";
import styles from "./FinalCTA.module.css";
import { Phone, ArrowRight, MapPin } from "lucide-react";

const WhatsAppIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

export default function FinalCTA() {
  const { lang } = useLanguage();

  const content = {
    en: {
      facilitiesTitle: "For Facilities",
      facilitiesBtn: "Request AMC Quote",
      homesTitle: "For Homes",
      homesBtn: "Get Instant Price",
      contact: "Or contact us directly:",
      safety: "Expertly protecting your space, 365 days a year.",
      coverageTitle: "Service Coverage",
      areas: ["Jashore", "Dhaka", "Gazipur", "Savar", "Narayanganj", "Chattogram"]
    },
    bn: {
      facilitiesTitle: "ফ্যাসিলিটিজ এর জন্য",
      facilitiesBtn: "AMC কোটেশন রিকোয়েস্ট",
      homesTitle: "বাসাবাড়ির জন্য",
      homesBtn: "ইনস্ট্যান্ট প্রাইস জানুন",
      contact: "অথবা সরাসরি যোগাযোগ করুন:",
      safety: "বছরের ৩৬৫ দিন আপনার স্পেসের বিশেষজ্ঞ সুরক্ষা।",
      coverageTitle: "সার্ভিস এরিয়া",
      areas: ["যশোর", "ঢাকা", "গাজীপুর", "সাভার", "নারায়ণগঞ্জ", "চট্টগ্রাম"]
    }
  };

  const t = content[lang];

  return (
    <section className={styles.ctaSection}>
      <div className="grid-container">
        
        <div className={styles.ctaGrid}>
          {/* Facilities CTA */}
          <div className={styles.ctaBlock}>
            <h2>{t.facilitiesTitle}</h2>
            <button className="btn-primary">{t.facilitiesBtn}</button>
            <div className={styles.contactGroup}>
              <span>{t.contact}</span>
              <div className={styles.contactActions}>
                <a href="tel:01403561168" className={styles.phoneLink}>
                  <Phone size={18} /> +880 1403-561168
                </a>
                <a href="https://wa.me/8801403561168" className={styles.waLink}>
                  <WhatsAppIcon size={18} /> WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Homes CTA */}
          <div className={styles.ctaBlock}>
            <h2>{t.homesTitle}</h2>
            <button className="btn-primary">{t.homesBtn}</button>
            <div className={styles.contactGroup}>
              <span>{t.contact}</span>
              <div className={styles.contactActions}>
                <a href="tel:01403561168" className={styles.phoneLink}>
                  <Phone size={18} /> +880 1403-561168
                </a>
                <a href="https://wa.me/8801403561168" className={styles.waLink}>
                  <WhatsAppIcon size={18} /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="hairline-divider" style={{ margin: "64px 0" }} />

        {/* Coverage Map Concept */}
        <div className={styles.coverageBlock}>
          <h3>{t.coverageTitle}</h3>
          <div className={styles.mapVisual}>
            <div className={styles.pins}>
              {t.areas.map((area, index) => (
                <div 
                  key={index} 
                  className={`${styles.pin} ${index === 0 ? styles.highlightPin : ""}`}
                >
                  <MapPin size={16} />
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className={styles.closingSafety}>{t.safety}</p>
      </div>
    </section>
  );
}
