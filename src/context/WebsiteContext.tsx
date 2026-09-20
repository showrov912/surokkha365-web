"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";

// Types
type HeroData = { headline: string; subheadline: string; ctaText: string; bgImage: string };
type ServiceData = { 
  id: number; 
  title: string; 
  desc: string; 
  image: string; 
  topImage: string;
  slug?: string;
  pageSubtitleEn?: string;
  pageSubtitleBn?: string;
  pageContentEn?: string;
  pageContentBn?: string;
};
type ProblemData = { title: string; desc: string; image: string };
type DifferenceData = { id: number; title: string; desc: string };
type TestimonialData = { id: number; name: string; review: string; image?: string };
type SEOData = { title: string; description: string; keywords: string };
export type LinkData = { 
  id: string; 
  text: string; 
  url: string;
  pageSubtitleEn?: string;
  pageSubtitleBn?: string;
  pageContentEn?: string;
  pageContentBn?: string;
};

export type ContactData = {
  phones: string[];
  email: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  legalStatementUrl: string;
};

export type PricingData = {
  [division: string]: {
    [pestType: string]: {
      homes: number;
      facilities: number;
    };
  };
};

export type BlogSection = {
  type: "h2" | "h3" | "p" | "soft-cta" | "related-link";
  text: string;
  linkText?: string;
  linkHref?: string;
};

export type BlogData = {
  id: string; // Slug
  title: { en: string; bn: string };
  excerpt: { en: string; bn: string };
  date: { en: string; bn: string };
  category: { en: string; bn: string };
  image: string;
  introHook: { en: string; bn: string };
  sections: { en: BlogSection[]; bn: BlogSection[] };
};

interface WebsiteContextType {
  seoData: SEOData;
  setSeoData: (data: SEOData) => void;
  heroData: HeroData;
  setHeroData: (data: HeroData) => void;
  servicesData: ServiceData[];
  setServicesData: (data: ServiceData[]) => void;
  problemData: ProblemData;
  setProblemData: (data: ProblemData) => void;
  differencesData: DifferenceData[];
  setDifferencesData: (data: DifferenceData[]) => void;
  testimonialsData: TestimonialData[];
  setTestimonialsData: (data: TestimonialData[]) => void;
  testimonialBg: string;
  setTestimonialBg: (bg: string) => void;
  blogsData: BlogData[];
  setBlogsData: (data: BlogData[]) => void;
  footerServices: LinkData[];
  setFooterServices: (data: LinkData[]) => void;
  footerQuickLinks: LinkData[];
  setFooterQuickLinks: (data: LinkData[]) => void;
  contactData: ContactData;
  setContactData: (data: ContactData) => void;
  pricingData: PricingData;
  setPricingData: (data: PricingData) => void;
  saveToCloud: () => Promise<void>;
}

