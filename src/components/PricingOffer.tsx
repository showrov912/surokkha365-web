"use client";
import React, { useState } from "react";
import { useLanguage } from "./LanguageContext";
import styles from "./PricingOffer.module.css";
import { ChevronDown } from "lucide-react";

export default function PricingOffer() {
  const { lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number>(0);

  const content = {
    en: {
      badge: "FAQs",
      title: "Clearing Doubts. Controlling Pests.",
      items: [
        {
          q: "Are pest control services worth the money?",
          a: "Yes, professional pest control saves money in the long run by preventing structural damage, health risks, and product contamination."
        },
        {
          q: "What happens during a pest control inspection?",
          a: "Our technicians thoroughly inspect your premises to identify pest activity, entry points, and conditions conducive to pests, then provide a customized treatment plan."
        },
        {
          q: "How often should I get pest control services?",
          a: "We recommend quarterly treatments for homes and monthly or bi-monthly services for businesses, depending on the industry and pest pressure."
        },
        {
          q: "How can I prevent common pests?",
          a: "Keep areas clean, seal cracks and crevices, store food properly, and fix any moisture issues. Regular professional monitoring also helps."
        }
      ]
    },
    bn: {
      badge: "সাধারণ জিজ্ঞাসা",
      title: "সন্দেহ দূর করুন, পেস্ট নিয়ন্ত্রণ করুন।",
      items: [
        {
          q: "পেস্ট কন্ট্রোল সার্ভিসে টাকা খরচ করা কি লাভজনক?",
          a: "হ্যাঁ, প্রফেশনাল পেস্ট কন্ট্রোল দীর্ঘমেয়াদে আপনার অর্থ সাশ্রয় করে। এটি কাঠামোগত ক্ষতি, স্বাস্থ্যঝুঁকি এবং পণ্যের ক্ষতি রোধ করে।"
        },
        {
          q: "পেস্ট কন্ট্রোল ইন্সপেকশনের সময় কী হয়?",
          a: "আমাদের টেকনিশিয়ানরা আপনার প্রাঙ্গণ ভালোভাবে পরিদর্শন করে পোকামাকড়ের উপস্থিতি ও প্রবেশের পথ শনাক্ত করেন এবং একটি কাস্টমাইজড ট্রিটমেন্ট প্ল্যান প্রদান করেন।"
        },
        {
          q: "আমার কত ঘন ঘন পেস্ট কন্ট্রোল সার্ভিস নেওয়া উচিত?",
          a: "সাধারণত বাসা-বাড়ির জন্য প্রতি তিন মাসে একবার এবং ব্যবসা প্রতিষ্ঠানের জন্য প্রতি মাসে বা দুই মাসে একবার সার্ভিস নেওয়ার পরামর্শ দেওয়া হয়।"
        },
        {
          q: "আমি কীভাবে সাধারণ ক্ষতিকারক পোকামাকড় প্রতিরোধ করতে পারি?",
          a: "চারপাশ পরিষ্কার রাখুন, ফাটল বন্ধ করুন, খাবার সঠিকভাবে সংরক্ষণ করুন এবং স্যাঁতসেঁতে ভাব দূর করুন। এছাড়া নিয়মিত প্রফেশনাল মনিটরিংও সাহায্য করে।"
        }
      ]
    }
  };

  const t = content[lang];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.faqContainer}>
        
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.dot}></span>
            {t.badge}
          </div>
          <h2 className={styles.title}>{t.title}</h2>
        </div>

        <div className={styles.accordionList}>
          {t.items.map((item, index) => (
            <div 
              key={index} 
              className={`${styles.accordionItem} ${openIndex === index ? styles.open : ""}`}
            >
              <button 
                className={styles.accordionHeader} 
                onClick={() => toggleAccordion(index)}
              >
                <span>{item.q}</span>
                <div className={styles.iconCircle}>
                  <ChevronDown size={18} className={styles.chevron} />
                </div>
              </button>
              <div className={styles.accordionContent}>
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
