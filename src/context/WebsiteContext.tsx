"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";
import { initialBlogsData } from "../data/blogsData";

// Types
export type Bilingual = { en: string; bn: string };

type HeroData = { headline: Bilingual; subheadline: Bilingual; ctaText: Bilingual; bgImage: string };
type ServiceData = { 
  id: number; 
  title: Bilingual; 
  desc: Bilingual; 
  image: string; 
  topImage: string;
  slug?: string;
  pageSubtitle?: Bilingual;
  pageContent?: Bilingual;
};
type ProblemData = { title: Bilingual; desc: Bilingual; image: string };
type DifferenceData = { id: number; title: Bilingual; desc: Bilingual };
type TestimonialData = { id: number; name: Bilingual; review: Bilingual; image?: string };
type SEOData = { title: Bilingual; description: Bilingual; keywords: Bilingual };
export type LinkData = { 
  id: string; 
  text: Bilingual; 
  url: string;
  pageSubtitle?: Bilingual;
  pageContent?: Bilingual;
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
  teamImage: string;
  setTeamImage: (image: string) => void;
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
    title: { en: "Best Pest Control Services in Dhaka | Surokkha365", bn: "ঢাকার সেরা পেস্ট কন্ট্রোল সার্ভিস | সুরক্ষা৩৬৫" },
    description: { en: "Book professional pest control in Dhaka instantly. Urban residential from 10 TK/sq ft. Verified technicians, safe chemicals, and digital audit-ready reports.", bn: "ঢাকায় প্রফেশনাল পেস্ট কন্ট্রোল বুক করুন তাৎক্ষণিকভাবে। ভেরিফাইড টেকনিশিয়ান এবং নিরাপদ কেমিক্যাল।" },
    keywords: { en: "pest control dhaka, termite control bangladesh, cockroach eradication, professional pest exterminator", bn: "পেস্ট কন্ট্রোল ঢাকা, উইপোকা দমন বাংলাদেশ, তেলাপোকা দমন" }
  },
  heroData: {
    headline: { en: "Book Pest Control in 60s, Get Proof Afterwards.", bn: "এক মিনিটে বুক করুন পেস্ট কন্ট্রোল, এবং পরে প্রমাণ পান।" },
    subheadline: { en: "Fixed per sq ft pricing. Verified technicians. Digital audit-ready reports after every visit.", bn: "স্কয়ার ফিট প্রতি নির্ধারিত মূল্য। যাচাইকৃত টেকনিশিয়ান। প্রতিটি ভিজিটের পর অডিট-রেডি ডিজিটাল রিপোর্ট।" },
    ctaText: { en: "Calculate Price & Book Now", bn: "মূল্য হিসাব করুন এবং বুক করুন" },
    bgImage: "/hero-bg.jpg"
  },
  servicesData: [
    { 
      id: 1, title: { en: "Termite", bn: "উইপোকা" }, desc: { en: "Protect your Dhaka property with professional termite eradication and soil treatments.", bn: "প্রফেশনাল উইপোকা দমন পদ্ধতির মাধ্যমে আপনার সম্পত্তি রক্ষা করুন।" }, image: "/pest1.jpg", topImage: "/pest2.jpg",
      slug: "termite-treatment", pageSubtitle: { en: "Professional Termite Treatment services by Surokkha365.", bn: "সুরক্ষা৩৬৫ এর প্রফেশনাল Termite Treatment সার্ভিস।" }, pageContent: { en: "We are currently updating our detailed service documentation. Please check back soon or contact us directly to book this service.", bn: "আমরা বর্তমানে আমাদের বিস্তারিত সার্ভিস ডকুমেন্টেশন আপডেট করছি। অনুগ্রহ করে শীঘ্রই আবার চেক করুন অথবা সরাসরি বুক করতে আমাদের সাথে যোগাযোগ করুন।" }
    },
    { 
      id: 2, title: { en: "Cockroach", bn: "তেলাপোকা" }, desc: { en: "Advanced gel baiting to eliminate cockroaches from commercial and residential kitchens.", bn: "উন্নত জেল বেটিং এর মাধ্যমে তেলাপোকা নির্মূল।" }, image: "/pest3.jpg", topImage: "/pest4.jpg",
      slug: "cockroach-control", pageSubtitle: { en: "Professional Cockroach Control services by Surokkha365.", bn: "সুরক্ষা৩৬৫ এর প্রফেশনাল Cockroach Control সার্ভিস।" }, pageContent: { en: "We are currently updating our detailed service documentation. Please check back soon or contact us directly to book this service.", bn: "আমরা বর্তমানে আমাদের বিস্তারিত সার্ভিস ডকুমেন্টেশন আপডেট করছি। অনুগ্রহ করে শীঘ্রই আবার চেক করুন অথবা সরাসরি বুক করতে আমাদের সাথে যোগাযোগ করুন।" }
    },
    { 
      id: 3, title: { en: "Rodent", bn: "ইঁদুর" }, desc: { en: "Keep your warehouse or home safe from rodents with our compliant bait station methods.", bn: "ইঁদুরের হাত থেকে আপনার বাসা বা অফিস নিরাপদ রাখুন।" }, image: "/pest2.jpg", topImage: "/pest1.jpg",
      slug: "rodent-control", pageSubtitle: { en: "Professional Rodent Control services by Surokkha365.", bn: "সুরক্ষা৩৬৫ এর প্রফেশনাল Rodent Control সার্ভিস।" }, pageContent: { en: "We are currently updating our detailed service documentation. Please check back soon or contact us directly to book this service.", bn: "আমরা বর্তমানে আমাদের বিস্তারিত সার্ভিস ডকুমেন্টেশন আপডেট করছি। অনুগ্রহ করে শীঘ্রই আবার চেক করুন অথবা সরাসরি বুক করতে আমাদের সাথে যোগাযোগ করুন।" }
    },
    { 
      id: 4, title: { en: "Mosquito", bn: "মশা" }, desc: { en: "Specialized fogging and source reduction to keep your area mosquito and dengue-free.", bn: "ফগিং এবং উৎস ধ্বংসের মাধ্যমে মশামুক্ত পরিবেশ।" }, image: "/pest4.jpg", topImage: "/pest3.jpg",
      slug: "mosquito-control", pageSubtitle: { en: "Professional Mosquito Control services by Surokkha365.", bn: "সুরক্ষা৩৬৫ এর প্রফেশনাল Mosquito Control সার্ভিস।" }, pageContent: { en: "We are currently updating our detailed service documentation. Please check back soon or contact us directly to book this service.", bn: "আমরা বর্তমানে আমাদের বিস্তারিত সার্ভিস ডকুমেন্টেশন আপডেট করছি। অনুগ্রহ করে শীঘ্রই আবার চেক করুন অথবা সরাসরি বুক করতে আমাদের সাথে যোগাযোগ করুন।" }
    },
    { 
      id: 5, title: { en: "Bed Bug", bn: "ছাড়পোকা" }, desc: { en: "Targeted bed bug eradication for hotels and homes to ensure peaceful sleep.", bn: "শান্তিপূর্ণ ঘুমের জন্য ছাড়পোকা দমন।" }, image: "/pest1.jpg", topImage: "/pest2.jpg",
      slug: "bedbug-removal", pageSubtitle: { en: "Professional Bedbug Removal services by Surokkha365.", bn: "সুরক্ষা৩৬৫ এর প্রফেশনাল Bedbug Removal সার্ভিস।" }, pageContent: { en: "We are currently updating our detailed service documentation. Please check back soon or contact us directly to book this service.", bn: "আমরা বর্তমানে আমাদের বিস্তারিত সার্ভিস ডকুমেন্টেশন আপডেট করছি। অনুগ্রহ করে শীঘ্রই আবার চেক করুন অথবা সরাসরি বুক করতে আমাদের সাথে যোগাযোগ করুন।" }
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
    title: { en: "Safeguarding Dhaka Businesses & Homes", bn: "ব্যবসা, বাসা এবং কমিউনিটির সুরক্ষা" },
    desc: { en: "Facilities across Bangladesh struggle with non-compliant vendors using harmful chemicals without providing audit-ready reports.", bn: "ফ্যাসিলিটিগুলো এমন ভেন্ডরদের নিয়ে সমস্যায় পড়ে যারা সঠিক কেমিক্যাল ব্যবহার করে না এবং অডিটের জন্য উপযুক্ত রিপোর্ট দিতে ব্যর্থ হয়।" },
    image: "/problem.jpg"
  },
  differencesData: [
    { id: 1, title: { en: "Transparent Pricing", bn: "স্বচ্ছ মূল্য নির্ধারণ" }, desc: { en: "No hidden fees, fixed per sq ft.", bn: "কোন লুকানো চার্জ নেই, স্কয়ার ফিট প্রতি নির্ধারিত মূল্য।" } },
    { id: 2, title: { en: "Verified Technicians", bn: "যাচাইকৃত টেকনিশিয়ান" }, desc: { en: "Background-checked professionals.", bn: "ব্যাকগ্রাউন্ড চেক করা পেশাদার কর্মীবৃন্দ।" } },
    { id: 3, title: { en: "Audit-Ready Reports", bn: "অডিট-রেডি রিপোর্ট" }, desc: { en: "Compliance logs delivered digitally.", bn: "ডিজিটাল কমপ্লায়েন্স লগ।" } },
    { id: 4, title: { en: "Guaranteed Results", bn: "গ্যারান্টিযুক্ত ফলাফল" }, desc: { en: "Follow-ups included in warranty.", bn: "ওয়ারেন্টির অন্তর্ভুক্ত ফলো-আপ।" } }
  ],
  teamImage: "/technicians.jpg",
  testimonialsData: [
    { id: 1, name: { en: "Rahul Patel", bn: "রাহুল প্যাটেল" }, review: { en: "We didn't expect overnight magic, but within a short time, the situation became much more manageable and comfortable. We're quite happy with the results.", bn: "আমরা রাতারাতি জাদুর আশা করিনি, তবে অল্প সময়ের মধ্যে পরিস্থিতি অনেক ভালো হয়েছে।" }, image: "" },
    { id: 2, name: { en: "Rajesh Varma", bn: "রাজেশ বর্মা" }, review: { en: "It's been several months since the treatment and there are no fresh signs of damage. That itself speaks volumes. We're very satisfied with this.", bn: "ট্রিটমেন্টের পর কয়েক মাস কেটে গেছে এবং নতুন করে কোন ক্ষতি দেখা যায়নি। আমরা এতে খুবই সন্তুষ্ট।" }, image: "" },
    { id: 3, name: { en: "Sonia Akter", bn: "সোনিয়া আক্তার" }, review: { en: "Very professional and clean service. The technicians arrived on time and explained the entire process. Highly recommended for termite control.", bn: "খুবই প্রফেশনাল এবং পরিচ্ছন্ন সার্ভিস। টেকনিশিয়ানরা সময়মতো পৌঁছে পুরো প্রক্রিয়াটি বুঝিয়ে বলেছেন।" }, image: "" }
  ],
  testimonialBg: "/testimonial-bg.jpg",
  blogsData: initialBlogsData as unknown as BlogData[],
  footerServices: [
    { 
      id: "1", text: { en: "Cockroach Control", bn: "তেলাপোকা দমন" }, url: "/services/cockroach-control",
      pageSubtitle: { en: "Professional Cockroach Control services by Surokkha365.", bn: "সুরক্ষা৩৬৫ এর প্রফেশনাল Cockroach Control সার্ভিস।" },
      pageContent: { en: "We are currently updating our detailed service documentation. Please check back soon or contact us directly to book this service.", bn: "আমরা বর্তমানে আমাদের বিস্তারিত সার্ভিস ডকুমেন্টেশন আপডেট করছি। অনুগ্রহ করে শীঘ্রই আবার চেক করুন অথবা সরাসরি বুক করতে আমাদের সাথে যোগাযোগ করুন।" }
    },
    { 
      id: "2", text: { en: "Termite Treatment", bn: "উইপোকা দমন" }, url: "/services/termite-treatment",
      pageSubtitle: { en: "Professional Termite Treatment services by Surokkha365.", bn: "সুরক্ষা৩৬৫ এর প্রফেশনাল Termite Treatment সার্ভিস।" },
      pageContent: { en: "We are currently updating our detailed service documentation. Please check back soon or contact us directly to book this service.", bn: "আমরা বর্তমানে আমাদের বিস্তারিত সার্ভিস ডকুমেন্টেশন আপডেট করছি। অনুগ্রহ করে শীঘ্রই আবার চেক করুন অথবা সরাসরি বুক করতে আমাদের সাথে যোগাযোগ করুন।" }
    },
    { 
      id: "3", text: { en: "Rodent Control", bn: "ইঁদুর দমন" }, url: "/services/rodent-control",
      pageSubtitle: { en: "Professional Rodent Control services by Surokkha365.", bn: "সুরক্ষা৩৬৫ এর প্রফেশনাল Rodent Control সার্ভিস।" },
      pageContent: { en: "We are currently updating our detailed service documentation. Please check back soon or contact us directly to book this service.", bn: "আমরা বর্তমানে আমাদের বিস্তারিত সার্ভিস ডকুমেন্টেশন আপডেট করছি। অনুগ্রহ করে শীঘ্রই আবার চেক করুন অথবা সরাসরি বুক করতে আমাদের সাথে যোগাযোগ করুন।" }
    },
    { 
      id: "4", text: { en: "Mosquito Control", bn: "মশা দমন" }, url: "/services/mosquito-control",
      pageSubtitle: { en: "Professional Mosquito Control services by Surokkha365.", bn: "সুরক্ষা৩৬৫ এর প্রফেশনাল Mosquito Control সার্ভিস।" },
      pageContent: { en: "We are currently updating our detailed service documentation. Please check back soon or contact us directly to book this service.", bn: "আমরা বর্তমানে আমাদের বিস্তারিত সার্ভিস ডকুমেন্টেশন আপডেট করছি। অনুগ্রহ করে শীঘ্রই আবার চেক করুন অথবা সরাসরি বুক করতে আমাদের সাথে যোগাযোগ করুন।" }
    },
    { 
      id: "5", text: { en: "Bedbug Removal", bn: "ছাড়পোকা দমন" }, url: "/services/bedbug-removal",
      pageSubtitle: { en: "Professional Bedbug Removal services by Surokkha365.", bn: "সুরক্ষা৩৬৫ এর প্রফেশনাল Bedbug Removal সার্ভিস।" },
      pageContent: { en: "We are currently updating our detailed service documentation. Please check back soon or contact us directly to book this service.", bn: "আমরা বর্তমানে আমাদের বিস্তারিত সার্ভিস ডকুমেন্টেশন আপডেট করছি। অনুগ্রহ করে শীঘ্রই আবার চেক করুন অথবা সরাসরি বুক করতে আমাদের সাথে যোগাযোগ করুন।" }
    },
    { 
      id: "6", text: { en: "Bird Control", bn: "পাখি নিয়ন্ত্রণ" }, url: "/services/bird-control",
      pageSubtitle: { en: "Professional Bird Control services by Surokkha365.", bn: "সুরক্ষা৩৬৫ এর প্রফেশনাল Bird Control সার্ভিস।" },
      pageContent: { en: "We are currently updating our detailed service documentation. Please check back soon or contact us directly to book this service.", bn: "আমরা বর্তমানে আমাদের বিস্তারিত সার্ভিস ডকুমেন্টেশন আপডেট করছি। অনুগ্রহ করে শীঘ্রই আবার চেক করুন অথবা সরাসরি বুক করতে আমাদের সাথে যোগাযোগ করুন।" }
    }
  ],
  footerQuickLinks: [
    { id: "1", text: { en: "My Account", bn: "আমার অ্যাকাউন্ট" }, url: "/account" },
    { id: "2", text: { en: "Blogs", bn: "ব্লগ" }, url: "/blog" },
    { 
      id: "3", text: { en: "Legal statement", bn: "লিগ্যাল স্টেটমেন্ট" }, url: "/legal/legal-statement",
      pageSubtitle: { en: "This is the official Legal Statement for Surokkha365.", bn: "এটি সুরক্ষা৩৬৫ এর অফিসিয়াল Legal Statement।" },
      pageContent: { en: "Welcome to the Legal Statement of Surokkha365. \n\nWe are currently drafting the finalized legal documentation for this section to ensure compliance with local regulations and to protect both our customers and our business. \n\nPlease check back soon for the full text. If you have any immediate legal inquiries or need clarification on our terms of service, please contact us at contact@surokkha365.com.\n\nThank you for choosing Surokkha365.", bn: "সুরক্ষা৩৬৫ এর Legal Statement পৃষ্ঠায় স্বাগতম। \n\nআমরা বর্তমানে এই বিভাগের জন্য চূড়ান্ত আইনি ডকুমেন্টেশন তৈরি করছি। স্থানীয় আইন মেনে চলা এবং আমাদের গ্রাহক ও ব্যবসা উভয়কে সুরক্ষিত করার জন্যই এই পদক্ষেপ।\n\nসম্পূর্ণ টেক্সটের জন্য অনুগ্রহ করে শীঘ্রই আবার চেক করুন। আপনার যদি কোনো তাৎক্ষণিক আইনি জিজ্ঞাসা থাকে অথবা আমাদের পরিষেবার শর্তাবলী সম্পর্কে ব্যাখ্যার প্রয়োজন হয়, তবে অনুগ্রহ করে contact@surokkha365.com এ আমাদের সাথে যোগাযোগ করুন।\n\nসুরক্ষা৩৬৫ বেছে নেওয়ার জন্য আপনাকে ধন্যবাদ।" }
    },
    { 
      id: "4", text: { en: "Privacy Policy", bn: "প্রাইভেসি পলিসি" }, url: "/legal/privacy-policy",
      pageSubtitle: { en: "This is the official Privacy Policy for Surokkha365.", bn: "এটি সুরক্ষা৩৬৫ এর অফিসিয়াল Privacy Policy।" },
      pageContent: { en: "Welcome to the Privacy Policy of Surokkha365. \n\nWe are currently drafting the finalized legal documentation for this section to ensure compliance with local regulations and to protect both our customers and our business. \n\nPlease check back soon for the full text. If you have any immediate legal inquiries or need clarification on our terms of service, please contact us at contact@surokkha365.com.\n\nThank you for choosing Surokkha365.", bn: "সুরক্ষা৩৬৫ এর Privacy Policy পৃষ্ঠায় স্বাগতম। \n\nআমরা বর্তমানে এই বিভাগের জন্য চূড়ান্ত আইনি ডকুমেন্টেশন তৈরি করছি। স্থানীয় আইন মেনে চলা এবং আমাদের গ্রাহক ও ব্যবসা উভয়কে সুরক্ষিত করার জন্যই এই পদক্ষেপ।\n\nসম্পূর্ণ টেক্সটের জন্য অনুগ্রহ করে শীঘ্রই আবার চেক করুন। আপনার যদি কোনো তাৎক্ষণিক আইনি জিজ্ঞাসা থাকে অথবা আমাদের পরিষেবার শর্তাবলী সম্পর্কে ব্যাখ্যার প্রয়োজন হয়, তবে অনুগ্রহ করে contact@surokkha365.com এ আমাদের সাথে যোগাযোগ করুন।\n\nসুরক্ষা৩৬৫ বেছে নেওয়ার জন্য আপনাকে ধন্যবাদ।" }
    },
    { 
      id: "5", text: { en: "Cookie Policy", bn: "কুকি পলিসি" }, url: "/legal/cookie-policy",
      pageSubtitle: { en: "This is the official Cookie Policy for Surokkha365.", bn: "এটি সুরক্ষা৩৬৫ এর অফিসিয়াল Cookie Policy।" },
      pageContent: { en: "Welcome to the Cookie Policy of Surokkha365. \n\nWe are currently drafting the finalized legal documentation for this section to ensure compliance with local regulations and to protect both our customers and our business. \n\nPlease check back soon for the full text. If you have any immediate legal inquiries or need clarification on our terms of service, please contact us at contact@surokkha365.com.\n\nThank you for choosing Surokkha365.", bn: "সুরক্ষা৩৬৫ এর Cookie Policy পৃষ্ঠায় স্বাগতম। \n\nআমরা বর্তমানে এই বিভাগের জন্য চূড়ান্ত আইনি ডকুমেন্টেশন তৈরি করছি। স্থানীয় আইন মেনে চলা এবং আমাদের গ্রাহক ও ব্যবসা উভয়কে সুরক্ষিত করার জন্যই এই পদক্ষেপ।\n\nসম্পূর্ণ টেক্সটের জন্য অনুগ্রহ করে শীঘ্রই আবার চেক করুন। আপনার যদি কোনো তাৎক্ষণিক আইনি জিজ্ঞাসা থাকে অথবা আমাদের পরিষেবার শর্তাবলী সম্পর্কে ব্যাখ্যার প্রয়োজন হয়, তবে অনুগ্রহ করে contact@surokkha365.com এ আমাদের সাথে যোগাযোগ করুন।\n\nসুরক্ষা৩৬৫ বেছে নেওয়ার জন্য আপনাকে ধন্যবাদ।" }
    },
    { 
      id: "6", text: { en: "Jobbing-Service Agreement", bn: "জবিং সার্ভিস এগ্রিমেন্ট" }, url: "/legal/jobbing-agreement",
      pageSubtitle: { en: "This is the official Jobbing Agreement for Surokkha365.", bn: "এটি সুরক্ষা৩৬৫ এর অফিসিয়াল Jobbing Agreement।" },
      pageContent: { en: "Welcome to the Jobbing Agreement of Surokkha365. \n\nWe are currently drafting the finalized legal documentation for this section to ensure compliance with local regulations and to protect both our customers and our business. \n\nPlease check back soon for the full text. If you have any immediate legal inquiries or need clarification on our terms of service, please contact us at contact@surokkha365.com.\n\nThank you for choosing Surokkha365.", bn: "সুরক্ষা৩৬৫ এর Jobbing Agreement পৃষ্ঠায় স্বাগতম। \n\nআমরা বর্তমানে এই বিভাগের জন্য চূড়ান্ত আইনি ডকুমেন্টেশন তৈরি করছি। স্থানীয় আইন মেনে চলা এবং আমাদের গ্রাহক ও ব্যবসা উভয়কে সুরক্ষিত করার জন্যই এই পদক্ষেপ।\n\nসম্পূর্ণ টেক্সটের জন্য অনুগ্রহ করে শীঘ্রই আবার চেক করুন। আপনার যদি কোনো তাৎক্ষণিক আইনি জিজ্ঞাসা থাকে অথবা আমাদের পরিষেবার শর্তাবলী সম্পর্কে ব্যাখ্যার প্রয়োজন হয়, তবে অনুগ্রহ করে contact@surokkha365.com এ আমাদের সাথে যোগাযোগ করুন।\n\nসুরক্ষা৩৬৫ বেছে নেওয়ার জন্য আপনাকে ধন্যবাদ।" }
    },
    { 
      id: "7", text: { en: "Contract -Service Agreement", bn: "কন্ট্রাক্ট সার্ভিস এগ্রিমেন্ট" }, url: "/legal/contract-agreement",
      pageSubtitle: { en: "This is the official Contract Agreement for Surokkha365.", bn: "এটি সুরক্ষা৩৬৫ এর অফিসিয়াল Contract Agreement।" },
      pageContent: { en: "Welcome to the Contract Agreement of Surokkha365. \n\nWe are currently drafting the finalized legal documentation for this section to ensure compliance with local regulations and to protect both our customers and our business. \n\nPlease check back soon for the full text. If you have any immediate legal inquiries or need clarification on our terms of service, please contact us at contact@surokkha365.com.\n\nThank you for choosing Surokkha365.", bn: "সুরক্ষা৩৬৫ এর Contract Agreement পৃষ্ঠায় স্বাগতম। \n\nআমরা বর্তমানে এই বিভাগের জন্য চূড়ান্ত আইনি ডকুমেন্টেশন তৈরি করছি। স্থানীয় আইন মেনে চলা এবং আমাদের গ্রাহক ও ব্যবসা উভয়কে সুরক্ষিত করার জন্যই এই পদক্ষেপ।\n\nসম্পূর্ণ টেক্সটের জন্য অনুগ্রহ করে শীঘ্রই আবার চেক করুন। আপনার যদি কোনো তাৎক্ষণিক আইনি জিজ্ঞাসা থাকে অথবা আমাদের পরিষেবার শর্তাবলী সম্পর্কে ব্যাখ্যার প্রয়োজন হয়, তবে অনুগ্রহ করে contact@surokkha365.com এ আমাদের সাথে যোগাযোগ করুন।\n\nসুরক্ষা৩৬৫ বেছে নেওয়ার জন্য আপনাকে ধন্যবাদ।" }
    },
    { 
      id: "8", text: { en: "Product Agreement", bn: "প্রোডাক্ট এগ্রিমেন্ট" }, url: "/legal/product-agreement",
      pageSubtitle: { en: "This is the official Product Agreement for Surokkha365.", bn: "এটি সুরক্ষা৩৬৫ এর অফিসিয়াল Product Agreement।" },
      pageContent: { en: "Welcome to the Product Agreement of Surokkha365. \n\nWe are currently drafting the finalized legal documentation for this section to ensure compliance with local regulations and to protect both our customers and our business. \n\nPlease check back soon for the full text. If you have any immediate legal inquiries or need clarification on our terms of service, please contact us at contact@surokkha365.com.\n\nThank you for choosing Surokkha365.", bn: "সুরক্ষা৩৬৫ এর Product Agreement পৃষ্ঠায় স্বাগতম। \n\nআমরা বর্তমানে এই বিভাগের জন্য চূড়ান্ত আইনি ডকুমেন্টেশন তৈরি করছি। স্থানীয় আইন মেনে চলা এবং আমাদের গ্রাহক ও ব্যবসা উভয়কে সুরক্ষিত করার জন্যই এই পদক্ষেপ।\n\nসম্পূর্ণ টেক্সটের জন্য অনুগ্রহ করে শীঘ্রই আবার চেক করুন। আপনার যদি কোনো তাৎক্ষণিক আইনি জিজ্ঞাসা থাকে অথবা আমাদের পরিষেবার শর্তাবলী সম্পর্কে ব্যাখ্যার প্রয়োজন হয়, তবে অনুগ্রহ করে contact@surokkha365.com এ আমাদের সাথে যোগাযোগ করুন।\n\nসুরক্ষা৩৬৫ বেছে নেওয়ার জন্য আপনাকে ধন্যবাদ।" }
    }
  ]
};

