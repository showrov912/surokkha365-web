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

  const content = {
    en: {
      badge: "Our Services",
      title: "Expert Solutions For Every Pest Problem",
      services: servicesData.map((s) => ({
        id: s.id.toString(),
        title: s.title,
        desc: s.desc,
        imagePath: s.image,
        topImage: s.topImage || s.image
      })),
      bookNow: "Book Now",
      viewAll: "See All Services"
    },
    bn: {
      badge: "আমাদের সার্ভিসসমূহ",
      title: "প্রতিটি পেস্ট সমস্যার এক্সপার্ট সমাধান",
      services: [
        {
          id: "termite",
          title: "উইপোকা",
          desc: "আমাদের এক্সপার্ট সার্ভিসের মাধ্যমে আপনার বাড়িকে উইপোকা থেকে রক্ষা করুন।",
          imagePath: "/pest1.jpg",
          topImage: "/pest2.jpg"
        },
        {
          id: "cockroach",
          title: "তেলাপোকা",
          desc: "আমাদের কার্যকর সমাধানে তেলাপোকা থেকে মুক্তি পান।",
          imagePath: "/pest3.jpg",
          topImage: "/pest4.jpg"
        },
        {
          id: "rodent",
          title: "ইঁদুর",
          desc: "আমাদের নিয়ন্ত্রণ পদ্ধতির মাধ্যমে আপনার সম্পত্তি ইঁদুর থেকে নিরাপদ রাখুন।",
          imagePath: "/pest2.jpg",
          topImage: "/pest1.jpg"
        },
        {
          id: "mosquito",
          title: "মশা",
          desc: "প্রমাণিত পদ্ধতির মাধ্যমে আপনার ঘর মশা-মুক্ত রাখুন।",
          imagePath: "/pest4.jpg",
          topImage: "/pest3.jpg"
        },
        {
          id: "bedbug",
          title: "ছারপোকা",
          desc: "শান্তিপূর্ণ ঘুমের জন্য ছারপোকা থেকে মুক্তি পান।",
          imagePath: "/pest1.jpg",
          topImage: "/pest2.jpg"
        }
      ],
      bookNow: "বুক করুন",
      viewAll: "সকল সার্ভিস দেখুন"
    }
  };

  const t = content[lang];

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
              {t.services.map((service, index) => {
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
