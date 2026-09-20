"use client";
import React, { useState } from "react";
import { useLanguage } from "./LanguageContext";
import styles from "./SocialProof.module.css";
import { Download, Search, FileCheck } from "lucide-react";

export default function SocialProof() {
  const { lang } = useLanguage();
  const [techId, setTechId] = useState("");
  const [verifyStatus, setVerifyStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!techId) return;
    
    setVerifyStatus("loading");
    // Mock RPC call
    setTimeout(() => {
      if (techId.length >= 4) {
        setVerifyStatus("success");
      } else {
        setVerifyStatus("error");
      }
    }, 800);
  };

  const content = {
    en: {
      badge: "Transparency First",
      reportTitle: "Audit-Ready Digital Reports",
      reportDesc: "See exactly what our post-treatment report looks like. Clear data, named methods, and safety logs ready for your next compliance audit.",
      downloadBtn: "Download Sample (PDF)",
      verifyTitle: "Verify a Technician",
      verifyDesc: "Every technician carries an ID badge. Enter the ID to confirm their active status.",
      verifyPlaceholder: "e.g. 8492",
      verifyBtn: "Verify",
      successMsg: "Verified: Active Technician",
      errorMsg: "ID not found"
    },
    bn: {
      badge: "স্বচ্ছতা প্রথম",
      reportTitle: "অডিট-রেডি ডিজিটাল রিপোর্ট",
      reportDesc: "ট্রিটমেন্টের পর আমাদের রিপোর্ট কেমন হয় তা দেখুন। স্বচ্ছ ডেটা এবং সেফটি লগ যা পরবর্তী অডিটের জন্য প্রস্তুত।",
      downloadBtn: "স্যাম্পল ডাউনলোড করুন (PDF)",
      verifyTitle: "টেকনিশিয়ান যাচাই করুন",
      verifyDesc: "প্রতিটি টেকনিশিয়ানের একটি আইডি কার্ড রয়েছে। বর্তমান স্ট্যাটাস জানতে আইডি দিন।",
      verifyPlaceholder: "যেমন: 8492",
      verifyBtn: "যাচাই করুন",
      successMsg: "ভেরিফাইড: অ্যাক্টিভ টেকনিশিয়ান",
      errorMsg: "আইডি পাওয়া যায়নি"
    }
  };

  const t = content[lang];

  return (
    <section className={styles.proofSection}>
      <div className={styles.bgImage}>
        <div className={styles.bgOverlay} />
      </div>

      <div className={`grid-container ${styles.contentWrapper}`}>
        <div className={styles.overlayBox}>
          
          <div className={styles.badge}>
            <span className={styles.dot}></span>
            {t.badge}
          </div>

          <div className={styles.proofGrid}>
            
            {/* Sample Report Block */}
            <div className={styles.proofBlock}>
              <div className={styles.iconHeader}>
                <div className={styles.iconCircle}>
                  <FileCheck size={20} />
                </div>
                <h3>{t.reportTitle}</h3>
              </div>
              <p>{t.reportDesc}</p>
              <a href="/sample-report.png" download="Surokkha365_Sample_Report.png" className={styles.actionBtn}>
                <Download size={16} />
                {t.downloadBtn}
              </a>
            </div>

            <div className={styles.divider} />

            {/* Technician Verification Block */}
            <div className={styles.proofBlock}>
              <div className={styles.iconHeader}>
                <div className={styles.iconCircle}>
                  <Search size={20} />
                </div>
                <h3>{t.verifyTitle}</h3>
              </div>
              <p>{t.verifyDesc}</p>
              
              <form onSubmit={handleVerify} className={styles.verifyForm}>
                <input 
                  type="text" 
                  placeholder={t.verifyPlaceholder}
                  className={styles.verifyInput}
                  value={techId}
                  onChange={(e) => setTechId(e.target.value)}
                />
                <button type="submit" className={styles.actionBtn} disabled={verifyStatus === "loading"}>
                  {verifyStatus === "loading" ? "..." : t.verifyBtn}
                </button>
              </form>
              
              {verifyStatus === "success" && (
                <div className={styles.statusSuccess}>{t.successMsg}</div>
              )}
              {verifyStatus === "error" && (
                <div className={styles.statusError}>{t.errorMsg}</div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