const defaultState = {
  seoData: {
    title: "Best Pest Control Services in Dhaka | Surokkha365",
    description: "Book professional pest control in Dhaka instantly. Urban residential from 10 TK/sq ft. Verified technicians, safe chemicals, and digital audit-ready reports.",
    keywords: "pest control dhaka, termite control bangladesh, cockroach eradication, professional pest exterminator"
  },
  heroData: {
    headline: "Professional Pest Control in Dhaka",
    subheadline: "Evidence-based, compliant eradication of termites, cockroaches, and rodents. Audit-ready reports for homes and facilities across Bangladesh.",
    ctaText: "Check Dhaka Pricing",
    bgImage: "/pest2.jpg"
  },
  servicesData: [
    { 
      id: 1, title: "Termite", desc: "Protect your Dhaka property with professional termite eradication and soil treatments.", image: "/pest1.jpg", topImage: "/pest2.jpg",
      slug: "termite-treatment", pageSubtitleEn: "Professional Termite Treatment services by Surokkha365.", pageSubtitleBn: "সুরক্ষা৩৬৫ এর প্রফেশনাল Termite Treatment সার্ভিস।", pageContentEn: "We are currently updating our detailed service documentation. Please check back soon or contact us directly to book this service.", pageContentBn: "আমরা বর্তমানে আমাদের বিস্তারিত সার্ভিস ডকুমেন্টেশন আপডেট করছি। অনুগ্রহ করে শীঘ্রই আবার চেক করুন অথবা সরাসরি বুক করতে আমাদের সাথে যোগাযোগ করুন।"
    },
    { 
      id: 2, title: "Cockroach", desc: "Advanced gel baiting to eliminate cockroaches from commercial and residential kitchens.", image: "/pest3.jpg", topImage: "/pest4.jpg",
      slug: "cockroach-control", pageSubtitleEn: "Professional Cockroach Control services by Surokkha365.", pageSubtitleBn: "সুরক্ষা৩৬৫ এর প্রফেশনাল Cockroach Control সার্ভিস।", pageContentEn: "We are currently updating our detailed service documentation. Please check back soon or contact us directly to book this service.", pageContentBn: "আমরা বর্তমানে আমাদের বিস্তারিত সার্ভিস ডকুমেন্টেশন আপডেট করছি। অনুগ্রহ করে শীঘ্রই আবার চেক করুন অথবা সরাসরি বুক করতে আমাদের সাথে যোগাযোগ করুন।"
    },
    { 
      id: 3, title: "Rodent", desc: "Keep your warehouse or home safe from rodents with our compliant bait station methods.", image: "/pest2.jpg", topImage: "/pest1.jpg",
      slug: "rodent-control", pageSubtitleEn: "Professional Rodent Control services by Surokkha365.", pageSubtitleBn: "সুরক্ষা৩৬৫ এর প্রফেশনাল Rodent Control সার্ভিস।", pageContentEn: "We are currently updating our detailed service documentation. Please check back soon or contact us directly to book this service.", pageContentBn: "আমরা বর্তমানে আমাদের বিস্তারিত সার্ভিস ডকুমেন্টেশন আপডেট করছি। অনুগ্রহ করে শীঘ্রই আবার চেক করুন অথবা সরাসরি বুক করতে আমাদের সাথে যোগাযোগ করুন।"
    },
    { 
      id: 4, title: "Mosquito", desc: "Specialized fogging and source reduction to keep your area mosquito and dengue-free.", image: "/pest4.jpg", topImage: "/pest3.jpg",
      slug: "mosquito-control", pageSubtitleEn: "Professional Mosquito Control services by Surokkha365.", pageSubtitleBn: "সুরক্ষা৩৬৫ এর প্রফেশনাল Mosquito Control সার্ভিস।", pageContentEn: "We are currently updating our detailed service documentation. Please check back soon or contact us directly to book this service.", pageContentBn: "আমরা বর্তমানে আমাদের বিস্তারিত সার্ভিস ডকুমেন্টেশন আপডেট করছি। অনুগ্রহ করে শীঘ্রই আবার চেক করুন অথবা সরাসরি বুক করতে আমাদের সাথে যোগাযোগ করুন।"
    },
    { 
      id: 5, title: "Bed Bug", desc: "Targeted bed bug eradication for hotels and homes to ensure peaceful sleep.", image: "/pest1.jpg", topImage: "/pest2.jpg",
      slug: "bedbug-removal", pageSubtitleEn: "Professional Bedbug Removal services by Surokkha365.", pageSubtitleBn: "সুরক্ষা৩৬৫ এর প্রফেশনাল Bedbug Removal সার্ভিস।", pageContentEn: "We are currently updating our detailed service documentation. Please check back soon or contact us directly to book this service.", pageContentBn: "আমরা বর্তমানে আমাদের বিস্তারিত সার্ভিস ডকুমেন্টেশন আপডেট করছি। অনুগ্রহ করে শীঘ্রই আবার চেক করুন অথবা সরাসরি বুক করতে আমাদের সাথে যোগাযোগ করুন।"
    }
  ],
  contactData: {
    phones: ["+880 1403-561168", "+880 1405-271723"],
    email: "contact@surokkha365.com",
    facebook: "https://www.facebook.com/surokkha365bd",
    instagram: "https://www.instagram.com/surokkha365/",
    linkedin: "https://www.linkedin.com/company/surokkha365",
    legalStatementUrl: "/legal/legal-statement"
  },
  pricingData: {
    "Dhaka": { 
      "Termite": { homes: 15, facilities: 12 }, 
      "Cockroach": { homes: 12, facilities: 10 }, 
      "Rodent": { homes: 10, facilities: 8 }, 
      "Mosquito": { homes: 8, facilities: 6 }, 
      "Bed Bug": { homes: 14, facilities: 11 } 
    },
    "Chattogram": { 
      "Termite": { homes: 14, facilities: 11 }, 
      "Cockroach": { homes: 11, facilities: 9 }, 
      "Rodent": { homes: 9, facilities: 7 }, 
      "Mosquito": { homes: 7, facilities: 5 }, 
      "Bed Bug": { homes: 13, facilities: 10 } 
    },
    "Rajshahi": { 
      "Termite": { homes: 12, facilities: 10 }, 
      "Cockroach": { homes: 10, facilities: 8 }, 
      "Rodent": { homes: 8, facilities: 6 }, 
      "Mosquito": { homes: 6, facilities: 5 }, 
      "Bed Bug": { homes: 12, facilities: 10 } 
    },
    "Khulna": { 
      "Termite": { homes: 12, facilities: 10 }, 
      "Cockroach": { homes: 10, facilities: 8 }, 
      "Rodent": { homes: 8, facilities: 6 }, 
      "Mosquito": { homes: 6, facilities: 5 }, 
      "Bed Bug": { homes: 12, facilities: 10 } 
    },
    "Barishal": { 
      "Termite": { homes: 12, facilities: 10 }, 
      "Cockroach": { homes: 10, facilities: 8 }, 
      "Rodent": { homes: 8, facilities: 6 }, 
      "Mosquito": { homes: 6, facilities: 5 }, 
      "Bed Bug": { homes: 12, facilities: 10 } 
    },
    "Sylhet": { 
      "Termite": { homes: 13, facilities: 11 }, 
      "Cockroach": { homes: 11, facilities: 9 }, 
      "Rodent": { homes: 9, facilities: 7 }, 
      "Mosquito": { homes: 7, facilities: 5 }, 
      "Bed Bug": { homes: 13, facilities: 10 } 
    },
    "Rangpur": { 
      "Termite": { homes: 11, facilities: 9 }, 
      "Cockroach": { homes: 9, facilities: 7 }, 
      "Rodent": { homes: 7, facilities: 6 }, 
      "Mosquito": { homes: 6, facilities: 5 }, 
      "Bed Bug": { homes: 11, facilities: 9 } 
    },
    "Mymensingh": { 
      "Termite": { homes: 11, facilities: 9 }, 
      "Cockroach": { homes: 9, facilities: 7 }, 
      "Rodent": { homes: 7, facilities: 6 }, 
      "Mosquito": { homes: 6, facilities: 5 }, 
      "Bed Bug": { homes: 11, facilities: 9 } 
    }
  },
  problemData: {
    title: "Safeguarding Dhaka Businesses & Homes",
    desc: "Facilities across Bangladesh struggle with non-compliant vendors using harmful chemicals without providing audit-ready reports.",
    image: "/problem.jpg"
  },
  differencesData: [
    { id: 1, title: "Transparent Pricing", desc: "No hidden fees, fixed per sq ft." },
    { id: 2, title: "Verified Technicians", desc: "Background-checked professionals." },
    { id: 3, title: "Audit-Ready Reports", desc: "Compliance logs delivered digitally." },
    { id: 4, title: "Guaranteed Results", desc: "Follow-ups included in warranty." }
  ],
  testimonialsData: [
    { id: 1, name: "Rahul Patel", review: "We didn't expect overnight magic, but within a short time, the situation became much more manageable and comfortable. We're quite happy with the results.", image: "" },
    { id: 2, name: "Rajesh Varma", review: "It's been several months since the treatment and there are no fresh signs of damage. That itself speaks volumes. We're very satisfied with this.", image: "" },
    { id: 3, name: "Sonia Akter", review: "Very professional and clean service. The technicians arrived on time and explained the entire process. Highly recommended for termite control.", image: "" }
  ],
  testimonialBg: "/testimonial-bg.jpg",
  blogsData: [
    {
      id: "dengue-prevention-dhaka",
      title: { en: "Dengue Prevention: How to Control Mosquitoes in Dhaka", bn: "ডেঙ্গু প্রতিরোধ: ঢাকায় কীভাবে মশা নিয়ন্ত্রণ করবেন" },
      excerpt: { en: "With dengue cases rising in Dhaka, proactive mosquito control is essential. Learn the most effective ways to protect your family.", bn: "ঢাকায় ডেঙ্গু রোগীর সংখ্যা বাড়ছে, তাই মশা নিয়ন্ত্রণ অত্যন্ত জরুরি। আপনার পরিবারকে সুরক্ষিত রাখার কার্যকর উপায় জানুন।" },
      date: { en: "Oct 10, 2026", bn: "১০ অক্টো, ২০২৬" },
      category: { en: "Health & Safety", bn: "স্বাস্থ্য ও সুরক্ষা" },
      image: "/pest4.jpg",
      introHook: {
        en: "Are you relying only on mosquito coils and sprays? Discover professional methods to permanently reduce mosquito breeding around your home.",
        bn: "আপনি কি কেবল মশার কয়েল এবং স্প্রে-এর উপর নির্ভর করছেন? বাড়ির চারপাশে মশার বংশবৃদ্ধি চিরতরে কমানোর পেশাদার পদ্ধতি আবিষ্কার করুন।"
      },
      sections: {
        en: [
          { type: "h2", text: "The Growing Threat of Dengue in Bangladesh" },
          { type: "p", text: "Every monsoon, Dhaka faces a severe outbreak of Dengue fever caused by Aedes mosquitoes. Stagnant water in flower pots, discarded tires, and blocked drains act as perfect breeding grounds. Professional mosquito control focuses not just on killing adult mosquitoes, but destroying their breeding sources (larviciding)." },
          { type: "h3", text: "Steps You Can Take Today" },
          { type: "p", text: "Ensure there is no standing water in your balcony or rooftop. Use mosquito nets while sleeping, and consider installing window screens. However, for large residential complexes, thermal fogging and larviciding by certified professionals offer the best defense." },
          { type: "soft-cta", text: "Protect your family from Dengue today. Book our professional Mosquito Control service.", linkText: "View Services", linkHref: "/services/mosquito-control" }
        ],
        bn: [
          { type: "h2", text: "বাংলাদেশে ডেঙ্গুর ক্রমবর্ধমান হুমকি" },
          { type: "p", text: "প্রতি বর্ষায় ঢাকা এডিস মশাবাহিত ডেঙ্গু জ্বরের মারাত্মক প্রাদুর্ভাবের সম্মুখীন হয়। ফুলের টব, বাতিল টায়ার এবং বদ্ধ ড্রেনে জমে থাকা পানি মশার প্রজনন ক্ষেত্র হিসেবে কাজ করে। পেশাদার মশা নিয়ন্ত্রণ শুধুমাত্র পূর্ণাঙ্গ মশা মারার উপর ফোকাস করে না, বরং এদের প্রজনন উৎস (লার্ভিসাইডিং) ধ্বংস করে।" },
          { type: "h3", text: "আজই যে পদক্ষেপগুলো নিতে পারেন" },
          { type: "p", text: "আপনার বারান্দা বা ছাদে যেন পানি জমে না থাকে তা নিশ্চিত করুন। ঘুমানোর সময় মশারি ব্যবহার করুন এবং জানালায় নেট লাগানোর কথা বিবেচনা করুন। তবে, বড় আবাসিক ভবনের জন্য থার্মাল ফগিং এবং লার্ভিসাইডিং সবচেয়ে ভালো সুরক্ষা প্রদান করে।" },
          { type: "soft-cta", text: "আপনার পরিবারকে ডেঙ্গু থেকে সুরক্ষিত রাখুন। আমাদের প্রফেশনাল মশা নিয়ন্ত্রণ সার্ভিস বুক করুন।", linkText: "সার্ভিসগুলো দেখুন", linkHref: "/services/mosquito-control" }
        ]
      }
    },
    {
      id: "identifying-termite-damage",
      title: { en: "Identifying Termite Damage in Wooden Furniture", bn: "কাঠের আসবাবে উইপোকার আক্রমণ শনাক্ত করার উপায়" },
      excerpt: { en: "Termites can hollow out your expensive furniture before you even notice. Here are the early warning signs to look out for.", bn: "উইপোকা আপনার দামি আসবাবপত্র আপনার অজান্তেই নষ্ট করে দিতে পারে। প্রাথমিক লক্ষণগুলো জেনে নিন।" },
      date: { en: "Oct 05, 2026", bn: "৫ অক্টো, ২০২৬" },
      category: { en: "Property Protection", bn: "সম্পত্তি সুরক্ষা" },
      image: "/pest1.jpg",
      introHook: {
        en: "Is that sawdust under your bed, or is something eating your furniture from the inside out?",
        bn: "বিছানার নিচে কি কাঠের গুঁড়ো জমে আছে, নাকি ভেতর থেকে আপনার আসবাবপত্র কেউ খেয়ে ফেলছে?"
      },
      sections: {
        en: [
          { type: "h2", text: "The Silent Destroyers of Dhaka Homes" },
          { type: "p", text: "Subterranean and drywood termites are notorious in Bangladesh for destroying doors, cabinets, and expensive wooden beds. They eat wood from the inside out, meaning the damage is often extensive by the time it becomes visible." },
          { type: "h3", text: "Early Warning Signs" },
          { type: "p", text: "Look for hollow-sounding wood, discarded wings near windowsills, and mud tubes climbing up your walls. If you tap a wooden door frame and it sounds hollow, you likely have an active infestation. Do not spray regular bug spray; this only scatters them and makes the problem worse." },
          { type: "soft-cta", text: "Stop termite damage before it ruins your home. Schedule a termite inspection today.", linkText: "Termite Treatment", linkHref: "/services/termite-treatment" }
        ],
        bn: [
          { type: "h2", text: "ঢাকার বাড়িগুলোর নীরব ধ্বংসকারী" },
          { type: "p", text: "বাংলাদেশে দরজা, ক্যাবিনেট এবং দামি কাঠের খাট ধ্বংস করার জন্য উইপোকা কুখ্যাত। এরা ভেতর থেকে কাঠ খেয়ে ফেলে, যার ফলে বাইরে থেকে যখন ক্ষতি দৃশ্যমান হয়, ততক্ষণে অনেক দেরি হয়ে যায়।" },
          { type: "h3", text: "প্রাথমিক সতর্কীকরণ লক্ষণ" },
          { type: "p", text: "ফাঁপা শব্দের কাঠ, জানালার কাছে ফেলে রাখা ডানা এবং দেয়ালে মাটির টিউব খুঁজুন। যদি কাঠের দরজার ফ্রেমে টোকা দিলে ফাঁপা শব্দ হয়, তবে বুঝতে হবে উইপোকার আক্রমণ হয়েছে। সাধারণ বাগ স্প্রে ব্যবহার করবেন না; এটি তাদের ছড়িয়ে দেয় এবং সমস্যা আরও বাড়িয়ে তোলে।" },
          { type: "soft-cta", text: "বাড়ি নষ্ট হওয়ার আগেই উইপোকা দমন করুন। আজই একটি পরিদর্শন নির্ধারণ করুন।", linkText: "উইপোকা নিয়ন্ত্রণ", linkHref: "/services/termite-treatment" }
        ]
      }
    },
    {
      id: "cockroach-control-kitchen",
      title: { en: "How to Eradicate Cockroaches from Your Kitchen", bn: "রান্নাঘর থেকে কীভাবে চিরতরে তেলাপোকা দূর করবেন" },
      excerpt: { en: "Kitchens are a haven for German cockroaches. Learn why traditional sprays fail and how gel baiting provides a permanent solution.", bn: "রান্নাঘর তেলাপোকার প্রিয় জায়গা। জানুন কেন সাধারণ স্প্রে কাজ করে না এবং কীভাবে জেল বেটিং স্থায়ী সমাধান দেয়।" },
      date: { en: "Sep 28, 2026", bn: "২৮ সেপ্টে, ২০২৬" },
      category: { en: "Kitchen Hygiene", bn: "রান্নাঘরের স্বাস্থ্যবিধি" },
      image: "/pest2.jpg",
      introHook: {
        en: "Tired of seeing cockroaches scurry across your countertops at night? Traditional sprays are no longer enough.",
        bn: "রাতে রান্নাঘরে তেলাপোকা ঘুরে বেড়ানো দেখে ক্লান্ত? সাধারণ স্প্রে আর যথেষ্ট নয়।"
      },
      sections: {
        en: [
          { type: "h2", text: "Why Kitchens Attract Cockroaches" },
          { type: "p", text: "German cockroaches thrive in warm, humid environments with plenty of food—making Bangladeshi kitchens their perfect habitat. They hide in hinges, behind refrigerators, and inside microwaves." },
          { type: "p", text: "Aerosol sprays only kill the roaches you see. To eliminate the nest, professional pest controllers use advanced Gel Baiting technology. The roaches eat the gel, carry it back to the nest, and create a cascading effect that wipes out the entire colony safely, without toxic fumes." },
          { type: "soft-cta", text: "Make your kitchen 100% cockroach-free safely.", linkText: "Cockroach Control", linkHref: "/services/cockroach-control" }
        ],
        bn: [
          { type: "h2", text: "কেন রান্নাঘর তেলাপোকাকে আকর্ষণ করে" },
          { type: "p", text: "জার্মান তেলাপোকা উষ্ণ, আর্দ্র পরিবেশে প্রচুর খাবার সহ ভালোভাবে বৃদ্ধি পায়—যা বাংলাদেশের রান্নাঘরগুলোকে তাদের আদর্শ আবাসস্থলে পরিণত করে। এরা ফ্রিজের পেছনে এবং মাইক্রোওয়েভের ভেতরে লুকিয়ে থাকে।" },
          { type: "p", text: "অ্যারোসল স্প্রে শুধুমাত্র সেই তেলাপোকাগুলোকে মারে যা আপনি দেখতে পান। বাসা ধ্বংস করতে, পেশাদার পেস্ট কন্ট্রোলাররা উন্নত জেল বেটিং প্রযুক্তি ব্যবহার করে। তেলাপোকা জেলটি খেয়ে বাসায় নিয়ে যায়, যা পুরো কলোনিকে নিরাপদে ধ্বংস করে।" },
          { type: "soft-cta", text: "আপনার রান্নাঘর নিরাপদে শতভাগ তেলাপোকামুক্ত করুন।", linkText: "তেলাপোকা নিয়ন্ত্রণ", linkHref: "/services/cockroach-control" }
        ]
      }
    },
    {
      id: "bed-bug-removal-dhaka",
      title: { en: "Dealing with Bed Bugs in Urban Apartments", bn: "শহরের ফ্ল্যাটে ছারপোকার সমস্যা এবং মুক্তির উপায়" },
      excerpt: { en: "Bed bugs spread rapidly in densely populated urban areas. Find out how to detect and eliminate them completely.", bn: "ঘনবসতিপূর্ণ শহরাঞ্চলে ছারপোকা দ্রুত ছড়ায়। কীভাবে এদের শনাক্ত এবং সম্পূর্ণ নির্মূল করবেন তা জানুন।" },
      date: { en: "Sep 20, 2026", bn: "২০ সেপ্টে, ২০২৬" },
      category: { en: "Tips", bn: "টিপস" },
      image: "/pest3.jpg",
      introHook: {
        en: "Waking up with itchy red bites? Bed bugs are master hitchhikers and can infest even the cleanest apartments.",
        bn: "সকালে উঠে শরীরে চুলকানি ও লাল দাগ দেখছেন? ছারপোকা খুব সহজেই পরিষ্কার ফ্ল্যাটেও ছড়িয়ে পড়তে পারে।"
      },
      sections: {
        en: [
          { type: "h2", text: "How Bed Bugs Enter Your Home" },
          { type: "p", text: "Bed bugs don't care about cleanliness. They hitch rides on luggage, used furniture, and clothing. In dense areas of Dhaka, they can even travel between apartments through wall cracks and electrical outlets." },
          { type: "h3", text: "Professional Eradication" },
          { type: "p", text: "Washing bedsheets in hot water helps, but it won't eliminate an infestation. Bed bugs hide in mattress seams, bed frames, and baseboards. Our professional chemical treatment requires 2-3 sessions to break their breeding cycle completely and ensure your home is free of these blood-sucking pests." },
          { type: "soft-cta", text: "Sleep peacefully again. Book our guaranteed bed bug treatment.", linkText: "Bed Bug Removal", linkHref: "/services/bedbug-removal" }
        ],
        bn: [
          { type: "h2", text: "কীভাবে ছারপোকা আপনার বাড়িতে প্রবেশ করে" },
          { type: "p", text: "ছারপোকা পরিষ্কার-পরিচ্ছন্নতার পরোয়া করে না। তারা লাগেজ, ব্যবহৃত আসবাবপত্র এবং কাপড়ের মাধ্যমে ছড়ায়। ঢাকার ঘনবসতিপূর্ণ এলাকায়, তারা দেয়ালের ফাটল এবং বৈদ্যুতিক আউটলেটের মাধ্যমে এক ফ্ল্যাট থেকে অন্য ফ্ল্যাটেও যেতে পারে।" },
          { type: "h3", text: "পেশাদার নির্মূল" },
          { type: "p", text: "গরম পানিতে বিছানার চাদর ধোয়া সাহায্য করে, কিন্তু এটি সংক্রমণ পুরোপুরি দূর করতে পারে না। ছারপোকা তোশকের সেলাই এবং খাটের ফ্রেমে লুকিয়ে থাকে। আমাদের পেশাদার কেমিক্যাল ট্রিটমেন্টের মাধ্যমে তাদের প্রজনন চক্র পুরোপুরি ভেঙে ফেলা সম্ভব।" },
          { type: "soft-cta", text: "আবার শান্তিতে ঘুমান। আমাদের গ্যারান্টিযুক্ত ছারপোকা ট্রিটমেন্ট বুক করুন।", linkText: "ছারপোকা নিয়ন্ত্রণ", linkHref: "/services/bedbug-removal" }
        ]
      }
    },
    {
      id: "rodent-control-warehouses",
      title: { en: "Rodent Control: Keeping Rats out of Homes & Warehouses", bn: "ইঁদুর নিয়ন্ত্রণ: গুদাম ও বাড়ি ইঁদুরমুক্ত রাখার উপায়" },
      excerpt: { en: "Rats carry diseases and chew through electrical wires, causing fire hazards. Discover comprehensive rodent control strategies.", bn: "ইঁদুর রোগ ছড়ায় এবং বৈদ্যুতিক তার কেটে অগ্নিকাণ্ডের ঝুঁকি তৈরি করে। ব্যাপক ইঁদুর নিয়ন্ত্রণ কৌশল আবিষ্কার করুন।" },
      date: { en: "Sep 12, 2026", bn: "১২ সেপ্টে, ২০২৬" },
      category: { en: "Commercial", bn: "বাণিজ্যিক" },
      image: "/pest4.jpg",
      introHook: {
        en: "Did you know that a significant percentage of unexplained warehouse fires are caused by rats chewing through electrical cables?",
        bn: "আপনি কি জানেন যে গুদামে ব্যাখ্যাহীন অগ্নিকাণ্ডের একটি বড় অংশ ঘটে ইঁদুরের বৈদ্যুতিক তার কাটার কারণে?"
      },
      sections: {
        en: [
          { type: "h2", text: "The Economic and Health Impact of Rodents" },
          { type: "p", text: "In Bangladesh, rodents are a massive threat to both agricultural storage and residential properties. They contaminate food supplies with urine and feces, transmitting diseases like Leptospirosis." },
          { type: "h3", text: "Integrated Rodent Management" },
          { type: "p", text: "At Surokkha365, we don't just put out traps. We conduct an exterior perimeter defense, identify and seal entry points, and use highly secure, tamper-proof bait stations that are safe around children and pets." },
          { type: "soft-cta", text: "Secure your inventory and family from rodents.", linkText: "Rodent Control", linkHref: "/services/rodent-control" }
        ],
        bn: [
          { type: "h2", text: "ইঁদুরের অর্থনৈতিক ও স্বাস্থ্যগত প্রভাব" },
          { type: "p", text: "বাংলাদেশে ইঁদুর কৃষিজাত পণ্য সংরক্ষণ এবং আবাসিক সম্পত্তি উভয়ের জন্যই বিশাল হুমকি। এরা প্রস্রাব ও মল দিয়ে খাদ্য সরবরাহ দূষিত করে এবং বিভিন্ন রোগ ছড়ায়।" },
          { type: "h3", text: "সমন্বিত ইঁদুর ব্যবস্থাপনা" },
          { type: "p", text: "সুরক্ষা৩৬৫-এ আমরা শুধু ফাঁদ পাতি না। আমরা বাইরের দিকের প্রতিরক্ষা ব্যবস্থা তৈরি করি, প্রবেশের পয়েন্টগুলো চিহ্নিত করে সিল করি এবং শিশুদের ও পোষা প্রাণীদের জন্য নিরাপদ টেম্পার-প্রুফ বেইট স্টেশন ব্যবহার করি।" },
          { type: "soft-cta", text: "ইঁদুর থেকে আপনার ইনভেন্টরি এবং পরিবারকে সুরক্ষিত রাখুন।", linkText: "ইঁদুর নিয়ন্ত্রণ", linkHref: "/services/rodent-control" }
        ]
      }
    },
    {
      id: "monsoon-pest-control-tips",
      title: { en: "Monsoon Pest Control Tips for Bangladeshi Homes", bn: "বর্ষাকালে ঘরবাড়িতে পোকামাকড় নিয়ন্ত্রণের টিপস" },
      excerpt: { en: "The monsoon season drives pests indoors. Prepare your home with these essential pest-proofing tips.", bn: "বর্ষাকালে পোকামাকড় ঘরের ভেতরে আশ্রয় নেয়। এই প্রয়োজনীয় টিপস দিয়ে আপনার বাড়িকে প্রস্তুত করুন।" },
      date: { en: "Sep 01, 2026", bn: "১ সেপ্টে, ২০২৬" },
      category: { en: "Seasonal", bn: "মৌসুমি" },
      image: "/pest2.jpg",
      introHook: {
        en: "Heavy rains push insects and rodents out of their natural habitats and directly into your dry, comfortable home.",
        bn: "ভারী বৃষ্টির কারণে পোকামাকড় এবং ইঁদুর তাদের প্রাকৃতিক আবাসস্থল ছেড়ে সরাসরি আপনার শুকনো, আরামদায়ক বাড়িতে আশ্রয় নেয়।"
      },
      sections: {
        en: [
          { type: "h2", text: "Why Pests Surge During the Monsoon" },
          { type: "p", text: "Waterlogged streets and flooded drains in cities like Dhaka force pests like centipedes, cockroaches, rats, and snakes to seek higher, drier ground. Additionally, the increased humidity creates a perfect breeding ground for termites and mosquitoes." },
          { type: "h3", text: "Preventative Measures" },
          { type: "p", text: "Seal cracks around doors and windows. Fix leaky pipes to reduce moisture. Store all food in airtight containers and dispose of garbage daily. A pre-monsoon pest control treatment can create a chemical barrier around your home to keep pests out." },
          { type: "soft-cta", text: "Ready your home for the monsoon.", linkText: "Contact Us", linkHref: "/contact" }
        ],
        bn: [
          { type: "h2", text: "কেন বর্ষাকালে পেস্টের উপদ্রব বাড়ে" },
          { type: "p", text: "ঢাকা শহরের জলমগ্ন রাস্তা এবং প্লাবিত ড্রেন তেলাপোকা, ইঁদুরের মতো পেস্টগুলোকে উঁচু এবং শুষ্ক স্থান খুঁজতে বাধ্য করে। অতিরিক্ত আর্দ্রতা উইপোকা এবং মশার প্রজননের জন্য উপযুক্ত পরিবেশ তৈরি করে।" },
          { type: "h3", text: "প্রতিরোধমূলক ব্যবস্থা" },
          { type: "p", text: "দরজা এবং জানালার চারপাশের ফাটল বন্ধ করুন। আর্দ্রতা কমাতে লিকেজ পাইপ মেরামত করুন। সমস্ত খাবার এয়ারটাইট পাত্রে সংরক্ষণ করুন এবং প্রতিদিন আবর্জনা ফেলে দিন। প্রাক-বর্ষা পেস্ট কন্ট্রোল ট্রিটমেন্ট আপনার বাড়ির চারপাশে একটি রাসায়নিক বাধা তৈরি করতে পারে।" },
          { type: "soft-cta", text: "বর্ষার জন্য আপনার বাড়িকে প্রস্তুত করুন।", linkText: "যোগাযোগ করুন", linkHref: "/contact" }
        ]
      }
    },
    {
      id: "safe-pest-control-pets-kids",
      title: { en: "Safe Pest Control for Homes with Children and Pets", bn: "শিশু ও পোষা প্রাণীদের জন্য নিরাপদ পেস্ট কন্ট্রোল" },
      excerpt: { en: "Chemical safety is our top priority. Learn how modern pest control protects your home without harming your loved ones.", bn: "রাসায়নিক নিরাপত্তা আমাদের সর্বোচ্চ অগ্রাধিকার। জানুন কীভাবে আধুনিক পেস্ট কন্ট্রোল আপনার প্রিয়জনদের ক্ষতি না করে আপনার বাড়িকে সুরক্ষিত রাখে।" },
      date: { en: "Aug 22, 2026", bn: "২২ আগস্ট, ২০২৬" },
      category: { en: "Health & Safety", bn: "স্বাস্থ্য ও সুরক্ষা" },
      image: "/pest1.jpg",
      introHook: {
        en: "Are you avoiding pest control because you're worried the chemicals will harm your newborn or your cat? You don't have to choose between a pest-free home and safety.",
        bn: "রাসায়নিক আপনার নবজাতক বা বিড়ালের ক্ষতি করবে এই ভয়ে আপনি কি পেস্ট কন্ট্রোল এড়িয়ে চলছেন? আপনাকে আর চিন্তায় পড়তে হবে না।"
      },
      sections: {
        en: [
          { type: "h2", text: "The Evolution of Pest Control Chemicals" },
          { type: "p", text: "Gone are the days of highly toxic, foul-smelling pesticide sprays that require you to leave your home for days. At Surokkha365, we use WHO-approved, low-toxicity formulations that are tough on bugs but completely safe for mammals." },
          { type: "h3", text: "Targeted Application" },
          { type: "p", text: "Instead of indiscriminately spraying chemicals everywhere, we use targeted baits and gels placed strategically in cracks and crevices where pets and children cannot reach them. We prioritize eco-friendly and bio-rational products." }
        ],
        bn: [
          { type: "h2", text: "পেস্ট কন্ট্রোল রাসায়নিকের বিবর্তন" },
          { type: "p", text: "অত্যন্ত বিষাক্ত, দুর্গন্ধযুক্ত কীটনাশক স্প্রে করার দিন শেষ, যার জন্য আপনাকে দিনের পর দিন বাড়ি ছেড়ে থাকতে হতো। সুরক্ষা৩৬৫-এ, আমরা বিশ্ব স্বাস্থ্য সংস্থা (WHO) অনুমোদিত, স্বল্প-বিষাক্ত ফর্মুলেশন ব্যবহার করি।" },
          { type: "h3", text: "লক্ষ্যভিত্তিক প্রয়োগ" },
          { type: "p", text: "সর্বত্র রাসায়নিক স্প্রে করার পরিবর্তে, আমরা ফাটল এবং ফোকরে কৌশলগতভাবে লক্ষ্যভিত্তিক বেইট এবং জেল ব্যবহার করি যেখানে পোষা প্রাণী এবং শিশুরা পৌঁছাতে পারে না।" }
        ]
      }
    },
    {
      id: "commercial-pest-control-restaurants",
      title: { en: "Commercial Pest Control: Why Restaurants Need It", bn: "রেস্টুরেন্ট ও ব্যবসাপ্রতিষ্ঠানে পেস্ট কন্ট্রোলের গুরুত্ব" },
      excerpt: { en: "A single pest sighting can ruin a restaurant's reputation. Discover why regular audits and commercial pest control are essential.", bn: "একটি মাত্র পোকামাকড়ের দেখা পাওয়া একটি রেস্টুরেন্টের সুনাম নষ্ট করতে পারে। কেন নিয়মিত অডিট এবং বাণিজ্যিক পেস্ট কন্ট্রোল অপরিহার্য তা জানুন।" },
      date: { en: "Aug 14, 2026", bn: "১৪ আগস্ট, ২০২৬" },
      category: { en: "Commercial", bn: "বাণিজ্যিক" },
      image: "/pest3.jpg",
      introHook: {
        en: "In the age of social media, a customer recording a cockroach in your restaurant can go viral and destroy your business overnight.",
        bn: "সোশ্যাল মিডিয়ার যুগে, রেস্টুরেন্টে একটি তেলাপোকার ভিডিও ভাইরাল হতে পারে এবং রাতারাতি আপনার ব্যবসা ধ্বংস করে দিতে পারে।"
      },
      sections: {
        en: [
          { type: "h2", text: "Brand Reputation and Health Regulations" },
          { type: "p", text: "Food businesses in Bangladesh face strict challenges in maintaining hygiene. Pests contaminate food prep surfaces and can cause severe food poisoning outbreaks. Furthermore, regulatory bodies require proof of regular pest management." },
          { type: "h3", text: "Audit-Ready Solutions" },
          { type: "p", text: "Surokkha365 provides commercial clients with digital reporting and compliance logs. Our monthly service contracts ensure your premises remain hygienic, passing any sudden health inspections with flying colors." },
          { type: "soft-cta", text: "Protect your brand's reputation today.", linkText: "Corporate Solutions", linkHref: "/services/cockroach-control" }
        ],
        bn: [
          { type: "h2", text: "ব্র্যান্ডের সুনাম এবং স্বাস্থ্য বিধিমালা" },
          { type: "p", text: "বাংলাদেশের খাদ্য ব্যবসা প্রতিষ্ঠানগুলো পরিচ্ছন্নতা বজায় রাখতে কঠোর চ্যালেঞ্জের সম্মুখীন হয়। পেস্ট খাদ্য প্রস্তুতির পৃষ্ঠকে দূষিত করে এবং মারাত্মক ফুড পয়জনিংয়ের কারণ হতে পারে।" },
          { type: "h3", text: "অডিট-রেডি সমাধান" },
          { type: "p", text: "সুরক্ষা৩৬৫ বাণিজ্যিক ক্লায়েন্টদের ডিজিটাল রিপোর্টিং এবং কমপ্লায়েন্স লগ প্রদান করে। আমাদের মাসিক সার্ভিস চুক্তি নিশ্চিত করে যে আপনার প্রাঙ্গণ স্বাস্থ্যকর থাকবে।" },
          { type: "soft-cta", text: "আজই আপনার ব্র্যান্ডের সুনাম রক্ষা করুন।", linkText: "কর্পোরেট সমাধান", linkHref: "/services/cockroach-control" }
        ]
      }
    },
    {
      id: "professional-vs-diy-pest-control",
      title: { en: "Is DIY Pest Control Effective? When to Call Professionals", bn: "নিজেরা পেস্ট কন্ট্রোল করা কি কার্যকর? কখন পেশাদারদের ডাকবেন" },
      excerpt: { en: "Store-bought sprays offer temporary relief, but often fail to solve the root problem. Understand the difference between DIY and professional treatments.", bn: "দোকান থেকে কেনা স্প্রে অস্থায়ী স্বস্তি দেয়, কিন্তু প্রায়শই মূল সমস্যা সমাধানে ব্যর্থ হয়। পার্থক্যটি বুঝুন।" },
      date: { en: "Aug 02, 2026", bn: "২ আগস্ট, ২০২৬" },
      category: { en: "Tips", bn: "টিপস" },
      image: "/pest2.jpg",
      introHook: {
        en: "Have you sprayed a whole can of bug spray, only for the cockroaches to return three days later? You're not alone.",
        bn: "পুরো এক ক্যান বাগ স্প্রে করার তিন দিন পরেই কি তেলাপোকা ফিরে এসেছে? আপনি একা নন।"
      },
      sections: {
        en: [
          { type: "h2", text: "The Limitations of Over-the-Counter Products" },
          { type: "p", text: "Most consumer-grade insecticides are contact killers. They eliminate the pests you see, but do nothing to the hundreds hiding in the nest. In fact, repetitive use can cause pests to build resistance to the chemicals." },
          { type: "p", text: "Professionals identify the species, locate the nesting sites, and use commercial-grade insect growth regulators (IGRs) that stop pests from reproducing, solving the problem permanently." }
        ],
        bn: [
          { type: "h2", text: "দোকান থেকে কেনা পণ্যের সীমাবদ্ধতা" },
          { type: "p", text: "বেশিরভাগ কনজিউমার-গ্রেড কীটনাশক কন্টাক্ট কিলার। এগুলো আপনি যা দেখেন তা মেরে ফেলে, কিন্তু বাসায় লুকিয়ে থাকা শত শত পেস্টের কিছুই করতে পারে না।" },
          { type: "p", text: "পেশাদাররা প্রজাতি চিহ্নিত করে, বাসা বাঁধার স্থানগুলি খুঁজে বের করে এবং কমার্শিয়াল-গ্রেড ইনসেক্ট গ্রোথ রেগুলেটর (IGRs) ব্যবহার করে যা পেস্টের প্রজনন বন্ধ করে।" }
        ]
      }
    },
    {
      id: "bird-netting-balcony-protection",
      title: { en: "Bird Netting: Protecting Your Balconies from Pigeons", bn: "কবুতরের উপদ্রব থেকে ব্যালকনি রক্ষায় বার্ড নেটিং" },
      excerpt: { en: "Pigeon droppings are corrosive and pose health risks. Discover how invisible bird netting offers a humane and highly effective solution.", bn: "কবুতরের বিষ্ঠা ক্ষয়কারী এবং স্বাস্থ্যের জন্য ঝুঁকিপূর্ণ। জানুন কীভাবে বার্ড নেটিং কার্যকর সমাধান দেয়।" },
      date: { en: "Jul 25, 2026", bn: "২৫ জুলাই, ২০২৬" },
      category: { en: "Property Protection", bn: "সম্পত্তি সুরক্ষা" },
      image: "/pest4.jpg",
      introHook: {
        en: "Are your beautiful Dhaka apartment balconies rendered unusable by constant pigeon droppings? Reclaim your space humanely.",
        bn: "আপনার সুন্দর ঢাকার অ্যাপার্টমেন্টের ব্যালকনি কি কবুতরের বিষ্ঠায় ব্যবহারের অযোগ্য হয়ে গেছে? আপনার স্থানটি পুনরুদ্ধার করুন।"
      },
      sections: {
        en: [
          { type: "h2", text: "The Health Hazards of Pigeon Droppings" },
          { type: "p", text: "Pigeon droppings are highly acidic, damaging paint and air conditioning units. Worse, dried droppings can release fungal spores into the air, leading to respiratory diseases like Histoplasmosis when inhaled by humans." },
          { type: "h3", text: "Humane and Invisible Solutions" },
          { type: "p", text: "Spikes can be unsightly, but high-tension, UV-stabilized bird netting is nearly invisible from a distance. It prevents pigeons from roosting without harming the birds or obstructing your view of the city skyline." },
          { type: "soft-cta", text: "Keep your balconies clean. Get a quote for Bird Netting installation.", linkText: "Bird Control", linkHref: "/services/bird-control" }
        ],
        bn: [
          { type: "h2", text: "কবুতরের বিষ্ঠার স্বাস্থ্যঝুঁকি" },
          { type: "p", text: "কবুতরের বিষ্ঠা অত্যন্ত অ্যাসিডিক, যা পেইন্ট এবং এসি ইউনিটের ক্ষতি করে। আরও খারাপ, শুকনো বিষ্ঠা বাতাসে ছত্রাকের রেণু ছাড়তে পারে, যা মানুষের শ্বাসতন্ত্রের রোগ সৃষ্টি করে।" },
          { type: "h3", text: "মানবিক এবং অদৃশ্য সমাধান" },
          { type: "p", text: "উচ্চ-টানযুক্ত, ইউভি-স্ট্যাবিলাইজড বার্ড নেটিং দূর থেকে প্রায় অদৃশ্য। এটি কবুতরের ক্ষতি না করে বা আপনার দৃশ্য বাধাগ্রস্ত না করেই তাদের বসতে বাধা দেয়।" },
          { type: "soft-cta", text: "আপনার ব্যালকনি পরিষ্কার রাখুন। বার্ড নেটিং ইনস্টলেশনের জন্য কোটেশন পান।", linkText: "বার্ড কন্ট্রোল", linkHref: "/services/bird-control" }
        ]
      }
    }
  ] as BlogData[],
  footerServices: [
    { 
      id: "1", text: "Cockroach Control", url: "/services/cockroach-control",
      pageSubtitleEn: "Professional Cockroach Control services by Surokkha365.", pageSubtitleBn: "সুরক্ষা৩৬৫ এর প্রফেশনাল Cockroach Control সার্ভিস।",
      pageContentEn: "We are currently updating our detailed service documentation. Please check back soon or contact us directly to book this service.", pageContentBn: "আমরা বর্তমানে আমাদের বিস্তারিত সার্ভিস ডকুমেন্টেশন আপডেট করছি। অনুগ্রহ করে শীঘ্রই আবার চেক করুন অথবা সরাসরি বুক করতে আমাদের সাথে যোগাযোগ করুন।"
    },
    { 
      id: "2", text: "Termite Treatment", url: "/services/termite-treatment",
      pageSubtitleEn: "Professional Termite Treatment services by Surokkha365.", pageSubtitleBn: "সুরক্ষা৩৬৫ এর প্রফেশনাল Termite Treatment সার্ভিস।",
      pageContentEn: "We are currently updating our detailed service documentation. Please check back soon or contact us directly to book this service.", pageContentBn: "আমরা বর্তমানে আমাদের বিস্তারিত সার্ভিস ডকুমেন্টেশন আপডেট করছি। অনুগ্রহ করে শীঘ্রই আবার চেক করুন অথবা সরাসরি বুক করতে আমাদের সাথে যোগাযোগ করুন।"
    },
    { 
      id: "3", text: "Rodent Control", url: "/services/rodent-control",
      pageSubtitleEn: "Professional Rodent Control services by Surokkha365.", pageSubtitleBn: "সুরক্ষা৩৬৫ এর প্রফেশনাল Rodent Control সার্ভিস।",
      pageContentEn: "We are currently updating our detailed service documentation. Please check back soon or contact us directly to book this service.", pageContentBn: "আমরা বর্তমানে আমাদের বিস্তারিত সার্ভিস ডকুমেন্টেশন আপডেট করছি। অনুগ্রহ করে শীঘ্রই আবার চেক করুন অথবা সরাসরি বুক করতে আমাদের সাথে যোগাযোগ করুন।"
    },
    { 
      id: "4", text: "Mosquito Control", url: "/services/mosquito-control",
      pageSubtitleEn: "Professional Mosquito Control services by Surokkha365.", pageSubtitleBn: "সুরক্ষা৩৬৫ এর প্রফেশনাল Mosquito Control সার্ভিস।",
      pageContentEn: "We are currently updating our detailed service documentation. Please check back soon or contact us directly to book this service.", pageContentBn: "আমরা বর্তমানে আমাদের বিস্তারিত সার্ভিস ডকুমেন্টেশন আপডেট করছি। অনুগ্রহ করে শীঘ্রই আবার চেক করুন অথবা সরাসরি বুক করতে আমাদের সাথে যোগাযোগ করুন।"
    },
    { 
      id: "5", text: "Bedbug Removal", url: "/services/bedbug-removal",
      pageSubtitleEn: "Professional Bedbug Removal services by Surokkha365.", pageSubtitleBn: "সুরক্ষা৩৬৫ এর প্রফেশনাল Bedbug Removal সার্ভিস।",
      pageContentEn: "We are currently updating our detailed service documentation. Please check back soon or contact us directly to book this service.", pageContentBn: "আমরা বর্তমানে আমাদের বিস্তারিত সার্ভিস ডকুমেন্টেশন আপডেট করছি। অনুগ্রহ করে শীঘ্রই আবার চেক করুন অথবা সরাসরি বুক করতে আমাদের সাথে যোগাযোগ করুন।"
    },
    { 
      id: "6", text: "Bird Control", url: "/services/bird-control",
      pageSubtitleEn: "Professional Bird Control services by Surokkha365.", pageSubtitleBn: "সুরক্ষা৩৬৫ এর প্রফেশনাল Bird Control সার্ভিস।",
      pageContentEn: "We are currently updating our detailed service documentation. Please check back soon or contact us directly to book this service.", pageContentBn: "আমরা বর্তমানে আমাদের বিস্তারিত সার্ভিস ডকুমেন্টেশন আপডেট করছি। অনুগ্রহ করে শীঘ্রই আবার চেক করুন অথবা সরাসরি বুক করতে আমাদের সাথে যোগাযোগ করুন।"
    }
  ],
  footerQuickLinks: [
    { id: "1", text: "My Account", url: "/account" },
    { id: "2", text: "Blogs", url: "/blog" },
    { 
      id: "3", text: "Legal statement", url: "/legal/legal-statement",
      pageSubtitleEn: "This is the official Legal Statement for Surokkha365.", pageSubtitleBn: "এটি সুরক্ষা৩৬৫ এর অফিসিয়াল Legal Statement।",
      pageContentEn: "Welcome to the Legal Statement of Surokkha365. \n\nWe are currently drafting the finalized legal documentation for this section to ensure compliance with local regulations and to protect both our customers and our business. \n\nPlease check back soon for the full text. If you have any immediate legal inquiries or need clarification on our terms of service, please contact us at contact@surokkha365.com.\n\nThank you for choosing Surokkha365.", pageContentBn: "সুরক্ষা৩৬৫ এর Legal Statement পৃষ্ঠায় স্বাগতম। \n\nআমরা বর্তমানে এই বিভাগের জন্য চূড়ান্ত আইনি ডকুমেন্টেশন তৈরি করছি। স্থানীয় আইন মেনে চলা এবং আমাদের গ্রাহক ও ব্যবসা উভয়কে সুরক্ষিত করার জন্যই এই পদক্ষেপ।\n\nসম্পূর্ণ টেক্সটের জন্য অনুগ্রহ করে শীঘ্রই আবার চেক করুন। আপনার যদি কোনো তাৎক্ষণিক আইনি জিজ্ঞাসা থাকে অথবা আমাদের পরিষেবার শর্তাবলী সম্পর্কে ব্যাখ্যার প্রয়োজন হয়, তবে অনুগ্রহ করে contact@surokkha365.com এ আমাদের সাথে যোগাযোগ করুন।\n\nসুরক্ষা৩৬৫ বেছে নেওয়ার জন্য আপনাকে ধন্যবাদ।"
    },
    { 
      id: "4", text: "Privacy Policy", url: "/legal/privacy-policy",
      pageSubtitleEn: "This is the official Privacy Policy for Surokkha365.", pageSubtitleBn: "এটি সুরক্ষা৩৬৫ এর অফিসিয়াল Privacy Policy।",
      pageContentEn: "Welcome to the Privacy Policy of Surokkha365. \n\nWe are currently drafting the finalized legal documentation for this section to ensure compliance with local regulations and to protect both our customers and our business. \n\nPlease check back soon for the full text. If you have any immediate legal inquiries or need clarification on our terms of service, please contact us at contact@surokkha365.com.\n\nThank you for choosing Surokkha365.", pageContentBn: "সুরক্ষা৩৬৫ এর Privacy Policy পৃষ্ঠায় স্বাগতম। \n\nআমরা বর্তমানে এই বিভাগের জন্য চূড়ান্ত আইনি ডকুমেন্টেশন তৈরি করছি। স্থানীয় আইন মেনে চলা এবং আমাদের গ্রাহক ও ব্যবসা উভয়কে সুরক্ষিত করার জন্যই এই পদক্ষেপ।\n\nসম্পূর্ণ টেক্সটের জন্য অনুগ্রহ করে শীঘ্রই আবার চেক করুন। আপনার যদি কোনো তাৎক্ষণিক আইনি জিজ্ঞাসা থাকে অথবা আমাদের পরিষেবার শর্তাবলী সম্পর্কে ব্যাখ্যার প্রয়োজন হয়, তবে অনুগ্রহ করে contact@surokkha365.com এ আমাদের সাথে যোগাযোগ করুন।\n\nসুরক্ষা৩৬৫ বেছে নেওয়ার জন্য আপনাকে ধন্যবাদ।"
    },
    { 
      id: "5", text: "Cookie Policy", url: "/legal/cookie-policy",
      pageSubtitleEn: "This is the official Cookie Policy for Surokkha365.", pageSubtitleBn: "এটি সুরক্ষা৩৬৫ এর অফিসিয়াল Cookie Policy।",
      pageContentEn: "Welcome to the Cookie Policy of Surokkha365. \n\nWe are currently drafting the finalized legal documentation for this section to ensure compliance with local regulations and to protect both our customers and our business. \n\nPlease check back soon for the full text. If you have any immediate legal inquiries or need clarification on our terms of service, please contact us at contact@surokkha365.com.\n\nThank you for choosing Surokkha365.", pageContentBn: "সুরক্ষা৩৬৫ এর Cookie Policy পৃষ্ঠায় স্বাগতম। \n\nআমরা বর্তমানে এই বিভাগের জন্য চূড়ান্ত আইনি ডকুমেন্টেশন তৈরি করছি। স্থানীয় আইন মেনে চলা এবং আমাদের গ্রাহক ও ব্যবসা উভয়কে সুরক্ষিত করার জন্যই এই পদক্ষেপ।\n\nসম্পূর্ণ টেক্সটের জন্য অনুগ্রহ করে শীঘ্রই আবার চেক করুন। আপনার যদি কোনো তাৎক্ষণিক আইনি জিজ্ঞাসা থাকে অথবা আমাদের পরিষেবার শর্তাবলী সম্পর্কে ব্যাখ্যার প্রয়োজন হয়, তবে অনুগ্রহ করে contact@surokkha365.com এ আমাদের সাথে যোগাযোগ করুন।\n\nসুরক্ষা৩৬৫ বেছে নেওয়ার জন্য আপনাকে ধন্যবাদ।"
    },
    { 
      id: "6", text: "Jobbing-Service Agreement", url: "/legal/jobbing-agreement",
      pageSubtitleEn: "This is the official Jobbing Agreement for Surokkha365.", pageSubtitleBn: "এটি সুরক্ষা৩৬৫ এর অফিসিয়াল Jobbing Agreement।",
      pageContentEn: "Welcome to the Jobbing Agreement of Surokkha365. \n\nWe are currently drafting the finalized legal documentation for this section to ensure compliance with local regulations and to protect both our customers and our business. \n\nPlease check back soon for the full text. If you have any immediate legal inquiries or need clarification on our terms of service, please contact us at contact@surokkha365.com.\n\nThank you for choosing Surokkha365.", pageContentBn: "সুরক্ষা৩৬৫ এর Jobbing Agreement পৃষ্ঠায় স্বাগতম। \n\nআমরা বর্তমানে এই বিভাগের জন্য চূড়ান্ত আইনি ডকুমেন্টেশন তৈরি করছি। স্থানীয় আইন মেনে চলা এবং আমাদের গ্রাহক ও ব্যবসা উভয়কে সুরক্ষিত করার জন্যই এই পদক্ষেপ।\n\nসম্পূর্ণ টেক্সটের জন্য অনুগ্রহ করে শীঘ্রই আবার চেক করুন। আপনার যদি কোনো তাৎক্ষণিক আইনি জিজ্ঞাসা থাকে অথবা আমাদের পরিষেবার শর্তাবলী সম্পর্কে ব্যাখ্যার প্রয়োজন হয়, তবে অনুগ্রহ করে contact@surokkha365.com এ আমাদের সাথে যোগাযোগ করুন।\n\nসুরক্ষা৩৬৫ বেছে নেওয়ার জন্য আপনাকে ধন্যবাদ।"
    },
    { 
      id: "7", text: "Contract -Service Agreement", url: "/legal/contract-agreement",
      pageSubtitleEn: "This is the official Contract Agreement for Surokkha365.", pageSubtitleBn: "এটি সুরক্ষা৩৬৫ এর অফিসিয়াল Contract Agreement।",
      pageContentEn: "Welcome to the Contract Agreement of Surokkha365. \n\nWe are currently drafting the finalized legal documentation for this section to ensure compliance with local regulations and to protect both our customers and our business. \n\nPlease check back soon for the full text. If you have any immediate legal inquiries or need clarification on our terms of service, please contact us at contact@surokkha365.com.\n\nThank you for choosing Surokkha365.", pageContentBn: "সুরক্ষা৩৬৫ এর Contract Agreement পৃষ্ঠায় স্বাগতম। \n\nআমরা বর্তমানে এই বিভাগের জন্য চূড়ান্ত আইনি ডকুমেন্টেশন তৈরি করছি। স্থানীয় আইন মেনে চলা এবং আমাদের গ্রাহক ও ব্যবসা উভয়কে সুরক্ষিত করার জন্যই এই পদক্ষেপ।\n\nসম্পূর্ণ টেক্সটের জন্য অনুগ্রহ করে শীঘ্রই আবার চেক করুন। আপনার যদি কোনো তাৎক্ষণিক আইনি জিজ্ঞাসা থাকে অথবা আমাদের পরিষেবার শর্তাবলী সম্পর্কে ব্যাখ্যার প্রয়োজন হয়, তবে অনুগ্রহ করে contact@surokkha365.com এ আমাদের সাথে যোগাযোগ করুন।\n\nসুরক্ষা৩৬৫ বেছে নেওয়ার জন্য আপনাকে ধন্যবাদ।"
    },
    { 
      id: "8", text: "Product Agreement", url: "/legal/product-agreement",
      pageSubtitleEn: "This is the official Product Agreement for Surokkha365.", pageSubtitleBn: "এটি সুরক্ষা৩৬৫ এর অফিসিয়াল Product Agreement।",
      pageContentEn: "Welcome to the Product Agreement of Surokkha365. \n\nWe are currently drafting the finalized legal documentation for this section to ensure compliance with local regulations and to protect both our customers and our business. \n\nPlease check back soon for the full text. If you have any immediate legal inquiries or need clarification on our terms of service, please contact us at contact@surokkha365.com.\n\nThank you for choosing Surokkha365.", pageContentBn: "সুরক্ষা৩৬৫ এর Product Agreement পৃষ্ঠায় স্বাগতম। \n\nআমরা বর্তমানে এই বিভাগের জন্য চূড়ান্ত আইনি ডকুমেন্টেশন তৈরি করছি। স্থানীয় আইন মেনে চলা এবং আমাদের গ্রাহক ও ব্যবসা উভয়কে সুরক্ষিত করার জন্যই এই পদক্ষেপ।\n\nসম্পূর্ণ টেক্সটের জন্য অনুগ্রহ করে শীঘ্রই আবার চেক করুন। আপনার যদি কোনো তাৎক্ষণিক আইনি জিজ্ঞাসা থাকে অথবা আমাদের পরিষেবার শর্তাবলী সম্পর্কে ব্যাখ্যার প্রয়োজন হয়, তবে অনুগ্রহ করে contact@surokkha365.com এ আমাদের সাথে যোগাযোগ করুন।\n\nসুরক্ষা৩৬৫ বেছে নেওয়ার জন্য আপনাকে ধন্যবাদ।"
    }
  ]
};

