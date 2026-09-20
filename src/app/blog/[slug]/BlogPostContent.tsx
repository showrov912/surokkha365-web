"use client";
import React from "react";
import { useLanguage } from "../../../components/LanguageContext";
import { useWebsiteData } from "../../../context/WebsiteContext";
import Link from "next/link";
import { ArrowLeft, Clock, Share2, CheckCircle2, User, ArrowRight, MessageSquare } from "lucide-react";
import Image from "next/image";

export default function BlogPostContent({ slug }: { slug: string }) {
  const { lang } = useLanguage();
  const { blogsData } = useWebsiteData();
  const langKey = lang as 'en' | 'bn';
  const [commentText, setCommentText] = React.useState("");
  
  const currentBlog = blogsData.find(b => b.id === slug);
  const relatedBlogs = blogsData.filter(b => b.id !== slug).slice(0, 3);

  if (!currentBlog) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", backgroundColor: "#f8fafc" }}>
        <h2 style={{ fontSize: "24px", color: "var(--color-charcoal)" }}>Blog post not found</h2>
        <Link href="/blog" style={{ color: "var(--color-orange)", fontWeight: 700 }}>Return to Blog</Link>
      </div>
    );
  }

  // Static UI elements that aren't part of the blog data
  const ui = {
    en: {
      back: "Back to Blog",
      share: "Share",
      strongCta: {
        title: "Ready to safeguard your space?",
        desc: "Book our verified technicians today at flat per-sq-ft pricing. No hidden fees. Digital audit-ready reports included.",
        button: "Book Professional Service"
      },
      author: {
        name: "Surokkha365 Experts",
        role: "Editorial Team",
        bio: "The Surokkha365 Editorial Team consists of certified pest control specialists in Bangladesh dedicated to evidence-based eradication and facility compliance."
      },
      relatedTitle: "Read More from Our Experts",
      comments: {
        title: "Comments",
        placeholder: "Leave a reply...",
        button: "Post Comment",
        empty: "No comments yet. Be the first!"
      }
    },
    bn: {
      back: "ব্লগে ফিরে যান",
      share: "শেয়ার করুন",
      strongCta: {
        title: "আপনার স্থান সুরক্ষিত করতে প্রস্তুত?",
        desc: "ফ্ল্যাট প্রতি বর্গফুট মূল্যে আজই আমাদের যাচাইকৃত টেকনিশিয়ান বুক করুন। কোন লুকানো চার্জ নেই। ডিজিটাল অডিট-রেডি রিপোর্ট অন্তর্ভুক্ত।",
        button: "পেশাদার সার্ভিস বুক করুন"
      },
      author: {
        name: "সুরক্ষা৩৬৫ এক্সপার্টস",
        role: "এডিটোরিয়াল টিম",
        bio: "সুরক্ষা৩৬৫ এডিটোরিয়াল টিম বাংলাদেশের সার্টিফাইড পেস্ট কন্ট্রোল বিশেষজ্ঞদের নিয়ে গঠিত, যারা প্রমাণ-ভিত্তিক নির্মূল এবং ফ্যাসিলিটি কমপ্লায়েন্সের জন্য নিবেদিত।"
      },
      relatedTitle: "আমাদের বিশেষজ্ঞদের থেকে আরও পড়ুন",
      comments: {
        title: "মতামত",
        placeholder: "একটি উত্তর দিন...",
        button: "কমেন্ট পোস্ট করুন",
        empty: "এখনো কোন মতামত নেই। প্রথম হন!"
      }
    }
  };

  const t = ui[langKey];

  return (
    <div style={{ minHeight: "80vh", padding: "120px 0 80px", backgroundColor: "#f8fafc" }}>
      <div className="grid-container">
        
        <div style={{ gridColumn: "1 / -1", maxWidth: "800px", margin: "0 auto", width: "100%" }}>
          {/* Breadcrumbs */}
          <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--color-charcoal)", marginBottom: "32px", fontWeight: 600, fontSize: "14px" }}>
            <ArrowLeft size={18} />
            {t.back}
          </Link>
          
          {/* Metadata */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <span style={{ backgroundColor: "rgba(253, 69, 2, 0.1)", color: "var(--color-orange)", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {currentBlog.category[langKey]}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--color-charcoal)", fontSize: "13px", fontWeight: 600 }}>
              <Clock size={14} /> {currentBlog.date[langKey]}
            </span>
          </div>
          
          {/* Title + Intro Hook */}
          <h1 style={{ fontSize: "40px", fontWeight: 800, color: "var(--color-black)", marginBottom: "24px", lineHeight: "1.2", letterSpacing: "-0.02em" }}>
            {currentBlog.title[langKey]}
          </h1>
          
          <p style={{ fontSize: "20px", color: "var(--color-black)", fontWeight: 600, lineHeight: "1.6", marginBottom: "32px" }}>
            {currentBlog.introHook[langKey]}
          </p>
          
          {/* Author & Share Line */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--color-line)", borderBottom: "1px solid var(--color-line)", padding: "16px 0", marginBottom: "40px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "50%", backgroundColor: "var(--color-black)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: "18px" }}>
                S
              </div>
              <div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-black)" }}>{t.author.name}</div>
                <div style={{ fontSize: "13px", color: "var(--color-charcoal)", fontWeight: 500 }}>{t.author.role}</div>
              </div>
            </div>
            
            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: currentBlog.title[langKey],
                    url: window.location.href
                  }).catch(console.error);
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert(langKey === 'bn' ? "লিঙ্ক কপি করা হয়েছে!" : "Link copied to clipboard!");
                }
              }}
              style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "white", border: "1px solid var(--color-line)", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", color: "var(--color-charcoal)", fontWeight: 600, fontSize: "13px", transition: "all 0.2s" }} 
              onMouseOver={e => e.currentTarget.style.borderColor = 'var(--color-orange)'} 
              onMouseOut={e => e.currentTarget.style.borderColor = 'var(--color-line)'}
            >
              <Share2 size={16} /> {t.share}
            </button>
          </div>
          
          {/* Main Image */}
          <div style={{ position: "relative", width: "100%", height: "450px", borderRadius: "16px", overflow: "hidden", marginBottom: "48px", border: "1px solid var(--color-line)" }}>
            <Image src={currentBlog.image} alt={currentBlog.title[langKey]} fill sizes="(max-width: 800px) 100vw, 800px" style={{ objectFit: "cover" }} />
          </div>
          
          {/* Body Content */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "64px" }}>
            {currentBlog.sections[langKey].map((section, idx) => {
              if (section.type === "h2") {
                return <h2 key={idx} style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-black)", marginTop: "24px", marginBottom: "8px", lineHeight: "1.3" }}>{section.text}</h2>;
              }
              if (section.type === "h3") {
                return <h3 key={idx} style={{ fontSize: "22px", fontWeight: 700, color: "var(--color-black)", marginTop: "16px", marginBottom: "4px", lineHeight: "1.3" }}>{section.text}</h3>;
              }
              if (section.type === "p") {
                return <p key={idx} style={{ fontSize: "18px", color: "var(--color-charcoal)", lineHeight: "1.8", margin: 0 }}>{section.text}</p>;
              }
              if (section.type === "soft-cta") {
                return (
                  <div key={idx} style={{ margin: "16px 0", padding: "24px", backgroundColor: "rgba(253, 69, 2, 0.05)", borderLeft: "4px solid var(--color-orange)", borderRadius: "0 8px 8px 0" }}>
                    <p style={{ fontSize: "18px", fontWeight: 600, color: "var(--color-black)", margin: "0 0 12px 0", lineHeight: "1.5" }}>{section.text}</p>
                    <Link href={section.linkHref || "/"} style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--color-orange)", fontWeight: 700, fontSize: "15px", textDecoration: "none" }}>
                      {section.linkText || "Learn More"} <ArrowRight size={16} />
                    </Link>
                  </div>
                );
              }
              if (section.type === "related-link") {
                return (
                  <div key={idx} style={{ fontSize: "16px", fontStyle: "italic", color: "var(--color-charcoal)", padding: "8px 16px", backgroundColor: "white", border: "1px solid var(--color-line)", borderRadius: "8px", display: "inline-block" }}>
                    🔗 <Link href={section.linkHref || "/"} style={{ color: "var(--color-orange)", textDecoration: "underline", fontWeight: 600 }}>{section.text}</Link>
                  </div>
                );
              }
              return null;
            })}
          </div>

          {/* End-of-article CTA */}
          <div style={{ backgroundColor: "var(--color-black)", borderRadius: "16px", padding: "40px", color: "white", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "64px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundImage: "url(/pest1.jpg)", backgroundSize: "cover", backgroundPosition: "center" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h3 style={{ fontSize: "28px", fontWeight: 700, margin: "0 0 16px 0" }}>{t.strongCta.title}</h3>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)", margin: "0 0 32px 0", maxWidth: "500px", lineHeight: "1.6" }}>{t.strongCta.desc}</p>
              <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "var(--color-orange)", color: "white", padding: "16px 32px", borderRadius: "8px", fontWeight: 700, fontSize: "16px", textDecoration: "none", transition: "transform 0.2s" }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <CheckCircle2 size={20} />
                {t.strongCta.button}
              </Link>
            </div>
          </div>

          {/* Author Bio Box */}
          <div style={{ display: "flex", gap: "24px", backgroundColor: "white", border: "1px solid var(--color-line)", borderRadius: "16px", padding: "32px", marginBottom: "64px", alignItems: "center" }}>
            <div style={{ width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "rgba(253, 69, 2, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-orange)", flexShrink: 0 }}>
              <User size={32} />
            </div>
            <div>
              <h4 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-black)", margin: "0 0 4px 0" }}>{t.author.name}</h4>
              <p style={{ fontSize: "13px", color: "var(--color-orange)", fontWeight: 600, margin: "0 0 12px 0", textTransform: "uppercase", letterSpacing: "0.05em" }}>{t.author.role}</p>
              <p style={{ fontSize: "15px", color: "var(--color-charcoal)", margin: 0, lineHeight: "1.6" }}>{t.author.bio}</p>
            </div>
          </div>

          {/* Related Posts */}
          {relatedBlogs.length > 0 && (
            <div style={{ marginBottom: "64px", paddingTop: "40px", borderTop: "1px solid var(--color-line)" }}>
              <h3 style={{ fontSize: "24px", fontWeight: 700, color: "var(--color-black)", marginBottom: "32px" }}>{t.relatedTitle}</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "24px" }}>
                {relatedBlogs.map((post) => (
                  <Link href={`/blog/${post.id}`} key={post.id} className="group" style={{ display: "block", textDecoration: "none" }}>
                    <div style={{ position: "relative", width: "100%", height: "160px", borderRadius: "12px", overflow: "hidden", marginBottom: "16px", border: "1px solid var(--color-line)" }}>
                      <Image src={post.image} alt={post.title[langKey]} fill sizes="250px" style={{ objectFit: "cover", transition: "transform 0.3s" }} />
                    </div>
                    <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "8px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-orange)", textTransform: "uppercase" }}>{post.category[langKey]}</span>
                      <span style={{ fontSize: "12px", color: "var(--color-charcoal)" }}>{post.date[langKey]}</span>
                    </div>
                    <h4 style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-black)", margin: 0, lineHeight: "1.4" }}>{post.title[langKey]}</h4>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div style={{ backgroundColor: "white", border: "1px solid var(--color-line)", borderRadius: "16px", padding: "40px" }}>
            <h3 style={{ fontSize: "24px", fontWeight: 700, color: "var(--color-black)", marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}>
              <MessageSquare size={24} color="var(--color-orange)" />
              {t.comments.title}
            </h3>
            
            <div style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-charcoal)", flexShrink: 0 }}>
                <User size={20} />
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-end" }}>
                <textarea 
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder={t.comments.placeholder}
                  rows={3}
                  style={{ width: "100%", padding: "16px", border: "1px solid var(--color-line)", borderRadius: "12px", outline: "none", fontSize: "15px", resize: "vertical", fontFamily: "inherit" }}
                />
                <button 
                  onClick={() => {
                    if (commentText.trim()) {
                      alert(langKey === 'bn' ? "ধন্যবাদ! আপনার মতামত পর্যালোচনার জন্য জমা দেওয়া হয়েছে।" : "Thank you! Your comment has been submitted for review.");
                      setCommentText("");
                    }
                  }}
                  style={{ backgroundColor: "var(--color-black)", color: "white", padding: "10px 20px", borderRadius: "8px", fontWeight: 600, fontSize: "14px", border: "none", cursor: "pointer" }}
                >
                  {t.comments.button}
                </button>
              </div>
            </div>
            
            <div style={{ textAlign: "center", color: "var(--color-charcoal)", fontSize: "14px", padding: "32px 0", borderTop: "1px dashed var(--color-line)" }}>
              {t.comments.empty}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
