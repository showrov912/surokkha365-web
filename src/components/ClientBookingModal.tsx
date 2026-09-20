"use client";
import React, { useState } from "react";
import { X, MapPin, Briefcase } from "lucide-react";
import { useJourney } from "@/context/JourneyContext";

interface ClientBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ClientBookingModal({ isOpen, onClose }: ClientBookingModalProps) {
  const { addBooking } = useJourney();
  
  const [formData, setFormData] = useState({
    service: "Corporate Termite Control",
    address: "Banani, Dhaka",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `SRK-${Math.floor(1000 + Math.random() * 9000)}`;
    addBooking({
      id: newId,
      customerName: "Acme Corp",
      phone: "01712345678",
      email: "contact@acmecorp.com",
      service: formData.service,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: "TBD",
      amount: "৳0",
      status: "Pending",
      address: formData.address,
      customerType: "Commercial"
    });
    
    // Reset and close
    setFormData({
      service: "Corporate Termite Control", address: "Banani, Dhaka"
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
        maxWidth: "500px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
      }}>
        
        {/* Header */}
        <div style={{ padding: "24px", borderBottom: "1px solid var(--color-line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "var(--color-black)", margin: 0 }}>Book New Service</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-charcoal)", padding: "4px" }}>
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-black)" }}>Service Type</label>
            <div style={{ position: "relative" }}>
              <Briefcase size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-charcoal)" }} />
              <select value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})} style={{ width: "100%", padding: "10px 12px 10px 36px", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "14px", backgroundColor: "white" }}>
                <option>Corporate Termite Control</option>
                <option>General Pest Control</option>
                <option>Bed Bug Eradication</option>
                <option>Rodent Control</option>
                <option>Mosquito Fogging</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-black)" }}>Service Address</label>
            <div style={{ position: "relative" }}>
              <MapPin size={16} style={{ position: "absolute", left: "12px", top: "12px", color: "var(--color-charcoal)" }} />
              <textarea required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} rows={3} style={{ width: "100%", padding: "10px 12px 10px 36px", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "14px", resize: "none", fontFamily: "inherit" }}></textarea>
            </div>
          </div>
          
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "8px" }}>
            <button type="button" onClick={onClose} style={{ padding: "12px 24px", backgroundColor: "white", border: "1px solid var(--color-line)", borderRadius: "8px", color: "var(--color-black)", fontWeight: 600, fontSize: "15px", cursor: "pointer" }}>
              Cancel
            </button>
            <button type="submit" style={{ padding: "12px 24px", backgroundColor: "var(--color-orange)", border: "none", borderRadius: "8px", color: "white", fontWeight: 600, fontSize: "15px", cursor: "pointer" }}>
              Request Service
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
