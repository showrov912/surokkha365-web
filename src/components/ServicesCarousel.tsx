"use client";
import React, { useRef } from "react";
import { useLanguage } from "./LanguageContext";
import styles from "./ServicesCarousel.module.css";
import { Bug, Bird, Rat, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useWebsiteData } from "@/context/WebsiteContext";

export default function ServicesCarousel() {
  const { lang } = useLanguage();
  const { servicesData } = useWebsiteData();
  const carouselRef = useRef<HTMLDivElement>(null);

  const t = {
    en: {
      badge: "Our Services",
      title: "Expert Solutions For Every Pest Problem",
      bookNow: "Book Now",
      viewAll: "See All Services"
    },
    bn: {
      badge: "আমাদের সার্ভিসসমূহ",
      title: "প্রতিটি পেস্ট সমস্যার এক্সপার্ট সমাধান",
      bookNow: "বুক করুন",
      viewAll: "সকল সার্ভিস দেখুন"
    }
  }[lang];

  const mappedServices = servicesData.map((s) => ({
    id: s.id.toString(),
    title: s.title[lang as 'en' | 'bn'],
    desc: s.desc[lang as 'en' | 'bn'],
    imagePath: s.image,
    topImage: s.topImage || s.image
  }));

  return (
    <section className={styles.servicesSection}>
      <div className="grid-container">
        
        <div className={styles.contentWrapper}>
          <div className={styles.header}>
            <div className={styles.badge}>
              <span className={styles.dot}></span>
              {t.badge}
            </div>
            <h2 className={styles.title}>{t.title}</h2>
          </div>

          <div className={styles.carouselContainer}>
            <div className={styles.carousel} ref={carouselRef}>
              {mappedServices.map((service, index) => {
                return (
                  <div key={index} className={styles.card}>
                    
                    {/* Top Image Area */}
                    <div className={styles.imageArea} style={{ backgroundImage: `url(${service.topImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    </div>

                    {/* Overlapping Icon */}
                    <div className={styles.iconCircle}>
                      <div className={styles.iconInner}>
                        <Image 
                          src={service.imagePath} 
                          alt={`Professional ${service.title} eradication service`} 
                          fill
                          style={{ objectFit: "cover", borderRadius: "50%" }}
                        />
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className={styles.contentArea}>
                      <h3 className={styles.cardTitle}>{service.title}</h3>
                      <p className={styles.cardDesc}>{service.desc}</p>
                      
                      <Link href="/#booking" className={styles.bookNowBtn} style={{ textDecoration: 'none', display: 'inline-flex' }}>
                        {t.bookNow} 
                        <div className={styles.arrowCircle}>
                          <ArrowRight size={14} color="white" />
                        </div>
                      </Link>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
