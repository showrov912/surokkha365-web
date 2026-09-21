"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "./LanguageContext";
import { useWebsiteData } from "@/context/WebsiteContext";
import styles from "./Testimonials.module.css";
import { Star, ChevronLeft, ChevronRight, User } from "lucide-react";

export default function Testimonials() {
  const { lang } = useLanguage();
  const { testimonialsData, testimonialBg } = useWebsiteData();
  const [currentIndex, setCurrentIndex] = useState(0);

  const t = {
    en: {
      badge: "Testimonials",
      title: "Customer Reviews",
      time: "Recent"
    },
    bn: {
      badge: "প্রশংসাপত্র",
      title: "গ্রাহকদের মতামত",
      time: "সম্প্রতি"
    }
  }[lang];

  const mappedReviews = testimonialsData.map((r) => ({
    name: r.name[lang as 'en' | 'bn'],
    time: t.time,
    text: r.review[lang as 'en' | 'bn'],
    rating: 5,
    image: r.image
  }));

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % mappedReviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + mappedReviews.length) % mappedReviews.length);
  };

  return (
    <section className={styles.section}>
      {/* Background Image */}
      <div className={styles.bgImage}>
        <Image 
          src={testimonialBg} 
          alt="Family relaxing after successful residential pest control treatment in Dhaka" 
          fill 
          style={{ objectFit: "cover" }} 
          priority
        />
      </div>
      
      {/* Dark Gradient Overlay */}
      <div className={styles.overlay}></div>

      {/* Content Container */}
      <div className={`grid-container ${styles.container}`}>
        <div className={styles.contentWrapper}>
          
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div className={styles.badge}>
              <span className={styles.dot}></span>
              {t.badge}
            </div>
            <h2 className={styles.title}>{t.title}</h2>
          </div>

          <div className={styles.sliderContainer}>
            <div 
              className={styles.cardsTrack}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {mappedReviews.map((review, idx) => (
                <div key={idx} className={styles.cardWrapper}>
                  <div className={styles.card}>
                    
                    <div className={styles.cardHeader}>
                      <div className={styles.avatar}>
                        <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", position: "relative", backgroundColor: "var(--color-orange)", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                          {(review as any).image ? <Image src={(review as any).image} alt={`Satisfied pest control customer ${review.name} in Bangladesh`} fill style={{ objectFit: "cover" }} /> : <User size={24} />}
                        </div>
                      </div>
                      <div className={styles.reviewerInfo}>
                        <h4 className={styles.reviewerName}>{review.name}</h4>
                        <p className={styles.reviewTime}>{review.time}</p>
                      </div>
                    </div>

                    <div className={styles.stars}>
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>

                    <p className={styles.reviewText}>
                      {review.text}
                    </p>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className={styles.controls} style={{ justifyContent: "center" }}>
            <button onClick={prevSlide} className={styles.controlBtn} aria-label="Previous Review">
              <ChevronLeft size={20} />
            </button>
            <button onClick={nextSlide} className={styles.controlBtn} aria-label="Next Review">
              <ChevronRight size={20} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
