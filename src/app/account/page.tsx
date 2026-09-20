"use client";
import React from "react";
import { useLanguage } from "../../components/LanguageContext";
import Link from "next/link";
import { ArrowLeft, User, Lock, Mail, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import PricingOffer from "../../components/PricingOffer";
import Footer from "../../components/Footer";

export default function AccountPage() {
  const { lang } = useLanguage();
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Simulate API delay, then redirect
    setTimeout(() => {
      if (email.trim() === "surokkha365@gmail.com" && password === "Bo1bok@n") {
        localStorage.setItem("isAdminLoggedIn", "true");
        router.push("/admin");
      } else {
        localStorage.removeItem("isAdminLoggedIn");
        router.push("/dashboard");
      }
    }, 1000);
  };
  
  const content = {
    en: {
      back: "Back to Home",
      title: "My Account",
      subtitle: "Manage your Surokkha365 bookings and reports.",
      loginTitle: "Sign In",
      emailLabel: "Email Address",
      passwordLabel: "Password",
      loginBtn: "Login to Portal",
      createAccount: "Don't have an account? Contact support to get access to the corporate portal.",
      successTitle: "Authentication Successful",
      successDesc: "Redirecting to your secure corporate dashboard..."
    },
    bn: {
      back: "হোমে ফিরে যান",
      title: "আমার অ্যাকাউন্ট",
      subtitle: "আপনার সুরক্ষা৩৬৫ বুকিং এবং রিপোর্ট পরিচালনা করুন।",
      loginTitle: "লগইন করুন",
      emailLabel: "ইমেইল এড্রেস",
      passwordLabel: "পাসওয়ার্ড",
      loginBtn: "পোর্টালে লগইন করুন",
      createAccount: "অ্যাকাউন্ট নেই? কর্পোরেট পোর্টালে অ্যাক্সেস পেতে সাপোর্টের সাথে যোগাযোগ করুন।",
      successTitle: "লগইন সফল হয়েছে",
      successDesc: "আপনার সুরক্ষিত কর্পোরেট ড্যাশবোর্ডে রিডাইরেক্ট করা হচ্ছে..."
    }
  };

  const t = content[lang as keyof typeof content] || content.en;

  return (
    <main style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <div style={{ padding: "120px 0 80px", backgroundColor: "#f8fafc", display: "flex", flexDirection: "column", flex: 1 }}>
      <div className="grid-container" style={{ flex: 1 }}>
        <div style={{ gridColumn: "1 / -1", maxWidth: "500px", margin: "0 auto", width: "100%" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--color-charcoal)", marginBottom: "32px", fontWeight: 600 }}>
            <ArrowLeft size={20} />
            {t.back}
          </Link>
          
          <div style={{ backgroundColor: "white", padding: "40px", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
              <div style={{ width: "64px", height: "64px", backgroundColor: "rgba(253, 69, 2, 0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-orange)" }}>
                <User size={32} />
              </div>
            </div>
            
            <h1 style={{ fontSize: "32px", fontWeight: 700, color: "var(--color-black)", margin: "0 0 8px", textAlign: "center" }}>
              {t.title}
            </h1>
            <p style={{ fontSize: "15px", color: "var(--color-charcoal)", marginBottom: "32px", textAlign: "center" }}>
              {t.subtitle}
            </p>
            
            {!isSubmitted ? (
              <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-black)" }}>{t.emailLabel}</label>
                  <div style={{ position: "relative" }}>
                    <Mail size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-charcoal)" }} />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@company.com" style={{ width: "100%", padding: "12px 16px 12px 40px", border: "1px solid var(--color-line)", borderRadius: "8px", fontSize: "15px", outline: "none" }} required />
                  </div>
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-black)" }}>{t.passwordLabel}</label>
                  <div style={{ position: "relative" }}>
                    <Lock size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-charcoal)" }} />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={{ width: "100%", padding: "12px 16px 12px 40px", border: "1px solid var(--color-line)", borderRadius: "8px", fontSize: "15px", outline: "none" }} required />
                  </div>
                </div>
                
                <button type="submit" style={{ width: "100%", backgroundColor: "var(--color-orange)", color: "white", padding: "14px", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: 700, cursor: "pointer", marginTop: "8px" }}>
                  {t.loginBtn}
                </button>
              </form>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 0", gap: "16px" }}>
                <Loader2 className="animate-spin" size={48} color="var(--color-orange)" style={{ animation: "spin 1s linear infinite" }} />
                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--color-black)", margin: 0, marginTop: "16px" }}>{t.successTitle}</h3>
                <p style={{ fontSize: "15px", color: "var(--color-charcoal)", textAlign: "center" }}>{t.successDesc}</p>
              </div>
            )}
            
            <p style={{ fontSize: "14px", color: "var(--color-charcoal)", marginTop: "24px", textAlign: "center", lineHeight: "1.6" }}>
              {t.createAccount}
            </p>
          </div>
        </div>
      </div>
      </div>
      <PricingOffer />
      <Footer />
    </main>
  );
}
