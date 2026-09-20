"use client";
import React, { useState } from "react";
import { Search, Calendar, MapPin, CheckCircle, Clock } from "lucide-react";
import { useJourney } from "@/context/JourneyContext";

export default function AdminSchedule() {
  const { bookings, completeService } = useJourney();
  const [searchQuery, setSearchQuery] = useState("");

  const scheduledBookings = bookings.filter(b => b.status === "Scheduled");

  const filtered = scheduledBookings.filter(booking => 
    booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.phone.includes(searchQuery)
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-black)", margin: "0 0 8px" }}>Schedule & Dispatch</h1>
          <p style={{ color: "var(--color-charcoal)", margin: 0 }}>Manage confirmed appointments and complete services.</p>
        </div>
      </div>

      <div style={{ backgroundColor: "white", borderRadius: "12px", border: "1px solid var(--color-line)", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
        
        {/* Toolbar */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--color-line)" }}>
          <div style={{ position: "relative", width: "100%", maxWidth: "400px" }}>
            <Search size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-charcoal)" }} />
            <input 
              type="text" 
              placeholder="Search scheduled jobs..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "100%", padding: "10px 16px 10px 40px", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "14px" }} 
            />
          </div>
        </div>

        {/* Data List */}
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
          {filtered.length > 0 ? filtered.map((job) => (
            <div key={job.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px", padding: "24px", borderRadius: "12px", border: "1px solid var(--color-line)", backgroundColor: "#f8fafc" }}>
              
              <div>
                <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--color-orange)", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{job.id}</div>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-black)", marginBottom: "4px" }}>{job.service}</div>
                <div style={{ fontSize: "15px", color: "var(--color-black)", fontWeight: 600 }}>{job.customerName} - {job.phone}</div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--color-charcoal)", fontSize: "14px", fontWeight: 500 }}>
                  <Calendar size={16} /> {job.date}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--color-charcoal)", fontSize: "14px", fontWeight: 500 }}>
                  <Clock size={16} /> {job.time}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--color-charcoal)", fontSize: "14px", fontWeight: 500 }}>
                  <MapPin size={16} /> {job.address}
                </div>
              </div>

              <div>
                <button 
                  onClick={() => completeService(job.id)}
                  style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 24px", backgroundColor: "var(--color-black)", border: "none", borderRadius: "8px", color: "white", fontWeight: 600, fontSize: "15px", cursor: "pointer", transition: "background-color 0.2s" }}
                >
                  <CheckCircle size={18} /> Complete Service
                </button>
              </div>

            </div>
          )) : (
            <div style={{ padding: "40px", textAlign: "center", color: "var(--color-charcoal)" }}>
              No scheduled jobs found. Go to Bookings to schedule a request.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
