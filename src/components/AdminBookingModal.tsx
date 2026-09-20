"use client";
import React, { useState } from "react";
import { X, User, Phone, MapPin, Briefcase } from "lucide-react";
import { useJourney } from "@/context/JourneyContext";

interface AdminBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminBookingModal({ isOpen, onClose }: AdminBookingModalProps) {
  const { addBooking } = useJourney();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "General Pest Control",
    customerType: "Residential",
    address: "",
    amount: "৳0"
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `SRK-${Math.floor(1000 + Math.random() * 9000)}`;
    addBooking({
      id: newId,
      customerName: formData.name,
      phone: formData.phone,
      email: formData.email,
      service: formData.service,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: "TBD",
      amount: formData.amount,
      status: "Pending",
      address: formData.address,
      customerType: formData.customerType as "Residential" | "Commercial"
    });
    
    // Reset and close
    setFormData({
      name: "", phone: "", email: "", service: "General Pest Control", customerType: "Residential", address: "", amount: "৳0"
    });
    onClose();
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div style={{
        backgroundColor: "white",
        borderRadius: "16px",
        width: "100%",
        maxWidth: "600px",
        maxHeight: "90vh",
        overflowY: "auto",
        boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
      }}>
        
        {/* Header */}
        <div style={{ padding: "24px", borderBottom: "1px solid var(--color-line)", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, backgroundColor: "white", zIndex: 10, borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "var(--color-black)", margin: 0 }}>Create Manual Booking</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-charcoal)", padding: "4px" }}>
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-black)" }}>Customer Name *</label>
              <div style={{ position: "relative" }}>
                <User size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-charcoal)" }} />
                <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: "100%", padding: "10px 12px 10px 36px", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "14px" }} placeholder="John Doe" />
              </div>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-black)" }}>Phone Number *</label>
              <div style={{ position: "relative" }}>
                <Phone size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-charcoal)" }} />
                <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ width: "100%", padding: "10px 12px 10px 36px", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "14px" }} placeholder="01712345678" />
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-black)" }}>Service Type</label>
              <select value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})} style={{ width: "100%", padding: "10px 12px", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "14px", backgroundColor: "white" }}>
                <option>General Pest Control</option>
                <option>Corporate Termite Control</option>
                <option>Bed Bug Eradication</option>
                <option>Rodent Control</option>
                <option>Mosquito Fogging</option>
              </select>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-black)" }}>Customer Type</label>
              <div style={{ position: "relative" }}>
                <Briefcase size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-charcoal)" }} />
                <select value={formData.customerType} onChange={e => setFormData({...formData, customerType: e.target.value})} style={{ width: "100%", padding: "10px 12px 10px 36px", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "14px", backgroundColor: "white" }}>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-black)" }}>Service Address *</label>
            <div style={{ position: "relative" }}>
              <MapPin size={16} style={{ position: "absolute", left: "12px", top: "12px", color: "var(--color-charcoal)" }} />
              <textarea required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} rows={2} style={{ width: "100%", padding: "10px 12px 10px 36px", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "14px", resize: "vertical", fontFamily: "inherit" }} placeholder="Detailed address..."></textarea>
            </div>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-black)" }}>Estimated Amount</label>
            <input type="text" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} style={{ width: "100%", padding: "10px 12px", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "14px" }} placeholder="৳3,500" />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "16px", paddingTop: "24px", borderTop: "1px solid var(--color-line)" }}>
            <button type="button" onClick={onClose} style={{ padding: "12px 24px", backgroundColor: "white", border: "1px solid var(--color-line)", borderRadius: "8px", color: "var(--color-black)", fontWeight: 600, fontSize: "15px", cursor: "pointer" }}>
              Cancel
            </button>
            <button type="submit" style={{ padding: "12px 24px", backgroundColor: "var(--color-orange)", border: "none", borderRadius: "8px", color: "white", fontWeight: 600, fontSize: "15px", cursor: "pointer" }}>
              Create Booking
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
