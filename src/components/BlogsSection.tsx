"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useWebsiteData } from "../context/WebsiteContext";
import { useLanguage } from "./LanguageContext";

export default function BlogsSection() {
  const { blogsData } = useWebsiteData();
  const { lang } = useLanguage();

  if (!blogsData || blogsData.length === 0) return null;

  // Show up to 3 recent blogs
  const recentBlogs = blogsData.slice(0, 3);

  return (
    <section style={{ padding: "80px 0", backgroundColor: "#f8fafc" }}>
      <div className="grid-container">
        <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px" }}>
          <div style={{ maxWidth: "600px" }}>
            <h2 style={{ fontSize: "36px", fontWeight: 800, color: "var(--color-black)", margin: "0 0 16px 0", lineHeight: "1.2", letterSpacing: "-0.02em" }}>
              {lang === 'bn' ? "পোকামাকড় নিয়ন্ত্রণ ও টিপস" : "Pest Control Insights & Tips"}
            </h2>
            <p style={{ fontSize: "16px", color: "var(--color-charcoal)", margin: 0, lineHeight: "1.6" }}>
              {lang === 'bn' 
                ? "বাড়ি এবং ব্যবসা প্রতিষ্ঠান সুরক্ষায় আমাদের বিশেষজ্ঞ পরামর্শ এবং সর্বশেষ আপডেটগুলো পড়ুন।" 
                : "Read our expert advice, latest updates, and tips for protecting your home and business from pests."}
            </p>
          </div>
          <Link href="/blog" style={{ display: "none", alignItems: "center", gap: "8px", fontWeight: 600, color: "var(--color-orange)", textDecoration: "none" }} className="mobile-hidden">
            {lang === 'bn' ? "সব ব্লগ দেখুন" : "View All Blogs"} <ArrowRight size={16} />
          </Link>
        </div>

        <div style={{ gridColumn: "1 / -1", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px" }}>
          {recentBlogs.map(blog => (
            <Link key={blog.id} href={`/blog/${blog.id}`} style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", backgroundColor: "white", borderRadius: "16px", overflow: "hidden", border: "1px solid var(--color-line)", transition: "transform 0.2s, box-shadow 0.2s" }} className="blog-card-hover">
              <div style={{ position: "relative", width: "100%", height: "240px" }}>
                <Image src={blog.image} alt={blog.title.en} fill style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", top: "16px", left: "16px", backgroundColor: "white", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, color: "var(--color-orange)", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                  {lang === 'bn' ? blog.category.bn : blog.category.en}
                </div>
              </div>
              <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
                <span style={{ fontSize: "13px", color: "var(--color-charcoal)", marginBottom: "8px", fontWeight: 500 }}>
                  {lang === 'bn' ? blog.date.bn : blog.date.en}
                </span>
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--color-black)", margin: "0 0 12px 0", lineHeight: "1.4" }}>
                  {lang === 'bn' ? blog.title.bn : blog.title.en}
                </h3>
                <p style={{ fontSize: "15px", color: "var(--color-charcoal)", margin: 0, lineHeight: "1.6", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {lang === 'bn' ? blog.excerpt.bn : blog.excerpt.en}
                </p>
                
                <div style={{ marginTop: "auto", paddingTop: "24px", display: "flex", alignItems: "center", gap: "8px", color: "var(--color-orange)", fontWeight: 600, fontSize: "14px" }}>
                  {lang === 'bn' ? "আরও পড়ুন" : "Read More"} <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ gridColumn: "1 / -1", marginTop: "32px", display: "flex", justifyContent: "center" }} className="desktop-hidden">
          <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontWeight: 600, color: "var(--color-orange)", textDecoration: "none", padding: "12px 24px", border: "2px solid var(--color-orange)", borderRadius: "8px" }}>
            {lang === 'bn' ? "সব ব্লগ দেখুন" : "View All Blogs"} <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .blog-card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.06);
        }
        @media (max-width: 768px) {
          .mobile-hidden { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-hidden { display: flex !important; }
          .desktop-hidden { display: none !important; }
        }
      `}} />
    </section>
  );
}
