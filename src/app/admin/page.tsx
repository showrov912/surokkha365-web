"use client";
import React, { useState } from "react";
import Link from "next/link";
import { TrendingUp, Users, CalendarCheck, Clock, ArrowUpRight } from "lucide-react";
import { useJourney, Booking } from "@/context/JourneyContext";
import AdminBookingModal from "@/components/AdminBookingModal";

export default function AdminDashboard() {
  const { bookings, customers, addBooking } = useJourney();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Calculate Stats
  const activeBookings = bookings.filter((b: Booking) => b.status === "Scheduled").length;
  const pendingRequests = bookings.filter((b: Booking) => b.status === "Pending").length;
  const totalCustomers = customers.length;
  
  // Basic revenue calculation (strip non-numeric and sum)
  const totalRevenue = bookings
    .filter((b: Booking) => b.status === "Completed")
    .reduce((sum, b) => {
      const amount = parseInt(b.amount.replace(/[^0-9]/g, '')) || 0;
      return sum + amount;
    }, 0);

  const stats = [
    { title: "Total Revenue", value: `৳${totalRevenue.toLocaleString()}`, increase: "+12.5%", icon: <TrendingUp size={24} color="var(--color-orange)" />, trend: "up" },
    { title: "Active Bookings", value: activeBookings.toString(), increase: "+5", icon: <CalendarCheck size={24} color="var(--color-orange)" />, trend: "up" },
    { title: "Total Customers", value: totalCustomers.toString(), increase: "+18%", icon: <Users size={24} color="var(--color-orange)" />, trend: "up" },
    { title: "Pending Requests", value: pendingRequests.toString(), increase: "-2", icon: <Clock size={24} color="var(--color-charcoal)" />, trend: "down" },
  ];

  // Get 5 most recent bookings
  const recentBookings = [...bookings].slice(0, 5);

  return (
    <div>
      <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-black)", marginBottom: "8px" }}>Dashboard Overview</h1>
      <p style={{ color: "var(--color-charcoal)", marginBottom: "32px" }}>Welcome back! Here is what is happening today.</p>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", marginBottom: "40px" }}>
        {stats.map((stat, idx) => (
          <div key={idx} style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", border: "1px solid var(--color-line)", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", backgroundColor: "rgba(253, 69, 2, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {stat.icon}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", fontWeight: 600, color: stat.trend === "up" ? "green" : "red", backgroundColor: stat.trend === "up" ? "rgba(0,128,0,0.1)" : "rgba(255,0,0,0.1)", padding: "4px 8px", borderRadius: "20px" }}>
                {stat.trend === "up" ? <ArrowUpRight size={14} /> : null}
                {stat.increase}
              </div>
            </div>
            <div style={{ fontSize: "14px", color: "var(--color-charcoal)", fontWeight: 500, marginBottom: "4px" }}>{stat.title}</div>
            <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-black)" }}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
        
        {/* Recent Bookings */}
        <div style={{ backgroundColor: "white", borderRadius: "12px", border: "1px solid var(--color-line)", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
          <div style={{ padding: "24px", borderBottom: "1px solid var(--color-line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-black)", margin: 0 }}>Recent Bookings</h2>
            <Link href="/admin/bookings" style={{ background: "none", border: "none", color: "var(--color-orange)", fontWeight: 600, fontSize: "14px", cursor: "pointer", textDecoration: "none" }}>View All</Link>
          </div>
          
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8fafc", textAlign: "left", borderBottom: "1px solid var(--color-line)" }}>
                  <th style={{ padding: "16px 24px", fontSize: "13px", color: "var(--color-charcoal)", fontWeight: 600, textTransform: "uppercase" }}>Booking ID</th>
                  <th style={{ padding: "16px 24px", fontSize: "13px", color: "var(--color-charcoal)", fontWeight: 600, textTransform: "uppercase" }}>Customer</th>
                  <th style={{ padding: "16px 24px", fontSize: "13px", color: "var(--color-charcoal)", fontWeight: 600, textTransform: "uppercase" }}>Date</th>
                  <th style={{ padding: "16px 24px", fontSize: "13px", color: "var(--color-charcoal)", fontWeight: 600, textTransform: "uppercase" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.length > 0 ? recentBookings.map((booking, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid var(--color-line)" }}>
                    <td style={{ padding: "16px 24px", fontSize: "14px", fontWeight: 600, color: "var(--color-black)" }}>{booking.id}</td>
                    <td style={{ padding: "16px 24px" }}>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-black)" }}>{booking.customerName}</div>
                      <div style={{ fontSize: "13px", color: "var(--color-charcoal)" }}>{booking.service}</div>
                    </td>
                    <td style={{ padding: "16px 24px", fontSize: "14px", color: "var(--color-charcoal)" }}>{booking.date}</td>
                    <td style={{ padding: "16px 24px" }}>
                      <span style={{ 
                        padding: "6px 12px", 
                        borderRadius: "20px", 
                        fontSize: "12px", 
                        fontWeight: 600,
                        backgroundColor: booking.status === "Scheduled" ? "rgba(0,128,0,0.1)" : booking.status === "Pending" ? "rgba(255, 165, 0, 0.1)" : booking.status === "Cancelled" ? "rgba(255,0,0,0.1)" : "rgba(128,128,128,0.1)",
                        color: booking.status === "Scheduled" ? "green" : booking.status === "Pending" ? "darkorange" : booking.status === "Cancelled" ? "red" : "gray"
                      }}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} style={{ padding: "24px", textAlign: "center", color: "var(--color-charcoal)" }}>
                      No recent bookings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / Activity */}
        <div style={{ backgroundColor: "white", borderRadius: "12px", border: "1px solid var(--color-line)", boxShadow: "0 2px 10px rgba(0,0,0,0.02)", padding: "24px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-black)", margin: "0 0 24px" }}>Quick Actions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <button 
              onClick={() => setIsModalOpen(true)} 
              style={{ width: "100%", padding: "16px", backgroundColor: "var(--color-orange)", color: "white", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "15px", cursor: "pointer" }}
            >
              + Create Manual Booking
            </button>
            <button 
              onClick={() => {
                window.print();
              }} 
              style={{ width: "100%", padding: "16px", backgroundColor: "white", color: "var(--color-black)", border: "1px solid var(--color-line)", borderRadius: "8px", fontWeight: 600, fontSize: "15px", cursor: "pointer" }}
            >
              Generate Sales Report
            </button>
          </div>
          
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-black)", margin: "32px 0 16px" }}>System Status</h2>
          <div style={{ padding: "16px", backgroundColor: "rgba(0,128,0,0.05)", border: "1px solid rgba(0,128,0,0.2)", borderRadius: "8px", display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "12px", height: "12px", backgroundColor: "green", borderRadius: "50%", boxShadow: "0 0 8px green" }}></div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-black)" }}>All Systems Operational</div>
              <div style={{ fontSize: "12px", color: "var(--color-charcoal)" }}>Website is accepting bookings.</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
