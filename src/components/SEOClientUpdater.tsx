"use client";

import { useEffect } from "react";
import { useWebsiteData } from "@/context/WebsiteContext";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/LanguageContext";

export default function SEOClientUpdater() {
  const { seoData } = useWebsiteData();
  const { lang } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    // Only apply global CMS SEO on the homepage (or other global pages)
    // Avoid overwriting specific blog post SEO that is generated dynamically
    if (pathname === "/") {
      if (seoData.title) {
        document.title = seoData.title[lang as "en"|"bn"] || seoData.title.en;
      }
      
      if (seoData.description) {
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
          metaDesc = document.createElement("meta");
          metaDesc.setAttribute("name", "description");
          document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute("content", seoData.description[lang as "en"|"bn"] || seoData.description.en);
      }

      if (seoData.keywords) {
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
          metaKeywords = document.createElement("meta");
          metaKeywords.setAttribute("name", "keywords");
          document.head.appendChild(metaKeywords);
        }
        metaKeywords.setAttribute("content", seoData.keywords[lang as "en"|"bn"] || seoData.keywords.en);
      }
    }
  }, [seoData, pathname]);

  return null;
}
