"use client";

import { useEffect } from "react";
import { useWebsiteData } from "@/context/WebsiteContext";
import { usePathname } from "next/navigation";

export default function SEOClientUpdater() {
  const { seoData } = useWebsiteData();
  const pathname = usePathname();

  useEffect(() => {
    // Only apply global CMS SEO on the homepage (or other global pages)
    // Avoid overwriting specific blog post SEO that is generated dynamically
    if (pathname === "/") {
      if (seoData.title) {
        document.title = seoData.title;
      }
      
      if (seoData.description) {
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
          metaDesc = document.createElement("meta");
          metaDesc.setAttribute("name", "description");
          document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute("content", seoData.description);
      }

      if (seoData.keywords) {
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
          metaKeywords = document.createElement("meta");
          metaKeywords.setAttribute("name", "keywords");
          document.head.appendChild(metaKeywords);
        }
        metaKeywords.setAttribute("content", seoData.keywords);
      }
    }
  }, [seoData, pathname]);

  return null;
}