const WebsiteContext = createContext<WebsiteContextType | undefined>(undefined);


function ensureBilingual(data: any, fallbackBn: string = "") {
  if (!data) return { en: "", bn: fallbackBn };
  if (typeof data === 'string') return { en: data, bn: fallbackBn };
  return data;
}

export const WebsiteProvider = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  const [seoData, setSeoData] = useState<SEOData>(defaultState.seoData);
  const [heroData, setHeroData] = useState<HeroData>(defaultState.heroData);
  const [servicesData, setServicesData] = useState<ServiceData[]>(defaultState.servicesData);
  const [problemData, setProblemData] = useState<ProblemData>(defaultState.problemData);
  const [differencesData, setDifferencesData] = useState<DifferenceData[]>(defaultState.differencesData);
  const [teamImage, setTeamImage] = useState<string>(defaultState.teamImage);
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
          if (parsed.seoData) {
            setSeoData({
              ...parsed.seoData,
              title: ensureBilingual(parsed.seoData.title, defaultState.seoData.title.bn),
              description: ensureBilingual(parsed.seoData.description, defaultState.seoData.description.bn),
              keywords: ensureBilingual(parsed.seoData.keywords, defaultState.seoData.keywords.bn)
            });
          }
          if (parsed.heroData) {
            setHeroData({
              ...parsed.heroData,
              headline: ensureBilingual(parsed.heroData.headline, defaultState.heroData.headline.bn),
              subheadline: ensureBilingual(parsed.heroData.subheadline, defaultState.heroData.subheadline.bn),
              ctaText: ensureBilingual(parsed.heroData.ctaText, defaultState.heroData.ctaText.bn)
            });
          }
          if (parsed.servicesData) {
            setServicesData(parsed.servicesData.map((s: any, i: number) => {
              const def = defaultState.servicesData[i] || defaultState.servicesData[0];
              return {
                ...s,
                title: ensureBilingual(s.title, def.title.bn),
                desc: ensureBilingual(s.desc, def.desc.bn),
                pageSubtitle: ensureBilingual(s.pageSubtitle || s.pageSubtitleEn, def.pageSubtitle?.bn),
                pageContent: ensureBilingual(s.pageContent || s.pageContentEn, def.pageContent?.bn)
              };
            }));
          }
          if (parsed.problemData) {
            setProblemData({
              ...parsed.problemData,
              title: ensureBilingual(parsed.problemData.title, defaultState.problemData.title.bn),
              desc: ensureBilingual(parsed.problemData.desc, defaultState.problemData.desc.bn)
            });
          }
          if (parsed.differencesData) {
            setDifferencesData(parsed.differencesData.map((d: any, i: number) => {
              const def = defaultState.differencesData[i] || defaultState.differencesData[0];
              return {
                ...d,
                title: ensureBilingual(d.title, def.title.bn),
                desc: ensureBilingual(d.desc, def.desc.bn)
              };
            }));
          }
          if (parsed.teamImage) setTeamImage(parsed.teamImage);
          if (parsed.testimonialsData) {
            setTestimonialsData(parsed.testimonialsData.map((t: any, i: number) => {
              const def = defaultState.testimonialsData[i] || defaultState.testimonialsData[0];
              return {
                ...t,
                name: ensureBilingual(t.name, def?.name?.bn || ""),
                review: ensureBilingual(t.review, def?.review?.bn || "")
              };
            }));
          }
          if (parsed.testimonialBg) setTestimonialBg(parsed.testimonialBg);
          if (parsed.blogsData) {
            if (parsed.blogsData.length < 5) {
              setBlogsData(defaultState.blogsData);
              parsed.blogsData = defaultState.blogsData;
              await supabase.from('site_content').update({ data: parsed }).eq('id', 1);
            } else {
              setBlogsData(parsed.blogsData);
            }
          }
          if (parsed.footerServices) {
            setFooterServices(parsed.footerServices.map((l: any, i: number) => {
              const def = defaultState.footerServices[i] || defaultState.footerServices[0];
              return {
                ...l,
                text: ensureBilingual(l.text, def.text.bn),
                pageSubtitle: ensureBilingual(l.pageSubtitle || l.pageSubtitleEn, def.pageSubtitle?.bn),
                pageContent: ensureBilingual(l.pageContent || l.pageContentEn, def.pageContent?.bn)
              };
            }));
          }
          if (parsed.footerQuickLinks) {
            setFooterQuickLinks(parsed.footerQuickLinks.map((l: any, i: number) => {
              const def = defaultState.footerQuickLinks[i] || defaultState.footerQuickLinks[0];
              return {
                ...l,
                text: ensureBilingual(l.text, def.text.bn),
                pageSubtitle: ensureBilingual(l.pageSubtitle || l.pageSubtitleEn, def.pageSubtitle?.bn),
                pageContent: ensureBilingual(l.pageContent || l.pageContentEn, def.pageContent?.bn)
              };
            }));
          }
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
          if (parsed.seoData) {
            setSeoData({
              ...parsed.seoData,
              title: ensureBilingual(parsed.seoData.title, defaultState.seoData.title.bn),
              description: ensureBilingual(parsed.seoData.description, defaultState.seoData.description.bn),
              keywords: ensureBilingual(parsed.seoData.keywords, defaultState.seoData.keywords.bn)
            });
          }
          if (parsed.heroData) {
            setHeroData({
              ...parsed.heroData,
              headline: ensureBilingual(parsed.heroData.headline, defaultState.heroData.headline.bn),
              subheadline: ensureBilingual(parsed.heroData.subheadline, defaultState.heroData.subheadline.bn),
              ctaText: ensureBilingual(parsed.heroData.ctaText, defaultState.heroData.ctaText.bn)
            });
          }
          if (parsed.servicesData) {
            setServicesData(parsed.servicesData.map((s: any, i: number) => {
              const def = defaultState.servicesData[i] || defaultState.servicesData[0];
              return {
                ...s,
                title: ensureBilingual(s.title, def.title.bn),
                desc: ensureBilingual(s.desc, def.desc.bn),
                pageSubtitle: ensureBilingual(s.pageSubtitle || s.pageSubtitleEn, def.pageSubtitle?.bn),
                pageContent: ensureBilingual(s.pageContent || s.pageContentEn, def.pageContent?.bn)
              };
            }));
          }
          if (parsed.problemData) {
            setProblemData({
              ...parsed.problemData,
              title: ensureBilingual(parsed.problemData.title, defaultState.problemData.title.bn),
              desc: ensureBilingual(parsed.problemData.desc, defaultState.problemData.desc.bn)
            });
          }
          if (parsed.differencesData) {
            setDifferencesData(parsed.differencesData.map((d: any, i: number) => {
              const def = defaultState.differencesData[i] || defaultState.differencesData[0];
              return {
                ...d,
                title: ensureBilingual(d.title, def.title.bn),
                desc: ensureBilingual(d.desc, def.desc.bn)
              };
            }));
          }
          if (parsed.teamImage) setTeamImage(parsed.teamImage);
          if (parsed.testimonialsData) {
            setTestimonialsData(parsed.testimonialsData.map((t: any, i: number) => {
              const def = defaultState.testimonialsData[i] || defaultState.testimonialsData[0];
              return {
                ...t,
                name: ensureBilingual(t.name, def?.name?.bn || ""),
                review: ensureBilingual(t.review, def?.review?.bn || "")
              };
            }));
          }
          if (parsed.testimonialBg) setTestimonialBg(parsed.testimonialBg);
          if (parsed.blogsData) setBlogsData(parsed.blogsData);
          if (parsed.footerServices) {
            setFooterServices(parsed.footerServices.map((l: any, i: number) => {
              const def = defaultState.footerServices[i] || defaultState.footerServices[0];
              return {
                ...l,
                text: ensureBilingual(l.text, def.text.bn),
                pageSubtitle: ensureBilingual(l.pageSubtitle || l.pageSubtitleEn, def.pageSubtitle?.bn),
                pageContent: ensureBilingual(l.pageContent || l.pageContentEn, def.pageContent?.bn)
              };
            }));
          }
          if (parsed.footerQuickLinks) {
            setFooterQuickLinks(parsed.footerQuickLinks.map((l: any, i: number) => {
              const def = defaultState.footerQuickLinks[i] || defaultState.footerQuickLinks[0];
              return {
                ...l,
                text: ensureBilingual(l.text, def.text.bn),
                pageSubtitle: ensureBilingual(l.pageSubtitle || l.pageSubtitleEn, def.pageSubtitle?.bn),
                pageContent: ensureBilingual(l.pageContent || l.pageContentEn, def.pageContent?.bn)
              };
            }));
          }
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
      seoData, heroData, servicesData, problemData, differencesData, teamImage, testimonialsData, testimonialBg, blogsData, footerServices, footerQuickLinks, contactData, pricingData
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
      teamImage, setTeamImage,
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
