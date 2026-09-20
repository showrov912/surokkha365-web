"use client";
import React, { useState } from "react";
import { X, Calendar, Clock } from "lucide-react";
import { useJourney } from "@/context/JourneyContext";

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string | null;
}

export default function ScheduleModal({ isOpen, onClose, bookingId }: ScheduleModalProps) {
  const { confirmSchedule } = useJourney();
  
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  if (!isOpen || !bookingId) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) return;
    
    // Format date nicely (e.g. 2026-10-20 -> Oct 20, 2026)
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    // Format time (e.g. 14:30 -> 02:30 PM)
    const [hours, minutes] = time.split(':');
    let h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12; // the hour '0' should be '12'
    const formattedTime = `${h < 10 ? '0' + h : h}:${minutes} ${ampm}`;

    confirmSchedule(bookingId, formattedDate, formattedTime);
    
    // Reset and close
    setDate("");
    setTime("");
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
        maxWidth: "400px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
      }}>
        
        {/* Header */}
        <div style={{ padding: "24px", borderBottom: "1px solid var(--color-line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-black)", margin: 0 }}>Schedule Technician</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-charcoal)", padding: "4px" }}>
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-black)" }}>Select Date</label>
            <div style={{ position: "relative" }}>
              <input 
                type="date" 
                required 
                value={date} 
                onChange={e => setDate(e.target.value)} 
                style={{ width: "100%", padding: "12px 16px", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "15px", fontFamily: "inherit" }} 
              />
            </div>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-black)" }}>Select Time</label>
            <div style={{ position: "relative" }}>
              <input 
                type="time" 
                required 
                value={time} 
                onChange={e => setTime(e.target.value)} 
                style={{ width: "100%", padding: "12px 16px", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "15px", fontFamily: "inherit" }} 
              />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "8px" }}>
            <button type="button" onClick={onClose} style={{ padding: "10px 20px", backgroundColor: "white", border: "1px solid var(--color-line)", borderRadius: "8px", color: "var(--color-black)", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>
              Cancel
            </button>
            <button type="submit" style={{ padding: "10px 20px", backgroundColor: "var(--color-orange)", border: "none", borderRadius: "8px", color: "white", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>
              Confirm Schedule
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
