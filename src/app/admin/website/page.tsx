"use client";
import React, { useState } from "react";
import Image from "next/image";
import { 
  ChevronDown, ChevronUp, Image as ImageIcon, Edit3, 
  Trash2, Plus, MessageSquare, Shield, CheckCircle, Save, User, Globe, Link as LinkIcon, PhoneCall, Calculator
} from "lucide-react";
import { useWebsiteData } from "@/context/WebsiteContext";
import BlogEditorPanel from "./BlogEditorPanel";
import { supabase } from "@/lib/supabaseClient";

export default function WebsiteEditor() {
  const [openSection, setOpenSection] = useState<"hero" | "services" | "problem" | "testimonials" | "blogs" | "footerLinks" | "contact" | "pricing" | null>("hero");

  const {
    seoData, setSeoData,
    heroData, setHeroData,
    servicesData, setServicesData,
    problemData, setProblemData,
    differencesData, setDifferencesData,
    teamImage, setTeamImage,
    testimonialsData, setTestimonialsData,
    testimonialBg, setTestimonialBg,
    footerServices, setFooterServices,
    footerQuickLinks, setFooterQuickLinks,
    contactData, setContactData,
    pricingData, setPricingData,
    saveToCloud
  } = useWebsiteData();

  const toggleSection = (section: "hero" | "services" | "problem" | "testimonials" | "blogs" | "footerLinks" | "contact" | "pricing") => {
    setOpenSection(prev => prev === section ? null : section);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, updateFn: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const tempUrl = URL.createObjectURL(file);
      updateFn(tempUrl);
      
      const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const { data, error } = await supabase.storage.from('assets').upload(fileName, file);
      
      if (data) {
        const { data: publicUrlData } = supabase.storage.from('assets').getPublicUrl(fileName);
        updateFn(publicUrlData.publicUrl);
      } else {
        console.error("Upload failed", error);
      }
    }
  };

  const simulateAction = async (e: React.MouseEvent<HTMLButtonElement>, text: string) => {
    const btn = e.currentTarget;
    const original = btn.innerHTML;
    btn.innerHTML = text;
    await saveToCloud();
    btn.innerHTML = "Saved!";
    setTimeout(() => { btn.innerHTML = original; }, 1500);
  };

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-black)", margin: "0 0 8px" }}>Website Editor</h1>
        <p style={{ color: "var(--color-charcoal)", margin: 0 }}>Fully edit, add, or remove content across your entire public website.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>



        {/* 1. Hero Section */}
        <div style={{ backgroundColor: "white", borderRadius: "12px", border: "1px solid var(--color-line)", overflow: "hidden" }}>
          <button 
            onClick={() => toggleSection("hero")}
            style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", background: "none", border: "none", cursor: "pointer" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "8px", backgroundColor: "rgba(253, 69, 2, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-orange)" }}>
                <ImageIcon size={20} />
              </div>
              <div style={{ textAlign: "left" }}>
                <h2 style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-black)", margin: 0 }}>1. Hero Section</h2>
                <span style={{ fontSize: "13px", color: "var(--color-charcoal)" }}>Main landing page background and texts.</span>
              </div>
            </div>
            {openSection === "hero" ? <ChevronUp size={20} color="var(--color-charcoal)" /> : <ChevronDown size={20} color="var(--color-charcoal)" />}
          </button>
          
          {openSection === "hero" && (
            <div style={{ padding: "0 24px 24px", borderTop: "1px solid var(--color-line)" }}>
              <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
                
                {/* SEO Sub-section within Hero */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "16px", backgroundColor: "#f8fafc", borderRadius: "8px", border: "1px solid var(--color-line)" }}>
                  <h3 style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "var(--color-black)", display: "flex", alignItems: "center", gap: "8px" }}>
                    <Globe size={16} color="var(--color-orange)" /> Page SEO
                  </h3>
                  
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--color-black)", marginBottom: "8px" }}>Meta Title (English)</label>
                      <input type="text" value={seoData.title.en} onChange={(e) => setSeoData({...seoData, title: {...seoData.title, en: e.target.value}})} style={{ width: "100%", padding: "12px 16px", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "14px" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--color-black)", marginBottom: "8px" }}>Meta Title (Bangla)</label>
                      <input type="text" value={seoData.title.bn} onChange={(e) => setSeoData({...seoData, title: {...seoData.title, bn: e.target.value}})} style={{ width: "100%", padding: "12px 16px", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "14px" }} />
                    </div>
                  </div>


                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--color-black)", marginBottom: "8px" }}>Meta Description (English)</label>
                      <textarea rows={3} value={seoData.description.en} onChange={(e) => setSeoData({...seoData, description: {...seoData.description, en: e.target.value}})} style={{ width: "100%", padding: "12px 16px", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "14px", resize: "vertical" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--color-black)", marginBottom: "8px" }}>Meta Description (Bangla)</label>
                      <textarea rows={3} value={seoData.description.bn} onChange={(e) => setSeoData({...seoData, description: {...seoData.description, bn: e.target.value}})} style={{ width: "100%", padding: "12px 16px", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "14px", resize: "vertical" }} />
                    </div>
                  </div>

                  
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--color-black)", marginBottom: "8px" }}>Keywords (Comma Separated) (English)</label>
                      <input type="text" value={seoData.keywords.en} onChange={(e) => setSeoData({...seoData, keywords: {...seoData.keywords, en: e.target.value}})} style={{ width: "100%", padding: "12px 16px", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "14px" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--color-black)", marginBottom: "8px" }}>Keywords (Comma Separated) (Bangla)</label>
                      <input type="text" value={seoData.keywords.bn} onChange={(e) => setSeoData({...seoData, keywords: {...seoData.keywords, bn: e.target.value}})} style={{ width: "100%", padding: "12px 16px", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "14px" }} />
                    </div>
                  </div>

                </div>
                
                <hr style={{ border: "none", borderTop: "1px dashed var(--color-line)", margin: "8px 0" }} />
                
                
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--color-black)", marginBottom: "8px" }}>Main Headline (English)</label>
                      <input type="text" value={heroData.headline.en} onChange={(e) => setHeroData({...heroData, headline: {...heroData.headline, en: e.target.value}})} style={{ width: "100%", padding: "12px 16px", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "14px" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--color-black)", marginBottom: "8px" }}>Main Headline (Bangla)</label>
                      <input type="text" value={heroData.headline.bn} onChange={(e) => setHeroData({...heroData, headline: {...heroData.headline, bn: e.target.value}})} style={{ width: "100%", padding: "12px 16px", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "14px" }} />
                    </div>
                  </div>

                
                
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--color-black)", marginBottom: "8px" }}>Subheadline (English)</label>
                      <textarea rows={3} value={heroData.subheadline.en} onChange={(e) => setHeroData({...heroData, subheadline: {...heroData.subheadline, en: e.target.value}})} style={{ width: "100%", padding: "12px 16px", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "14px", resize: "vertical" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--color-black)", marginBottom: "8px" }}>Subheadline (Bangla)</label>
                      <textarea rows={3} value={heroData.subheadline.bn} onChange={(e) => setHeroData({...heroData, subheadline: {...heroData.subheadline, bn: e.target.value}})} style={{ width: "100%", padding: "12px 16px", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "14px", resize: "vertical" }} />
                    </div>
                  </div>


                
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--color-black)", marginBottom: "8px" }}>Button Text (English)</label>
                      <input type="text" value={heroData.ctaText.en} onChange={(e) => setHeroData({...heroData, ctaText: {...heroData.ctaText, en: e.target.value}})} style={{ width: "100%", padding: "12px 16px", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "14px" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--color-black)", marginBottom: "8px" }}>Button Text (Bangla)</label>
                      <input type="text" value={heroData.ctaText.bn} onChange={(e) => setHeroData({...heroData, ctaText: {...heroData.ctaText, bn: e.target.value}})} style={{ width: "100%", padding: "12px 16px", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "14px" }} />
                    </div>
                  </div>


                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--color-black)", marginBottom: "8px" }}>Background Image</label>
                  <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                    <div style={{ width: "200px", height: "100px", borderRadius: "8px", overflow: "hidden", position: "relative", border: "1px solid var(--color-line)" }}>
                      <Image src={heroData.bgImage} alt="Hero Background" fill style={{ objectFit: "cover" }} />
                    </div>
                      <label style={{ padding: "10px 16px", backgroundColor: "white", border: "1px solid var(--color-line)", borderRadius: "8px", fontWeight: 600, fontSize: "13px", cursor: "pointer", display: "flex", gap: "8px", alignItems: "center" }}>
                        <Edit3 size={16} /> Replace Image
                        <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleImageUpload(e, (url) => setHeroData({...heroData, bgImage: url}))} />
                      </label>
                      <span style={{ fontSize: "11px", color: "var(--color-charcoal)" }}>Recommended: 1920x1080</span>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
                  <button onClick={(e) => simulateAction(e, "Saving Changes...")} style={{ padding: "12px 24px", backgroundColor: "var(--color-orange)", color: "white", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
                    <Save size={16} /> Save Hero Section
                  </button>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* 2. Our Services */}
        <div style={{ backgroundColor: "white", borderRadius: "12px", border: "1px solid var(--color-line)", overflow: "hidden" }}>
          <button 
            onClick={() => toggleSection("services")}
            style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", background: "none", border: "none", cursor: "pointer" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "8px", backgroundColor: "rgba(253, 69, 2, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-orange)" }}>
                <CheckCircle size={20} />
              </div>
              <div style={{ textAlign: "left" }}>
                <h2 style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-black)", margin: 0 }}>2. Our Services</h2>
                <span style={{ fontSize: "13px", color: "var(--color-charcoal)" }}>Add, edit, or remove service cards.</span>
              </div>
            </div>
            {openSection === "services" ? <ChevronUp size={20} color="var(--color-charcoal)" /> : <ChevronDown size={20} color="var(--color-charcoal)" />}
          </button>
          
          {openSection === "services" && (
            <div style={{ padding: "0 24px 24px", borderTop: "1px solid var(--color-line)" }}>
              <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
                
                {servicesData.map((service, index) => (
                  <div key={service.id} style={{ border: "1px solid var(--color-line)", borderRadius: "8px", padding: "20px", display: "flex", flexDirection: "column", gap: "16px", backgroundColor: "#f8fafc" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <h4 style={{ margin: 0, fontSize: "15px", fontWeight: 700 }}>Service Card {index + 1}</h4>
                      <button 
                        onClick={() => setServicesData(servicesData.filter(s => s.id !== service.id))}
                        style={{ padding: "6px", background: "none", border: "none", color: "red", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: 600 }}
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "6px" }}>Service Title (English)</label>
                        <input type="text" value={service.title.en} onChange={(e) => {
                          const newServices = [...servicesData];
                          newServices[index].title = { ...newServices[index].title, en: e.target.value };
                          setServicesData(newServices);
                        }} style={{ width: "100%", padding: "10px", border: "1px solid var(--color-line)", borderRadius: "6px", outline: "none", fontSize: "13px" }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "6px" }}>Service Title (Bangla)</label>
                        <input type="text" value={service.title.bn} onChange={(e) => {
                          const newServices = [...servicesData];
                          newServices[index].title = { ...newServices[index].title, bn: e.target.value };
                          setServicesData(newServices);
                        }} style={{ width: "100%", padding: "10px", border: "1px solid var(--color-line)", borderRadius: "6px", outline: "none", fontSize: "13px" }} />
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "6px" }}>Description (English)</label>
                        <input type="text" value={service.desc.en} onChange={(e) => {
                          const newServices = [...servicesData];
                          newServices[index].desc = { ...newServices[index].desc, en: e.target.value };
                          setServicesData(newServices);
                        }} style={{ width: "100%", padding: "10px", border: "1px solid var(--color-line)", borderRadius: "6px", outline: "none", fontSize: "13px" }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "6px" }}>Description (Bangla)</label>
                        <input type="text" value={service.desc.bn} onChange={(e) => {
                          const newServices = [...servicesData];
                          newServices[index].desc = { ...newServices[index].desc, bn: e.target.value };
                          setServicesData(newServices);
                        }} style={{ width: "100%", padding: "10px", border: "1px solid var(--color-line)", borderRadius: "6px", outline: "none", fontSize: "13px" }} />
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "16px", alignItems: "center", borderTop: "1px dashed var(--color-line)", paddingTop: "16px" }}>
                      
                      {/* Top Background Image */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
                        <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-charcoal)" }}>Top Background</span>
                        <div style={{ width: "80px", height: "40px", borderRadius: "4px", overflow: "hidden", position: "relative", border: "1px solid var(--color-line)" }}>
                          <Image src={service.topImage} alt={service.title.en} fill style={{ objectFit: "cover" }} />
                        </div>
                        <label style={{ padding: "6px 10px", border: "1px solid var(--color-line)", backgroundColor: "white", borderRadius: "6px", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}>
                          Change Image
                          <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleImageUpload(e, (url) => {
                            const newServices = [...servicesData];
                            newServices[index].topImage = url;
                            setServicesData(newServices);
                          })} />
                        </label>
                        <span style={{ fontSize: "10px", color: "var(--color-charcoal)" }}>800x600</span>
                      </div>

                      {/* Circle Icon */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
                        <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-charcoal)" }}>Circle Icon</span>
                        <div style={{ width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden", position: "relative", border: "1px solid var(--color-line)" }}>
                          <Image src={service.image} alt={service.title.en} fill style={{ objectFit: "cover" }} />
                        </div>
                        <label style={{ padding: "6px 10px", border: "1px solid var(--color-line)", backgroundColor: "white", borderRadius: "6px", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}>
                          Change Icon
                          <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleImageUpload(e, (url) => {
                            const newServices = [...servicesData];
                            newServices[index].image = url;
                            setServicesData(newServices);
                          })} />
                        </label>
                        <span style={{ fontSize: "10px", color: "var(--color-charcoal)" }}>400x400 (1:1)</span>
                      </div>

                    </div>

                    <div style={{ borderTop: "1px dashed var(--color-line)", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
                      <h4 style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "var(--color-black)" }}>Service Page Content (Appears on /services/[slug])</h4>
                      
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "6px" }}>URL Slug (e.g. bedbug-removal)</label>
                        <input type="text" value={service.slug || ""} onChange={(e) => {
                          const newServices = [...servicesData];
                          newServices[index].slug = e.target.value;
                          setServicesData(newServices);
                        }} style={{ width: "100%", padding: "10px", border: "1px solid var(--color-line)", borderRadius: "6px", outline: "none", fontSize: "13px" }} />
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "6px" }}>Page Subtitle (English)</label>
                          <input type="text" value={service.pageSubtitle?.en || ""} onChange={(e) => {
                            const newServices = [...servicesData];
                            newServices[index].pageSubtitle = { en: e.target.value, bn: newServices[index].pageSubtitle?.bn || "" };
                            setServicesData(newServices);
                          }} style={{ width: "100%", padding: "10px", border: "1px solid var(--color-line)", borderRadius: "6px", outline: "none", fontSize: "13px" }} />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "6px" }}>Page Subtitle (Bengali)</label>
                          <input type="text" value={service.pageSubtitle?.bn || ""} onChange={(e) => {
                            const newServices = [...servicesData];
                            newServices[index].pageSubtitle = { en: newServices[index].pageSubtitle?.en || "", bn: e.target.value };
                            setServicesData(newServices);
                          }} style={{ width: "100%", padding: "10px", border: "1px solid var(--color-line)", borderRadius: "6px", outline: "none", fontSize: "13px" }} />
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "6px" }}>Page Content (English)</label>
                          <textarea value={service.pageContent?.en || ""} onChange={(e) => {
                            const newServices = [...servicesData];
                            newServices[index].pageContent = { en: e.target.value, bn: newServices[index].pageContent?.bn || "" };
                            setServicesData(newServices);
                          }} rows={3} style={{ width: "100%", padding: "10px", border: "1px solid var(--color-line)", borderRadius: "6px", outline: "none", fontSize: "13px", resize: "vertical" }} />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "6px" }}>Page Content (Bengali)</label>
                          <textarea value={service.pageContent?.bn || ""} onChange={(e) => {
                            const newServices = [...servicesData];
                            newServices[index].pageContent = { en: newServices[index].pageContent?.en || "", bn: e.target.value };
                            setServicesData(newServices);
                          }} rows={3} style={{ width: "100%", padding: "10px", border: "1px solid var(--color-line)", borderRadius: "6px", outline: "none", fontSize: "13px", resize: "vertical" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <button 
                  onClick={() => setServicesData([...servicesData, { id: Date.now(), title: {en: "New Service", bn: "নতুন সার্ভিস"}, desc: {en: "Service description here", bn: "সার্ভিসের বিবরণ"}, image: "/pest2.jpg", topImage: "/pest1.jpg" }])}
                  style={{ border: "2px dashed var(--color-line)", borderRadius: "8px", padding: "16px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", cursor: "pointer", background: "white", color: "var(--color-black)", fontWeight: 600, fontSize: "14px" }}
                >
                  <Plus size={18} /> Add New Service
                </button>

                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
                  <button onClick={(e) => simulateAction(e, "Saving Changes...")} style={{ padding: "12px 24px", backgroundColor: "var(--color-orange)", color: "white", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
                    <Save size={16} /> Save Services Array
                  </button>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* 3. The Problem & Differences */}
        <div style={{ backgroundColor: "white", borderRadius: "12px", border: "1px solid var(--color-line)", overflow: "hidden" }}>
          <button 
            onClick={() => toggleSection("problem")}
            style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", background: "none", border: "none", cursor: "pointer" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "8px", backgroundColor: "rgba(253, 69, 2, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-orange)" }}>
                <Shield size={20} />
              </div>
              <div style={{ textAlign: "left" }}>
                <h2 style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-black)", margin: 0 }}>3. Problem & Differences</h2>
                <span style={{ fontSize: "13px", color: "var(--color-charcoal)" }}>Edit the problem statement and 'Why Choose Us' items.</span>
              </div>
            </div>
            {openSection === "problem" ? <ChevronUp size={20} color="var(--color-charcoal)" /> : <ChevronDown size={20} color="var(--color-charcoal)" />}
          </button>
          
          {openSection === "problem" && (
            <div style={{ padding: "0 24px 24px", borderTop: "1px solid var(--color-line)" }}>
              <div style={{ marginTop: "24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
                
                {/* Left side: Problem Content */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-black)", margin: 0, borderBottom: "1px solid var(--color-line)", paddingBottom: "8px" }}>Problem Section</h3>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "6px" }}>Title (English)</label>
                      <input type="text" value={problemData.title.en} onChange={(e) => setProblemData({...problemData, title: { ...problemData.title, en: e.target.value }})} style={{ width: "100%", padding: "10px", border: "1px solid var(--color-line)", borderRadius: "6px", outline: "none", fontSize: "13px" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "6px" }}>Title (Bangla)</label>
                      <input type="text" value={problemData.title.bn} onChange={(e) => setProblemData({...problemData, title: { ...problemData.title, bn: e.target.value }})} style={{ width: "100%", padding: "10px", border: "1px solid var(--color-line)", borderRadius: "6px", outline: "none", fontSize: "13px" }} />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "6px" }}>Description (English)</label>
                      <textarea value={problemData.desc.en} onChange={(e) => setProblemData({...problemData, desc: { ...problemData.desc, en: e.target.value }})} rows={3} style={{ width: "100%", padding: "10px", border: "1px solid var(--color-line)", borderRadius: "6px", outline: "none", fontSize: "13px", resize: "vertical" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "6px" }}>Description (Bangla)</label>
                      <textarea value={problemData.desc.bn} onChange={(e) => setProblemData({...problemData, desc: { ...problemData.desc, bn: e.target.value }})} rows={3} style={{ width: "100%", padding: "10px", border: "1px solid var(--color-line)", borderRadius: "6px", outline: "none", fontSize: "13px", resize: "vertical" }} />
                    </div>
                  </div>
                  
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--color-charcoal)", marginBottom: "6px" }}>Side Image</label>
                    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                      <div style={{ width: "120px", height: "80px", borderRadius: "4px", overflow: "hidden", position: "relative", border: "1px solid var(--color-line)" }}>
                        <Image src={problemData.image} alt="Problem" fill style={{ objectFit: "cover" }} />
                      </div>
                      <label style={{ padding: "8px 12px", border: "1px solid var(--color-line)", backgroundColor: "white", borderRadius: "6px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>
                        Change Image
                        <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleImageUpload(e, (url) => setProblemData({...problemData, image: url}))} />
                      </label>
                      <span style={{ fontSize: "11px", color: "var(--color-charcoal)" }}>Recommended: 800x1000</span>
                    </div>
                  </div>
                </div>

                {/* Right side: Differences Items */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-black)", margin: 0, borderBottom: "1px solid var(--color-line)", paddingBottom: "8px" }}>Why Choose Us Items</h3>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {differencesData.map((diff, index) => (
                      <div key={diff.id} style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "12px", border: "1px solid var(--color-line)", borderRadius: "8px", backgroundColor: "#f8fafc" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "13px", fontWeight: 600 }}>Item {index + 1}</span>
                          <button onClick={() => setDifferencesData(differencesData.filter(d => d.id !== diff.id))} style={{ background: "none", border: "none", color: "red", cursor: "pointer" }}><Trash2 size={14} /></button>
                        </div>
                        
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                          <input type="text" placeholder="Title (EN)" value={diff.title.en} onChange={(e) => {
                            const newData = [...differencesData];
                            newData[index].title = { ...newData[index].title, en: e.target.value };
                            setDifferencesData(newData);
                          }} style={{ padding: "6px", border: "1px solid var(--color-line)", borderRadius: "4px", outline: "none", fontSize: "13px", fontWeight: 600, width: "100%" }} />
                          <input type="text" placeholder="Title (BN)" value={diff.title.bn} onChange={(e) => {
                            const newData = [...differencesData];
                            newData[index].title = { ...newData[index].title, bn: e.target.value };
                            setDifferencesData(newData);
                          }} style={{ padding: "6px", border: "1px solid var(--color-line)", borderRadius: "4px", outline: "none", fontSize: "13px", fontWeight: 600, width: "100%" }} />
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                          <input type="text" placeholder="Description (EN)" value={diff.desc.en} onChange={(e) => {
                            const newData = [...differencesData];
                            newData[index].desc = { ...newData[index].desc, en: e.target.value };
                            setDifferencesData(newData);
                          }} style={{ padding: "6px", border: "1px solid var(--color-line)", borderRadius: "4px", outline: "none", fontSize: "12px", width: "100%" }} />
                          <input type="text" placeholder="Description (BN)" value={diff.desc.bn} onChange={(e) => {
                            const newData = [...differencesData];
                            newData[index].desc = { ...newData[index].desc, bn: e.target.value };
                            setDifferencesData(newData);
                          }} style={{ padding: "6px", border: "1px solid var(--color-line)", borderRadius: "4px", outline: "none", fontSize: "12px", width: "100%" }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => setDifferencesData([...differencesData, { id: Date.now(), title: {en: "New Item", bn: "নতুন আইটেম"}, desc: {en: "Description here", bn: "এখানে বর্ণনা"} }])}
                    style={{ padding: "10px", border: "1px dashed var(--color-line)", backgroundColor: "white", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                  >
                    <Plus size={14} /> Add Difference Item
                  </button>

                  <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--color-line)" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--color-black)", marginBottom: "8px" }}>Technician Team Photo</label>
                    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                      <div style={{ width: "120px", height: "80px", borderRadius: "4px", overflow: "hidden", position: "relative", border: "1px solid var(--color-line)" }}>
                        <Image src={teamImage} alt="Team" fill style={{ objectFit: "cover" }} />
                      </div>
                      <label style={{ padding: "8px 12px", border: "1px solid var(--color-line)", backgroundColor: "white", borderRadius: "6px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>
                        Change Image
                        <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleImageUpload(e, (url) => setTeamImage(url))} />
                      </label>
                    </div>
                  </div>
                </div>

              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px" }}>
                <button onClick={(e) => simulateAction(e, "Saving Changes...")} style={{ padding: "12px 24px", backgroundColor: "var(--color-orange)", color: "white", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Save size={16} /> Save Section Content
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 4. Testimonials */}
        <div style={{ backgroundColor: "white", borderRadius: "12px", border: "1px solid var(--color-line)", overflow: "hidden" }}>
          <button 
            onClick={() => toggleSection("testimonials")}
            style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", background: "none", border: "none", cursor: "pointer" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "8px", backgroundColor: "rgba(253, 69, 2, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-orange)" }}>
                <MessageSquare size={20} />
              </div>
              <div style={{ textAlign: "left" }}>
                <h2 style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-black)", margin: 0 }}>4. Testimonials</h2>
                <span style={{ fontSize: "13px", color: "var(--color-charcoal)" }}>Manage customer reviews and background.</span>
              </div>
            </div>
            {openSection === "testimonials" ? <ChevronUp size={20} color="var(--color-charcoal)" /> : <ChevronDown size={20} color="var(--color-charcoal)" />}
          </button>
          
          {openSection === "testimonials" && (
            <div style={{ padding: "0 24px 24px", borderTop: "1px solid var(--color-line)" }}>
              
              <div style={{ marginTop: "24px", paddingBottom: "24px", borderBottom: "1px solid var(--color-line)" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--color-black)", marginBottom: "8px" }}>Testimonial Background Image</label>
                <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                  <div style={{ width: "160px", height: "80px", borderRadius: "8px", overflow: "hidden", position: "relative", border: "1px solid var(--color-line)" }}>
                    <Image src={testimonialBg} alt="Testimonial Background" fill style={{ objectFit: "cover" }} />
                  </div>
                  <label style={{ padding: "10px 16px", backgroundColor: "white", border: "1px solid var(--color-line)", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>
                    Change Background
                    <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleImageUpload(e, (url) => setTestimonialBg(url))} />
                  </label>
                  <span style={{ fontSize: "11px", color: "var(--color-charcoal)" }}>Recommended: 1920x1080</span>
                </div>
              </div>

              <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-black)", margin: 0 }}>Customer Reviews Array</h3>

                {testimonialsData.map((review, index) => (
                  <div key={review.id} style={{ padding: "16px", border: "1px solid var(--color-line)", borderRadius: "8px", backgroundColor: "#f8fafc", display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-charcoal)" }}>Customer Name</label>
                      <button 
                        onClick={() => setTestimonialsData(testimonialsData.filter(t => t.id !== review.id))}
                        style={{ background: "none", border: "none", color: "red", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: 600 }}
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      <div>
                        <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-charcoal)" }}>Customer Name (English)</label>
                        <input type="text" value={review.name.en} onChange={(e) => {
                          const newData = [...testimonialsData];
                          newData[index].name = { ...newData[index].name, en: e.target.value };
                          setTestimonialsData(newData);
                        }} style={{ width: "100%", padding: "10px", border: "1px solid var(--color-line)", borderRadius: "6px", outline: "none", fontSize: "13px", fontWeight: 600 }} />
                      </div>
                      <div>
                        <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-charcoal)" }}>Customer Name (Bangla)</label>
                        <input type="text" value={review.name.bn} onChange={(e) => {
                          const newData = [...testimonialsData];
                          newData[index].name = { ...newData[index].name, bn: e.target.value };
                          setTestimonialsData(newData);
                        }} style={{ width: "100%", padding: "10px", border: "1px solid var(--color-line)", borderRadius: "6px", outline: "none", fontSize: "13px", fontWeight: 600 }} />
                      </div>
                    </div>
                    
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      <div>
                        <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-charcoal)" }}>Review Text (English)</label>
                        <textarea value={review.review.en} onChange={(e) => {
                          const newData = [...testimonialsData];
                          newData[index].review = { ...newData[index].review, en: e.target.value };
                          setTestimonialsData(newData);
                        }} rows={2} style={{ width: "100%", padding: "10px", border: "1px solid var(--color-line)", borderRadius: "6px", outline: "none", fontSize: "13px", resize: "vertical" }} />
                      </div>
                      <div>
                        <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-charcoal)" }}>Review Text (Bangla)</label>
                        <textarea value={review.review.bn} onChange={(e) => {
                          const newData = [...testimonialsData];
                          newData[index].review = { ...newData[index].review, bn: e.target.value };
                          setTestimonialsData(newData);
                        }} rows={2} style={{ width: "100%", padding: "10px", border: "1px solid var(--color-line)", borderRadius: "6px", outline: "none", fontSize: "13px", resize: "vertical" }} />
                      </div>
                    </div>
                    
                    <div style={{ display: "flex", gap: "12px", alignItems: "center", marginTop: "4px" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden", position: "relative", border: "1px solid var(--color-line)", backgroundColor: "var(--color-orange)", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                        {review.image ? <Image src={review.image} alt="Profile" fill style={{ objectFit: "cover" }} /> : <User size={20} />}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <label style={{ padding: "6px 10px", border: "1px solid var(--color-line)", backgroundColor: "white", borderRadius: "6px", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}>
                          Upload Profile Image
                          <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleImageUpload(e, (url) => {
                            const newData = [...testimonialsData];
                            newData[index].image = url;
                            setTestimonialsData(newData);
                          })} />
                        </label>
                        <span style={{ fontSize: "10px", color: "var(--color-charcoal)" }}>200x200 (1:1)</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <button 
                  onClick={() => setTestimonialsData([...testimonialsData, { id: Date.now(), name: {en: "New Customer", bn: "নতুন গ্রাহক"}, review: {en: "Write a new review here...", bn: "এখানে নতুন মতামত লিখুন..."}, image: "" }])}
                  style={{ border: "2px dashed var(--color-line)", borderRadius: "8px", padding: "16px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", cursor: "pointer", background: "white", color: "var(--color-black)", fontWeight: 600, fontSize: "14px" }}
                >
                  <Plus size={18} /> Add New Testimonial
                </button>

                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
                  <button onClick={(e) => simulateAction(e, "Saving Changes...")} style={{ padding: "12px 24px", backgroundColor: "var(--color-orange)", color: "white", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
                    <Save size={16} /> Save Reviews Array
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* 5. Footer Links */}
        <div style={{ backgroundColor: "white", borderRadius: "12px", border: "1px solid var(--color-line)", overflow: "hidden" }}>
          <button 
            onClick={() => toggleSection("footerLinks")}
            style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", background: "none", border: "none", cursor: "pointer" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "8px", backgroundColor: "rgba(253, 69, 2, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-orange)" }}>
                <LinkIcon size={20} />
              </div>
              <div style={{ textAlign: "left" }}>
                <h2 style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-black)", margin: 0 }}>5. Footer Links</h2>
                <span style={{ fontSize: "13px", color: "var(--color-charcoal)" }}>Manage 'Our Services' and 'Quick links' menus.</span>
              </div>
            </div>
            {openSection === "footerLinks" ? <ChevronUp size={20} color="var(--color-charcoal)" /> : <ChevronDown size={20} color="var(--color-charcoal)" />}
          </button>
          
          {openSection === "footerLinks" && (
            <div style={{ padding: "0 24px 24px", borderTop: "1px solid var(--color-line)" }}>
              <div style={{ marginTop: "24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
                
                {/* Left side: Our Services Links */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-black)", margin: 0, borderBottom: "1px solid var(--color-line)", paddingBottom: "8px" }}>Our Services Links</h3>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {(footerServices || []).map((link, index) => (
                      <div key={link.id} style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "12px", border: "1px solid var(--color-line)", borderRadius: "8px", backgroundColor: "#f8fafc" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "13px", fontWeight: 600 }}>Link {index + 1}</span>
                          <button onClick={() => setFooterServices(footerServices.filter(l => l.id !== link.id))} style={{ background: "none", border: "none", color: "red", cursor: "pointer" }}><Trash2 size={14} /></button>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                          <input type="text" value={link.text.en} onChange={(e) => {
                            const newData = [...footerServices];
                            newData[index].text = { ...newData[index].text, en: e.target.value };
                            setFooterServices(newData);
                          }} style={{ padding: "6px", border: "1px solid var(--color-line)", borderRadius: "4px", outline: "none", fontSize: "13px", fontWeight: 600, width: "100%" }} placeholder="Link Text (English)" />
                          <input type="text" value={link.text.bn} onChange={(e) => {
                            const newData = [...footerServices];
                            newData[index].text = { ...newData[index].text, bn: e.target.value };
                            setFooterServices(newData);
                          }} style={{ padding: "6px", border: "1px solid var(--color-line)", borderRadius: "4px", outline: "none", fontSize: "13px", fontWeight: 600, width: "100%" }} placeholder="Link Text (Bengali)" />
                        </div>
                        <input type="text" value={link.url} onChange={(e) => {
                          const newData = [...footerServices];
                          newData[index].url = e.target.value;
                          setFooterServices(newData);
                        }} style={{ padding: "8px", border: "1px solid var(--color-line)", borderRadius: "6px", outline: "none", fontSize: "13px" }} placeholder="/services/slug" />
                        
                        {/* Custom Page Content Fields */}
                        <div style={{ marginTop: "8px", borderTop: "1px dashed var(--color-line)", paddingTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                          <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--color-black)" }}>Page Content (Appears when user clicks this link)</span>
                          
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                            <input type="text" value={link.pageSubtitle?.en || ""} onChange={(e) => {
                              const newData = [...footerServices];
                              newData[index].pageSubtitle = { en: e.target.value, bn: newData[index].pageSubtitle?.bn || "" };
                              setFooterServices(newData);
                            }} style={{ padding: "8px", border: "1px solid var(--color-line)", borderRadius: "6px", outline: "none", fontSize: "12px" }} placeholder="Subtitle (English)" />
                            
                            <input type="text" value={link.pageSubtitle?.bn || ""} onChange={(e) => {
                              const newData = [...footerServices];
                              newData[index].pageSubtitle = { en: newData[index].pageSubtitle?.en || "", bn: e.target.value };
                              setFooterServices(newData);
                            }} style={{ padding: "8px", border: "1px solid var(--color-line)", borderRadius: "6px", outline: "none", fontSize: "12px" }} placeholder="Subtitle (Bengali)" />
                          </div>

                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                            <textarea value={link.pageContent?.en || ""} onChange={(e) => {
                              const newData = [...footerServices];
                              newData[index].pageContent = { en: e.target.value, bn: newData[index].pageContent?.bn || "" };
                              setFooterServices(newData);
                            }} rows={3} style={{ padding: "8px", border: "1px solid var(--color-line)", borderRadius: "6px", outline: "none", fontSize: "12px", resize: "vertical" }} placeholder="Full Content (English)" />
                            
                            <textarea value={link.pageContent?.bn || ""} onChange={(e) => {
                              const newData = [...footerServices];
                              newData[index].pageContent = { en: newData[index].pageContent?.en || "", bn: e.target.value };
                              setFooterServices(newData);
                            }} rows={3} style={{ padding: "8px", border: "1px solid var(--color-line)", borderRadius: "6px", outline: "none", fontSize: "12px", resize: "vertical" }} placeholder="Full Content (Bengali)" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => setFooterServices([...(footerServices || []), { id: Date.now().toString(), text: {en: "New Service Link", bn: "নতুন সার্ভিস লিংক"}, url: "/services/new-service" }])}
                    style={{ padding: "10px", border: "1px dashed var(--color-line)", backgroundColor: "white", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                  >
                    <Plus size={14} /> Add Service Link
                  </button>
                </div>

                {/* Right side: Quick Links */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-black)", margin: 0, borderBottom: "1px solid var(--color-line)", paddingBottom: "8px" }}>Quick Links</h3>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {(footerQuickLinks || []).map((link, index) => (
                      <div key={link.id} style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "12px", border: "1px solid var(--color-line)", borderRadius: "8px", backgroundColor: "#f8fafc" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "13px", fontWeight: 600 }}>Link {index + 1}</span>
                          <button onClick={() => setFooterQuickLinks(footerQuickLinks.filter(l => l.id !== link.id))} style={{ background: "none", border: "none", color: "red", cursor: "pointer" }}><Trash2 size={14} /></button>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                          <input type="text" value={link.text.en} onChange={(e) => {
                            const newData = [...footerQuickLinks];
                            newData[index].text = { ...newData[index].text, en: e.target.value };
                            setFooterQuickLinks(newData);
                          }} style={{ padding: "6px", border: "1px solid var(--color-line)", borderRadius: "4px", outline: "none", fontSize: "13px", fontWeight: 600, width: "100%" }} placeholder="Link Text (English)" />
                          <input type="text" value={link.text.bn} onChange={(e) => {
                            const newData = [...footerQuickLinks];
                            newData[index].text = { ...newData[index].text, bn: e.target.value };
                            setFooterQuickLinks(newData);
                          }} style={{ padding: "6px", border: "1px solid var(--color-line)", borderRadius: "4px", outline: "none", fontSize: "13px", fontWeight: 600, width: "100%" }} placeholder="Link Text (Bengali)" />
                        </div>
                        <input type="text" value={link.url} onChange={(e) => {
                          const newData = [...footerQuickLinks];
                          newData[index].url = e.target.value;
                          setFooterQuickLinks(newData);
                        }} style={{ padding: "8px", border: "1px solid var(--color-line)", borderRadius: "6px", outline: "none", fontSize: "13px" }} placeholder="/legal/slug" />
                        
                        {/* Custom Page Content Fields */}
                        <div style={{ marginTop: "8px", borderTop: "1px dashed var(--color-line)", paddingTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                          <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--color-black)" }}>Page Content (Appears when user clicks this link)</span>
                          
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                            <input type="text" value={link.pageSubtitle?.en || ""} onChange={(e) => {
                              const newData = [...footerQuickLinks];
                              newData[index].pageSubtitle = { en: e.target.value, bn: newData[index].pageSubtitle?.bn || "" };
                              setFooterQuickLinks(newData);
                            }} style={{ padding: "8px", border: "1px solid var(--color-line)", borderRadius: "6px", outline: "none", fontSize: "12px" }} placeholder="Subtitle / Short Description (English)" />
                            
                            <input type="text" value={link.pageSubtitle?.bn || ""} onChange={(e) => {
                              const newData = [...footerQuickLinks];
                              newData[index].pageSubtitle = { en: newData[index].pageSubtitle?.en || "", bn: e.target.value };
                              setFooterQuickLinks(newData);
                            }} style={{ padding: "8px", border: "1px solid var(--color-line)", borderRadius: "6px", outline: "none", fontSize: "12px" }} placeholder="Subtitle / Short Description (Bengali)" />
                          </div>

                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                            <textarea value={link.pageContent?.en || ""} onChange={(e) => {
                              const newData = [...footerQuickLinks];
                              newData[index].pageContent = { en: e.target.value, bn: newData[index].pageContent?.bn || "" };
                              setFooterQuickLinks(newData);
                            }} rows={4} style={{ padding: "8px", border: "1px solid var(--color-line)", borderRadius: "6px", outline: "none", fontSize: "12px", resize: "vertical" }} placeholder="Full Content (English)" />
                            
                            <textarea value={link.pageContent?.bn || ""} onChange={(e) => {
                              const newData = [...footerQuickLinks];
                              newData[index].pageContent = { en: newData[index].pageContent?.en || "", bn: e.target.value };
                              setFooterQuickLinks(newData);
                            }} rows={4} style={{ padding: "8px", border: "1px solid var(--color-line)", borderRadius: "6px", outline: "none", fontSize: "12px", resize: "vertical" }} placeholder="Full Content (Bengali)" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => setFooterQuickLinks([...(footerQuickLinks || []), { id: Date.now().toString(), text: {en: "New Quick Link", bn: "নতুন কুইক লিংক"}, url: "/legal/new-link" }])}
                    style={{ padding: "10px", border: "1px dashed var(--color-line)", backgroundColor: "white", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                  >
                    <Plus size={14} /> Add Quick Link
                  </button>
                </div>

              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px" }}>
                <button onClick={(e) => simulateAction(e, "Saving Changes...")} style={{ padding: "12px 24px", backgroundColor: "var(--color-orange)", color: "white", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Save size={16} /> Save Footer Links
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 6. Contact Information */}
        <div style={{ backgroundColor: "white", borderRadius: "12px", border: "1px solid var(--color-line)", overflow: "hidden" }}>
          <button 
            onClick={() => toggleSection("contact")}
            style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", background: "none", border: "none", cursor: "pointer" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "8px", backgroundColor: "rgba(253, 69, 2, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-orange)" }}>
                <PhoneCall size={20} />
              </div>
              <div style={{ textAlign: "left" }}>
                <h2 style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-black)", margin: 0 }}>6. Contact Information</h2>
                <span style={{ fontSize: "13px", color: "var(--color-charcoal)" }}>Manage phone numbers, email, and social links.</span>
              </div>
            </div>
            {openSection === "contact" ? <ChevronUp size={20} color="var(--color-charcoal)" /> : <ChevronDown size={20} color="var(--color-charcoal)" />}
          </button>
          
          {openSection === "contact" && (
            <div style={{ padding: "0 24px 24px", borderTop: "1px solid var(--color-line)" }}>
              <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
                
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--color-black)", marginBottom: "8px" }}>Phone Numbers (Comma Separated)</label>
                  <input type="text" value={contactData?.phones?.join(", ") || ""} onChange={(e) => {
                    const phones = e.target.value.split(",").map(p => p.trim());
                    setContactData({...contactData, phones});
                  }} style={{ width: "100%", padding: "12px 16px", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "14px" }} />
                </div>
                
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--color-black)", marginBottom: "8px" }}>Email Address</label>
                  <input type="email" value={contactData?.email || ""} onChange={(e) => setContactData({...contactData, email: e.target.value})} style={{ width: "100%", padding: "12px 16px", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "14px" }} />
                </div>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--color-black)", marginBottom: "8px" }}>Facebook URL</label>
                    <input type="url" value={contactData?.facebook || ""} onChange={(e) => setContactData({...contactData, facebook: e.target.value})} style={{ width: "100%", padding: "12px 16px", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "14px" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--color-black)", marginBottom: "8px" }}>Instagram URL</label>
                    <input type="url" value={contactData?.instagram || ""} onChange={(e) => setContactData({...contactData, instagram: e.target.value})} style={{ width: "100%", padding: "12px 16px", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "14px" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--color-black)", marginBottom: "8px" }}>LinkedIn URL</label>
                    <input type="url" value={contactData?.linkedin || ""} onChange={(e) => setContactData({...contactData, linkedin: e.target.value})} style={{ width: "100%", padding: "12px 16px", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "14px" }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--color-black)", marginBottom: "8px" }}>Legal Statement URL</label>
                  <input type="text" value={contactData?.legalStatementUrl || ""} onChange={(e) => setContactData({...contactData, legalStatementUrl: e.target.value})} style={{ width: "100%", padding: "12px 16px", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "14px" }} />
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
                  <button onClick={(e) => simulateAction(e, "Saving Changes...")} style={{ padding: "12px 24px", backgroundColor: "var(--color-orange)", color: "white", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
                    <Save size={16} /> Save Contact Info
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 7. Price Calculator Configuration */}
        <div style={{ backgroundColor: "white", borderRadius: "12px", border: "1px solid var(--color-line)", overflow: "hidden" }}>
          <button 
            onClick={() => toggleSection("pricing")}
            style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", background: "none", border: "none", cursor: "pointer" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "8px", backgroundColor: "rgba(253, 69, 2, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-orange)" }}>
                <Calculator size={20} />
              </div>
              <div style={{ textAlign: "left" }}>
                <h2 style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-black)", margin: 0 }}>7. Price Calculator Configuration</h2>
                <span style={{ fontSize: "13px", color: "var(--color-charcoal)" }}>Manage price per square foot by division and pest type.</span>
              </div>
            </div>
            {openSection === "pricing" ? <ChevronUp size={20} color="var(--color-charcoal)" /> : <ChevronDown size={20} color="var(--color-charcoal)" />}
          </button>
          
          {openSection === "pricing" && (
            <div style={{ padding: "0 24px 24px", borderTop: "1px solid var(--color-line)", overflowX: "auto" }}>
              <div style={{ marginTop: "24px" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
                  <thead>
                    <tr>
                      <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid var(--color-line)", color: "var(--color-charcoal)", fontSize: "13px", fontWeight: 600 }}>Division</th>
                      {pricingData && Object.keys(Object.values(pricingData)[0] || {}).map(pest => (
                        <th key={pest} style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid var(--color-line)", color: "var(--color-charcoal)", fontSize: "13px", fontWeight: 600 }}>{pest} (৳/sqft)</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pricingData && Object.entries(pricingData).map(([division, pests]) => (
                      <tr key={division}>
                        <td style={{ padding: "12px", borderBottom: "1px solid var(--color-line)", fontWeight: 600, fontSize: "14px" }}>{division}</td>
                        {Object.entries(pests).map(([pest, priceObj]) => (
                          <td key={pest} style={{ padding: "12px", borderBottom: "1px solid var(--color-line)", verticalAlign: "top" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <span style={{ fontSize: "11px", color: "var(--color-charcoal)", width: "24px" }}>Res:</span>
                                <input 
                                  type="number" 
                                  value={priceObj.homes} 
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    const newPrice = val === "" ? 0 : parseFloat(val);
                                    setPricingData({
                                      ...pricingData,
                                      [division]: {
                                        ...pricingData[division],
                                        [pest]: { ...pricingData[division][pest], homes: newPrice }
                                      }
                                    });
                                  }}
                                  style={{ width: "60px", padding: "4px 8px", border: "1px solid var(--color-line)", borderRadius: "4px", outline: "none", fontSize: "13px" }} 
                                />
                              </div>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <span style={{ fontSize: "11px", color: "var(--color-charcoal)", width: "24px" }}>Com:</span>
                                <input 
                                  type="number" 
                                  value={priceObj.facilities} 
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    const newPrice = val === "" ? 0 : parseFloat(val);
                                    setPricingData({
                                      ...pricingData,
                                      [division]: {
                                        ...pricingData[division],
                                        [pest]: { ...pricingData[division][pest], facilities: newPrice }
                                      }
                                    });
                                  }}
                                  style={{ width: "60px", padding: "4px 8px", border: "1px solid var(--color-line)", borderRadius: "4px", outline: "none", fontSize: "13px" }} 
                                />
                              </div>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px" }}>
                  <button onClick={(e) => simulateAction(e, "Saving Pricing...")} style={{ padding: "12px 24px", backgroundColor: "var(--color-orange)", color: "white", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
                    <Save size={16} /> Save Pricing
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <BlogEditorPanel openSection={openSection} toggleSection={toggleSection} simulateAction={simulateAction} />

      </div>
    </div>
  );
}
