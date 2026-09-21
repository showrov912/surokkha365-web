"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { useWebsiteData } from "../context/WebsiteContext";
import { useLanguage } from "./LanguageContext";

export default function Footer() {
  const { footerServices, footerQuickLinks, blogsData, contactData } = useWebsiteData();
  const { lang } = useLanguage();
  const linkStyle = {
    color: "rgba(255,255,255,0.7)",
    textDecoration: "none",
    transition: "color 0.2s",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  };

  const listStyle = {
    listStyle: "none",
    padding: 0,
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
    fontSize: "13px"
  };

  const headingStyle = {
    fontSize: "16px",
    marginBottom: "24px",
    color: "var(--color-white)",
    fontWeight: 600
  };

  return (
    <footer style={{ backgroundColor: "#111827", color: "var(--color-white)", padding: "80px 0 32px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="grid-container">
        <div style={{ gridColumn: "1 / -1", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "48px" }}>
          
          {/* Column 1: About */}
          <div style={{ paddingRight: "24px" }}>
            <Image src="/orange-favicon.svg" alt="Surokkha365" width={50} height={53} style={{ marginBottom: "32px", objectFit: "contain" }} />
            <h4 style={headingStyle}>About Us</h4>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", lineHeight: "1.6" }}>
              At Surokkha365, we're dedicated to creating safe, healthy spaces for homes and businesses across Bangladesh. We operate with expert technicians and compliance-grade methods.
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 style={headingStyle}>Our Services</h4>
            <ul style={listStyle}>
              {footerServices && footerServices.map(link => (
                <li key={link.id}><Link href={link.url} style={linkStyle}>• {link.text[lang as 'en' | 'bn']}</Link></li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links & Blogs */}
          <div>
            <h4 style={headingStyle}>Quick links</h4>
            <ul style={{ ...listStyle, marginBottom: "32px" }}>
              {footerQuickLinks && footerQuickLinks.map(link => (
                <li key={link.id}><Link href={link.url} style={linkStyle}>• {link.text[lang as 'en' | 'bn']}</Link></li>
              ))}
            </ul>

            <h4 style={{ fontSize: "15px", marginBottom: "20px", color: "var(--color-white)", fontWeight: 600 }}>Blogs</h4>
            <ul style={{ ...listStyle, gap: "16px" }}>
              {blogsData && blogsData.slice(0, 2).map(blog => (
                <li key={blog.id}>
                  <Link href={`/blog/${blog.id}`} style={{ ...linkStyle, alignItems: "flex-start", gap: "12px" }}>
                    <div style={{ width: "60px", height: "60px", flexShrink: 0, borderRadius: "6px", overflow: "hidden", position: "relative", backgroundColor: "rgba(255,255,255,0.1)" }}>
                      <Image src={blog.image} alt="blog" fill style={{ objectFit: "cover" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <span style={{ fontWeight: 600, fontSize: "13px", color: "var(--color-white)", lineHeight: "1.4", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {lang === 'bn' ? blog.title.bn : blog.title.en}
                      </span>
                      <span style={{ fontSize: "11px", color: "var(--color-orange)" }}>{lang === 'bn' ? blog.date.bn : blog.date.en}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 style={headingStyle}>Contact Us</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>
              {contactData?.phones?.map((phone, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "50%", backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Phone size={14} color="#111827" />
                  </div>
                  <span>{phone}</span>
                </div>
              ))}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Mail size={14} color="#111827" />
                </div>
                <span>{contactData?.email}</span>
              </div>
              
              <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
                {contactData?.facebook && (
                  <Link href={contactData.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </Link>
                )}
                {contactData?.instagram && (
                  <Link href={contactData.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </Link>
                )}
                {contactData?.linkedin && (
                  <Link href={contactData.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </Link>
                )}
              </div>
              
              <p style={{ marginTop: "16px", lineHeight: "1.6" }}>
                &copy; 2026 Surokkha365 and subject to the conditions in the <Link href={contactData?.legalStatementUrl || "/legal/legal-statement"} style={{ color: "white", textDecoration: "underline" }}>Legal statement</Link>
              </p>
            </div>
          </div>
          
        </div>

        {/* Bottom Bar - Just a subtle line at the very bottom as seen in the reference */}
        <div style={{ gridColumn: "1 / -1", borderTop: "1px solid rgba(255,255,255,0.3)", marginTop: "48px", width: "100%" }}></div>
      </div>
    </footer>
  );
}
