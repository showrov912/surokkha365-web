"use client";
import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "./LanguageContext";
import styles from "./BookingCalculator.module.css";
import { MapPin, Home, Building2, Search, Loader2 } from "lucide-react";
import { postcodesData, LocationData } from "../data/postcodes";
import { useRouter } from "next/navigation";
import { useWebsiteData } from "@/context/WebsiteContext";

export default function BookingCalculator() {
  const { lang } = useLanguage();
  const { heroData } = useWebsiteData();
  const router = useRouter();
  const [audience, setAudience] = useState<"homes" | "facilities">("homes");
  const [service, setService] = useState("");
  const [area, setArea] = useState("");
  
  const [selectedDivision, setSelectedDivision] = useState("");
  const { pricingData, servicesData } = useWebsiteData();
  const divisions = pricingData ? Object.keys(pricingData) : [];
  
  const [price, setPrice] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialize selected division
  useEffect(() => {
    if (divisions.length > 0 && !selectedDivision) {
      setSelectedDivision(divisions[0]);
    }
  }, [divisions, selectedDivision]);

  // Auto calculate price when inputs change
  useEffect(() => {
    const sqft = parseFloat(area) || 0;
    if (sqft === 0 || !selectedDivision || !service) {
      setPrice(0);
      return;
    }
    
    // Fetch price from dynamic admin data (which now separates homes and facilities)
    const priceObj = pricingData?.[selectedDivision]?.[service];
    const rate = priceObj ? (audience === "homes" ? priceObj.homes : priceObj.facilities) : 0;
    
    setPrice(sqft * rate);
  }, [area, selectedDivision, audience, service, pricingData]);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (price > 0 && selectedDivision) {
      setIsSubmitted(true);
      
      const queryParams = new URLSearchParams({
        service: service || "General Pest Control",
        area: area || "0",
        price: price.toString(),
        zone: selectedDivision,
        type: audience
      }).toString();

      setTimeout(() => {
        router.push(`/checkout?${queryParams}`);
      }, 800);
    }
  };

  const t = {
    en: {
      zoneLabel: "Service Division",
      zonePlaceholder: "Select Division",
      audienceLabel: "Premise Type *",
      homes: "Residential",
      facilities: "Commercial",
      serviceLabel: "Pest Type *",
      servicePlaceholder: "Select Pest",
      priceLabel: "Price (Excl. VAT)",
      areaLabel: "Square Feet *(Required: at least 200 sqft)",
      areaPlaceholder: "0",
      infoText: "Enter Square Feet to see pricing",
      btn: heroData.ctaText,
      successTitle: "Booking Request Received!",
      successDesc: "One of our pest control experts will contact you shortly to confirm your booking and schedule the visit.",
      successBtn: "Make Another Booking"
    },
    bn: {
      zoneLabel: "সার্ভিস বিভাগ",
      zonePlaceholder: "বিভাগ নির্বাচন করুন",
      audienceLabel: "প্রপার্টির ধরন *",
      homes: "বাসাবাড়ি",
      facilities: "কমার্শিয়াল",
      serviceLabel: "পেস্ট এর ধরন *",
      servicePlaceholder: "পেস্ট নির্বাচন করুন",
      priceLabel: "মূল্য (ভ্যাট বাদে)",
      areaLabel: "আয়তন (স্কয়ার ফিট) *(ন্যূনতম ২০০)",
      areaPlaceholder: "০",
      infoText: "মূল্য জানতে স্কয়ার ফিট লিখুন",
      btn: "বুক করুন",
      successTitle: "বুকিং রিকোয়েস্ট রিসিভড!",
      successDesc: "আমাদের একজন এক্সপার্ট শীঘ্রই আপনার সাথে যোগাযোগ করবেন এই বুকিংটি কনফার্ম করার জন্য।",
      successBtn: "আরেকটি বুকিং করুন"
    }
  }[lang];

  return (
    <div id="booking" className={styles.calculatorSection}>
      <div className="grid-container">
        <div className={styles.calculatorCard}>
          <form onSubmit={handleBook} className={styles.formContainer}>
            
            {/* Top Row: 4 Columns */}
            <div className={styles.topRow}>
              
              {/* Col 1: Division Dropdown */}
              <div className={styles.formGroup}>
                <label>{t.zoneLabel}</label>
                <div className={styles.inputWithIcon}>
                  <MapPin size={18} className={styles.inputIcon} />
                  <select 
                    className={`${styles.input} ${styles.hasIcon}`} 
                    value={selectedDivision}
                    onChange={(e) => setSelectedDivision(e.target.value)}
                    required
                  >
                    <option value="" disabled>{t.zonePlaceholder}</option>
                    {divisions.map(div => (
                      <option key={div} value={div}>{div}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Col 2: Premise Type Toggle */}
              <div className={styles.formGroup}>
                <label>{t.audienceLabel}</label>
                <div className={styles.toggleGroup}>
                  <button 
                    type="button"
                    className={`${styles.toggleBtn} ${audience === "homes" ? styles.toggleActive : ""}`}
                    onClick={() => setAudience("homes")}
                  >
                    <Home size={16} /> {t.homes}
                  </button>
                  <button 
                    type="button"
                    className={`${styles.toggleBtn} ${audience === "facilities" ? styles.toggleActive : ""}`}
                    onClick={() => setAudience("facilities")}
                  >
                    <Building2 size={16} /> {t.facilities}
                  </button>
                </div>
              </div>

              {/* Col 3: Service Type */}
              <div className={styles.formGroup}>
                <label>{t.serviceLabel}</label>
                <select className={styles.input} value={service} onChange={e => setService(e.target.value)} required>
                  <option value="" disabled>{t.servicePlaceholder}</option>
                  {servicesData.map((s) => (
                    <option key={s.id} value={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>

              {/* Col 4: Price Display */}
              <div className={styles.priceDisplayBlock}>
                <label>{t.priceLabel}</label>
                <div className={styles.priceValue}>
                  ৳ {price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>

            </div>

            {/* Bottom Row */}
            <div className={styles.bottomRow}>
              
              <div className={styles.formGroup} style={{ flex: 1 }}>
                <label>{t.areaLabel}</label>
                <input 
                  type="number" 
                  className={styles.input} 
                  value={area} 
                  onChange={e => setArea(e.target.value)} 
                  placeholder={t.areaPlaceholder} 
                  min="200"
                  required
                />
              </div>

              <div className={styles.infoBox}>
                {price > 0 ? `Total estimated price for ${area} sqft.` : t.infoText}
              </div>

            </div>

            {/* Submit Button */}
            {!isSubmitted ? (
              <button type="submit" className={styles.submitBtn} disabled={price === 0 || !selectedDivision}>
                {t.btn}
              </button>
            ) : (
              <button type="button" className={styles.submitBtn} disabled style={{ opacity: 0.8, display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}>
                <Loader2 className="animate-spin" size={20} /> Processing...
              </button>
            )}

          </form>
        </div>
      </div>
    </div>
  );
}
