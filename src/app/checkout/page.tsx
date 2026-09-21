"use client";
import React, { useState, Suspense } from "react";
import { useLanguage } from "../../components/LanguageContext";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, User, Phone, MapPin, Building2, CheckSquare, Loader2, Check, Lock } from "lucide-react";
import Link from "next/link";
import { useJourney } from "@/context/JourneyContext";
import styles from "./Checkout.module.css";

function CheckoutForm() {
  const { lang } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addBooking } = useJourney();
  
  // Data passed from the calculator
  const service = searchParams.get("service") || "General Pest Control";
  const area = searchParams.get("area") || "0";
  const price = searchParams.get("price") || "0";
  const zone = searchParams.get("zone") || "Dhaka";
  const type = searchParams.get("type") || "homes";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [extraPests, setExtraPests] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    email: "",
    password: "",
    address: "",
  });

  const togglePest = (pest: string) => {
    setExtraPests(prev => 
      prev.includes(pest) ? prev.filter(p => p !== pest) : [...prev, pest]
    );
  };

  const content = {
    en: {
      title: "Complete Your Booking",
      subtitle: "Please provide your details so our expert can contact you.",
      back: "Back to Calculator",
      form: {
        personal: "Contact Details",
        name: "Full Name",
        namePlaceholder: "John Doe",
        phone: "Phone Number",
        phonePlaceholder: "017XXXXXXXX",
        company: "Company Name (Optional)",
        companyPlaceholder: "Acme Corp",
        account: "Account Setup (Optional)",
        email: "Email Address",
        emailPlaceholder: "example@company.com",
        password: "Create Password",
        passwordPlaceholder: "••••••••",
        location: "Service Address",
        address: "Detailed Address",
        addressPlaceholder: "House 12, Road 5, Block C, Banani...",
        addons: "Add-on Services (Optional)",
        addonsDesc: "Select any additional pests you want us to inspect/treat during the visit.",
        submit: "Confirm Booking",
        processing: "Processing..."
      },
      summary: {
        title: "Order Summary",
        service: "Selected Service",
        premise: "Premise Type",
        area: "Square Feet",
        zone: "Location Zone",
        total: "Estimated Total",
        disclaimer: "*Final price may vary slightly upon physical inspection by our experts."
      },
      pests: ["Termite", "Cockroach", "Rodent", "Bed Bug", "Mosquito"]
    },
    bn: {
      title: "বুকিং সম্পন্ন করুন",
      subtitle: "আমাদের বিশেষজ্ঞ যাতে আপনার সাথে যোগাযোগ করতে পারেন তাই আপনার বিস্তারিত তথ্য দিন।",
      back: "ক্যালকুলেটরে ফিরে যান",
      form: {
        personal: "যোগাযোগের বিবরণ",
        name: "পুরো নাম",
        namePlaceholder: "আপনার নাম",
        phone: "ফোন নম্বর",
        phonePlaceholder: "০১৭XXXXXXXX",
        company: "কোম্পানির নাম (ঐচ্ছিক)",
        companyPlaceholder: "আপনার কোম্পানি",
        account: "অ্যাকাউন্ট সেটআপ (ঐচ্ছিক)",
        email: "ইমেইল এড্রেস",
        emailPlaceholder: "example@company.com",
        password: "পাসওয়ার্ড তৈরি করুন",
        passwordPlaceholder: "••••••••",
        location: "সার্ভিসের ঠিকানা",
        address: "বিস্তারিত ঠিকানা",
        addressPlaceholder: "বাড়ি ১২, রোড ৫, ব্লক সি, বনানী...",
        addons: "অতিরিক্ত সার্ভিস (ঐচ্ছিক)",
        addonsDesc: "পরিদর্শনের সময় আমরা আর কোন কোন পেস্ট পরীক্ষা করব তা নির্বাচন করুন।",
        submit: "বুকিং কনফার্ম করুন",
        processing: "প্রসেস হচ্ছে..."
      },
      summary: {
        title: "অর্ডার সামারি",
        service: "নির্বাচিত সার্ভিস",
        premise: "প্রাঙ্গণের ধরন",
        area: "স্কয়ার ফিট",
        zone: "লোকেশন জোন",
        total: "আনুমানিক মোট মূল্য",
        disclaimer: "*আমাদের বিশেষজ্ঞদের শারীরিক পরিদর্শনের পর চূড়ান্ত মূল্য সামান্য পরিবর্তিত হতে পারে।"
      },
      pests: ["উইপোকা", "তেলাপোকা", "ইঁদুর", "ছারপোকা", "মশা"]
    }
  };

  const t = content[lang as keyof typeof content] || content.en;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API Call & save to JourneyContext
    setTimeout(() => {
      const newId = `SRK-${Math.floor(1000 + Math.random() * 9000)}`;
      addBooking({
        id: newId,
        customerName: formData.name,
        phone: formData.phone,
        email: formData.email,
        service: service,
        date: "Pending Schedule",
        time: "TBD",
        amount: `৳${price}`,
        status: "Pending",
        address: formData.address,
        customerType: type === "commercial" ? "Commercial" : "Residential",
      });

      router.push("/booking-success");
    }, 1200);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", padding: "120px 0 80px" }}>
      <div className={styles.layout}>
        
        {/* Left Column: Form */}
        <div>
          <Link href="/#booking" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--color-charcoal)", textDecoration: "none", fontWeight: 600, marginBottom: "24px" }}>
            <ArrowLeft size={16} /> {t.back}
          </Link>
          
          <h1 style={{ fontSize: "32px", fontWeight: 700, color: "var(--color-black)", marginBottom: "8px" }}>{t.title}</h1>
          <p style={{ fontSize: "16px", color: "var(--color-charcoal)", marginBottom: "32px" }}>{t.subtitle}</p>
          
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "32px", backgroundColor: "white", padding: "32px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            
            {/* Contact Details */}
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-black)", marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid var(--color-line)", paddingBottom: "12px" }}>
                <User size={20} color="var(--color-orange)" /> {t.form.personal}
              </h3>
              
              <div className={styles.formGrid}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-black)" }}>{t.form.name} <span style={{ color: "red" }}>*</span></label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder={t.form.namePlaceholder} required style={{ padding: "12px 16px", borderRadius: "8px", border: "1px solid var(--color-line)", fontSize: "15px", outline: "none" }} />
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-black)" }}>{t.form.phone} <span style={{ color: "red" }}>*</span></label>
                  <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder={t.form.phonePlaceholder} required style={{ padding: "12px 16px", borderRadius: "8px", border: "1px solid var(--color-line)", fontSize: "15px", outline: "none" }} />
                </div>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "20px" }}>
                <label style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-black)" }}>{t.form.company}</label>
                <div style={{ position: "relative" }}>
                  <Building2 size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--color-charcoal)" }} />
                  <input type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} placeholder={t.form.companyPlaceholder} style={{ width: "100%", padding: "12px 16px 12px 48px", borderRadius: "8px", border: "1px solid var(--color-line)", fontSize: "15px", outline: "none" }} />
                </div>
              </div>
            </div>
            
            {/* Account Setup */}
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-black)", marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid var(--color-line)", paddingBottom: "12px" }}>
                <Lock size={20} color="var(--color-orange)" /> {t.form.account}
              </h3>
              
              <div className={styles.formGrid}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-black)" }}>{t.form.email}</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder={t.form.emailPlaceholder} style={{ padding: "12px 16px", borderRadius: "8px", border: "1px solid var(--color-line)", fontSize: "15px", outline: "none" }} />
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-black)" }}>{t.form.password}</label>
                  <input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} placeholder={t.form.passwordPlaceholder} style={{ padding: "12px 16px", borderRadius: "8px", border: "1px solid var(--color-line)", fontSize: "15px", outline: "none" }} />
                </div>
              </div>
            </div>
            
            {/* Service Address */}
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-black)", marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid var(--color-line)", paddingBottom: "12px" }}>
                <MapPin size={20} color="var(--color-orange)" /> {t.form.location}
              </h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-black)" }}>{t.form.address} <span style={{ color: "red" }}>*</span></label>
                <textarea rows={3} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder={t.form.addressPlaceholder} required style={{ padding: "12px 16px", borderRadius: "8px", border: "1px solid var(--color-line)", fontSize: "15px", outline: "none", resize: "vertical", fontFamily: "inherit" }}></textarea>
              </div>
            </div>
            
            {/* Addons */}
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-black)", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckSquare size={20} color="var(--color-orange)" /> {t.form.addons}
              </h3>
              <p style={{ fontSize: "14px", color: "var(--color-charcoal)", marginBottom: "24px" }}>{t.form.addonsDesc}</p>
              
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {t.pests.map((pest, idx) => {
                  const isSelected = extraPests.includes(pest);
                  return (
                    <button 
                      key={idx} 
                      type="button" 
                      onClick={() => togglePest(pest)}
                      style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "8px", 
                        padding: "10px 16px", 
                        borderRadius: "20px", 
                        border: `2px solid ${isSelected ? "var(--color-orange)" : "var(--color-line)"}`, 
                        backgroundColor: isSelected ? "rgba(253, 69, 2, 0.05)" : "transparent",
                        color: isSelected ? "var(--color-orange)" : "var(--color-charcoal)",
                        fontWeight: 600,
                        fontSize: "14px",
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                      }}
                    >
                      {isSelected && <Check size={16} />} {pest}
                    </button>
                  )
                })}
              </div>
            </div>
            
            <hr style={{ border: "none", borderTop: "1px solid var(--color-line)", margin: "0" }} />
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              style={{ 
                width: "100%", 
                backgroundColor: "var(--color-orange)", 
                color: "white", 
                padding: "16px", 
                border: "none", 
                borderRadius: "8px", 
                fontSize: "18px", 
                fontWeight: 700, 
                cursor: isSubmitting ? "not-allowed" : "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "12px",
                opacity: isSubmitting ? 0.8 : 1
              }}
            >
              {isSubmitting ? <><Loader2 className="animate-spin" size={20} /> {t.form.processing}</> : t.form.submit}
            </button>
            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } } .animate-spin { animation: spin 1s linear infinite; }`}</style>
            
          </form>
        </div>
        
        {/* Right Column: Order Summary */}
        <div className={styles.summaryCol}>
          <div style={{ backgroundColor: "var(--color-black)", borderRadius: "12px", padding: "32px", color: "white" }}>
            <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "24px", color: "white" }}>{t.summary.title}</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "32px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px" }}>{t.summary.service}</span>
                <span style={{ fontWeight: 700, fontSize: "15px", textAlign: "right" }}>{service}</span>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px" }}>{t.summary.premise}</span>
                <span style={{ fontWeight: 700, fontSize: "15px", textTransform: "capitalize", textAlign: "right" }}>{type === "homes" ? "Residential" : "Commercial"}</span>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px" }}>{t.summary.zone}</span>
                <span style={{ fontWeight: 700, fontSize: "15px", textAlign: "right" }}>{zone}</span>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px" }}>{t.summary.area}</span>
                <span style={{ fontWeight: 700, fontSize: "15px", textAlign: "right" }}>{area} sqft</span>
              </div>
            </div>
            
            <div style={{ backgroundColor: "rgba(255,255,255,0.05)", padding: "20px", borderRadius: "8px", marginBottom: "16px" }}>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", marginBottom: "8px" }}>{t.summary.total}</div>
              <div style={{ fontSize: "36px", fontWeight: 700, color: "var(--color-orange)" }}>৳{parseInt(price).toLocaleString()}</div>
            </div>
            
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", lineHeight: "1.6", margin: 0 }}>
              {t.summary.disclaimer}
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}><Loader2 className="animate-spin" size={32} color="var(--color-orange)" /></div>}>
      <CheckoutForm />
    </Suspense>
  );
}
