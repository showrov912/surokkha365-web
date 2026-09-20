"use client";
import React, { useState } from "react";
import { Search, Filter, MoreHorizontal, Download, Plus, CalendarCheck, X } from "lucide-react";
import { useJourney, Booking } from "@/context/JourneyContext";
import AdminBookingModal from "@/components/AdminBookingModal";
import ScheduleModal from "@/components/ScheduleModal";

export default function AdminBookings() {
  const { bookings, confirmSchedule, addBooking, cancelBooking } = useJourney();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  const filteredBookings = bookings.filter((booking: Booking) => {
    const matchesSearch = 
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.phone.includes(searchQuery);
      
    const matchesStatus = statusFilter === "All" || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-black)", margin: "0 0 8px" }}>Bookings Management</h1>
          <p style={{ color: "var(--color-charcoal)", margin: 0 }}>View and manage all customer service requests.</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button 
            onClick={() => {
              const headers = "ID,Customer,Phone,Service,Date,Status\n";
              const rows = filteredBookings.map(b => `${b.id},"${b.customerName}",${b.phone},"${b.service}",${b.date},${b.status}`).join("\n");
              const blob = new Blob([headers + rows], { type: 'text/csv' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'bookings.csv';
              a.click();
            }} 
            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", backgroundColor: "white", border: "1px solid var(--color-line)", borderRadius: "8px", color: "var(--color-black)", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}
          >
            <Download size={16} /> Export CSV
          </button>
          <button 
            onClick={() => setIsModalOpen(true)} 
            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", backgroundColor: "var(--color-orange)", border: "none", borderRadius: "8px", color: "white", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}
          >
            <Plus size={16} /> New Booking
          </button>
        </div>
      </div>
      
      <AdminBookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ScheduleModal isOpen={isScheduleModalOpen} onClose={() => { setIsScheduleModalOpen(false); setSelectedBookingId(null); }} bookingId={selectedBookingId} />

      <div style={{ backgroundColor: "white", borderRadius: "12px", border: "1px solid var(--color-line)", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
        
        {/* Toolbar */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--color-line)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ position: "relative", width: "100%", maxWidth: "320px" }}>
            <Search size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-charcoal)" }} />
            <input 
              type="text" 
              placeholder="Search by ID, Customer, or Phone..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "100%", padding: "10px 16px 10px 40px", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "14px" }} 
            />
          </div>
          
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Filter size={16} color="var(--color-charcoal)" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ padding: "10px 16px", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "14px", color: "var(--color-charcoal)", backgroundColor: "white", cursor: "pointer" }}
            >
              <option value="All">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f8fafc", textAlign: "left", borderBottom: "1px solid var(--color-line)" }}>
                <th style={{ padding: "16px 24px", fontSize: "13px", color: "var(--color-charcoal)", fontWeight: 600, textTransform: "uppercase" }}>ID</th>
                <th style={{ padding: "16px 24px", fontSize: "13px", color: "var(--color-charcoal)", fontWeight: 600, textTransform: "uppercase" }}>Customer Details</th>
                <th style={{ padding: "16px 24px", fontSize: "13px", color: "var(--color-charcoal)", fontWeight: 600, textTransform: "uppercase" }}>Service & Schedule</th>
                <th style={{ padding: "16px 24px", fontSize: "13px", color: "var(--color-charcoal)", fontWeight: 600, textTransform: "uppercase" }}>Amount</th>
                <th style={{ padding: "16px 24px", fontSize: "13px", color: "var(--color-charcoal)", fontWeight: 600, textTransform: "uppercase" }}>Status</th>
                <th style={{ padding: "16px 24px", fontSize: "13px", color: "var(--color-charcoal)", fontWeight: 600, textTransform: "uppercase", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length > 0 ? filteredBookings.map((booking, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid var(--color-line)" }}>
                  <td style={{ padding: "20px 24px", fontSize: "14px", fontWeight: 700, color: "var(--color-black)" }}>
                    {booking.id}
                  </td>
                  <td style={{ padding: "20px 24px" }}>
                    <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-black)", marginBottom: "4px" }}>{booking.customerName}</div>
                    <div style={{ fontSize: "13px", color: "var(--color-charcoal)" }}>{booking.phone}</div>
                  </td>
                  <td style={{ padding: "20px 24px" }}>
                    <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-black)", marginBottom: "4px" }}>{booking.service}</div>
                    <div style={{ fontSize: "13px", color: "var(--color-charcoal)" }}>{booking.date} at {booking.time}</div>
                  </td>
                  <td style={{ padding: "20px 24px", fontSize: "15px", fontWeight: 600, color: "var(--color-black)" }}>
                    {booking.amount}
                  </td>
                  <td style={{ padding: "20px 24px" }}>
                    <span style={{ 
                      padding: "6px 12px", 
                      borderRadius: "20px", 
                      fontSize: "12px", 
                      fontWeight: 600,
                      display: "inline-block",
                      backgroundColor: booking.status === "Scheduled" ? "rgba(0,128,0,0.1)" : booking.status === "Pending" ? "rgba(255, 165, 0, 0.1)" : booking.status === "Cancelled" ? "rgba(255,0,0,0.1)" : "rgba(128,128,128,0.1)",
                      color: booking.status === "Scheduled" ? "green" : booking.status === "Pending" ? "darkorange" : booking.status === "Cancelled" ? "red" : "gray"
                    }}>
                      {booking.status}
                    </span>
                  </td>
                  <td style={{ padding: "20px 24px", textAlign: "right" }}>
                    {booking.status === "Pending" ? (
                      <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                        <button 
                          onClick={() => {
                            setSelectedBookingId(booking.id);
                            setIsScheduleModalOpen(true);
                          }}
                          style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "var(--color-orange)", color: "white", padding: "8px 16px", borderRadius: "8px", fontWeight: 600, fontSize: "13px", cursor: "pointer", border: "none" }}
                        >
                          <CalendarCheck size={16} /> Schedule
                        </button>
                        <button 
                          onClick={() => {
                            if(window.confirm(`Cancel booking ${booking.id}?`)) {
                              cancelBooking(booking.id);
                            }
                          }}
                          style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(255,0,0,0.1)", color: "red", padding: "8px 16px", borderRadius: "8px", fontWeight: 600, fontSize: "13px", cursor: "pointer", border: "none" }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : booking.status === "Scheduled" ? (
                      <button 
                        onClick={() => {
                          if(window.confirm(`Cancel scheduled booking ${booking.id}?`)) {
                            cancelBooking(booking.id);
                          }
                        }}
                        style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(255,0,0,0.1)", color: "red", padding: "8px 16px", borderRadius: "8px", fontWeight: 600, fontSize: "13px", cursor: "pointer", border: "none" }}
                      >
                        Cancel
                      </button>
                    ) : (
                      <button style={{ background: "none", border: "none", cursor: "not-allowed", color: "var(--color-line)" }}>
                        <MoreHorizontal size={20} />
                      </button>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} style={{ padding: "40px", textAlign: "center", color: "var(--color-charcoal)" }}>
                    No bookings found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid var(--color-line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: "13px", color: "var(--color-charcoal)" }}>Showing 1 to {filteredBookings.length} of {bookings.length} entries</div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button 
              onClick={(e) => {
                const btn = e.currentTarget;
                btn.style.backgroundColor = "var(--color-line)";
                setTimeout(() => { btn.style.backgroundColor = "white"; }, 500);
              }} 
              style={{ padding: "6px 12px", border: "1px solid var(--color-line)", backgroundColor: "white", borderRadius: "4px", fontSize: "13px", cursor: "pointer" }} 
              disabled
            >Previous</button>
            <button style={{ padding: "6px 12px", border: "1px solid var(--color-orange)", backgroundColor: "var(--color-orange)", color: "white", borderRadius: "4px", fontSize: "13px", cursor: "pointer" }}>1</button>
            <button 
              onClick={(e) => {
                const btn = e.currentTarget;
                btn.style.backgroundColor = "var(--color-line)";
                setTimeout(() => { btn.style.backgroundColor = "white"; }, 500);
              }} 
              style={{ padding: "6px 12px", border: "1px solid var(--color-line)", backgroundColor: "white", borderRadius: "4px", fontSize: "13px", cursor: "pointer" }}
            >2</button>
            <button 
              onClick={(e) => {
                const btn = e.currentTarget;
                btn.style.backgroundColor = "var(--color-line)";
                setTimeout(() => { btn.style.backgroundColor = "white"; }, 500);
              }} 
              style={{ padding: "6px 12px", border: "1px solid var(--color-line)", backgroundColor: "white", borderRadius: "4px", fontSize: "13px", cursor: "pointer" }}
            >Next</button>
          </div>
        </div>

      </div>
    </div>
  );
}