const WebsiteContext = createContext<WebsiteContextType | undefined>(undefined);

export const WebsiteProvider = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  const [seoData, setSeoData] = useState<SEOData>(defaultState.seoData);
  const [heroData, setHeroData] = useState<HeroData>(defaultState.heroData);
  const [servicesData, setServicesData] = useState<ServiceData[]>(defaultState.servicesData);
  const [problemData, setProblemData] = useState<ProblemData>(defaultState.problemData);
  const [differencesData, setDifferencesData] = useState<DifferenceData[]>(defaultState.differencesData);
  const [testimonialsData, setTestimonialsData] = useState<TestimonialData[]>(defaultState.testimonialsData);
  const [testimonialBg, setTestimonialBg] = useState<string>(defaultState.testimonialBg);
  const [blogsData, setBlogsData] = useState<BlogData[]>(defaultState.blogsData);
  const [footerServices, setFooterServices] = useState<LinkData[]>(defaultState.footerServices);
  const [footerQuickLinks, setFooterQuickLinks] = useState<LinkData[]>(defaultState.footerQuickLinks);
  const [contactData, setContactData] = useState<ContactData>(defaultState.contactData);
  const [pricingData, setPricingData] = useState<PricingData>(defaultState.pricingData);

  // Load from Supabase on mount
  useEffect(() => {
    async function loadData() {
      try {
        const { data, error } = await supabase.from('site_content').select('data').eq('id', 1).single();
        let parsed = null;

        if (data && data.data) {
          parsed = data.data;
        } else {
          // Fallback to local storage migration if Supabase is empty
          const saved = localStorage.getItem("surokkha_cms_v8");
          if (saved) {
            parsed = JSON.parse(saved);
            // Migrate to Supabase
            await supabase.from('site_content').insert({ id: 1, data: parsed });
          } else {
            parsed = defaultState;
            await supabase.from('site_content').insert({ id: 1, data: parsed });
          }
        }

        if (parsed) {
          if (parsed.seoData) setSeoData(parsed.seoData);
          if (parsed.heroData) setHeroData(parsed.heroData);
          if (parsed.servicesData) setServicesData(parsed.servicesData);
          if (parsed.problemData) setProblemData(parsed.problemData);
          if (parsed.differencesData) setDifferencesData(parsed.differencesData);
          if (parsed.testimonialsData) setTestimonialsData(parsed.testimonialsData);
          if (parsed.testimonialBg) setTestimonialBg(parsed.testimonialBg);
          if (parsed.blogsData) setBlogsData(parsed.blogsData);
          if (parsed.footerServices) setFooterServices(parsed.footerServices);
          if (parsed.footerQuickLinks) setFooterQuickLinks(parsed.footerQuickLinks);
          if (parsed.contactData) setContactData(parsed.contactData);
          if (parsed.pricingData) {
            // Backward compatibility check
            const firstDivision = Object.values(parsed.pricingData)[0] || {};
            const firstPest = Object.values(firstDivision)[0];
            const needsMigration = typeof firstPest === 'number';
            if (needsMigration) {
              const migratedData: PricingData = {};
              for (const [div, pests] of Object.entries(parsed.pricingData)) {
                migratedData[div] = {};
                for (const [pest, price] of Object.entries(pests as Record<string, number>)) {
                  migratedData[div][pest] = { homes: price, facilities: price * 0.8 };
                }
              }
              setPricingData(migratedData);
            } else {
              setPricingData(parsed.pricingData);
            }
          }
        }
      } catch (e) {
        console.error("Failed to load CMS data from Supabase", e);
      }
      setMounted(true);
    }
    loadData();

    // Cross-tab real-time sync
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "surokkha_cms_v8" && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (parsed.seoData) setSeoData(parsed.seoData);
          if (parsed.heroData) setHeroData(parsed.heroData);
          if (parsed.servicesData) setServicesData(parsed.servicesData);
          if (parsed.problemData) setProblemData(parsed.problemData);
          if (parsed.differencesData) setDifferencesData(parsed.differencesData);
          if (parsed.testimonialsData) setTestimonialsData(parsed.testimonialsData);
          if (parsed.testimonialBg) setTestimonialBg(parsed.testimonialBg);
          if (parsed.blogsData) setBlogsData(parsed.blogsData);
          if (parsed.footerServices) setFooterServices(parsed.footerServices);
          if (parsed.footerQuickLinks) setFooterQuickLinks(parsed.footerQuickLinks);
          if (parsed.contactData) setContactData(parsed.contactData);
          if (parsed.pricingData) {
            const firstDivision = Object.values(parsed.pricingData)[0] || {};
            const firstPest = Object.values(firstDivision)[0];
            const needsMigration = typeof firstPest === 'number';
            if (needsMigration) {
              const migratedData: PricingData = {};
              for (const [div, pests] of Object.entries(parsed.pricingData)) {
                migratedData[div] = {};
                for (const [pest, price] of Object.entries(pests as Record<string, number>)) {
                  migratedData[div][pest] = { homes: price, facilities: price * 0.8 };
                }
              }
              setPricingData(migratedData);
            } else {
              setPricingData(parsed.pricingData);
            }
          }
        } catch (err) {
          console.error("Failed to sync across tabs", err);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const saveToCloud = async () => {
    if (!mounted) return;
    const payload = {
      seoData, heroData, servicesData, problemData, differencesData, testimonialsData, testimonialBg, blogsData, footerServices, footerQuickLinks, contactData, pricingData
    };
    console.log("SAVING TO CLOUD. Current pricingData for Dhaka Termite:", payload.pricingData?.Dhaka?.Termite);
    try {
      await supabase.from('site_content').update({ data: payload }).eq('id', 1);
      // Also save to localStorage as a backup
      localStorage.setItem("surokkha_cms_v8", JSON.stringify(payload));
    } catch (e) {
      console.error("Failed to save CMS data to Supabase", e);
    }
  };

  return (
    <WebsiteContext.Provider value={{
      seoData, setSeoData,
      heroData, setHeroData,
      servicesData, setServicesData,
      problemData, setProblemData,
      differencesData, setDifferencesData,
      testimonialsData, setTestimonialsData,
      testimonialBg, setTestimonialBg,
      blogsData, setBlogsData,
      footerServices, setFooterServices,
      footerQuickLinks, setFooterQuickLinks,
      contactData, setContactData,
      pricingData, setPricingData,
      saveToCloud
    }}>
      {children}
    </WebsiteContext.Provider>
  );
}

export function useWebsiteData() {
  const context = useContext(WebsiteContext);
  if (context === undefined) {
    throw new Error("useWebsiteData must be used within a WebsiteProvider");
  }
  return context;
}
