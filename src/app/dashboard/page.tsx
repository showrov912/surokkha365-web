"use client";
import React, { useState } from "react";
import { useLanguage } from "../../components/LanguageContext";
import { useJourney, Booking } from "@/context/JourneyContext";
import Link from "next/link";
import { User, Calendar, FileText, Settings, LogOut, Download, MapPin, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import ClientBookingModal from "@/components/ClientBookingModal";
import styles from "./Dashboard.module.css";

export default function DashboardPage() {
  const { lang } = useLanguage();
  const router = useRouter();
  const { bookings, customers } = useJourney();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  const content = {
    en: {
      title: "Client Portal",
      welcome: "Welcome back, Acme Corp",
      nav: {
        dashboard: "Dashboard",
        bookings: "My Bookings",
        invoices: "Invoices & Reports",
        settings: "Settings",
        logout: "Log Out"
      },
      stats: [
        { label: "Active Services", value: "2" },
        { label: "Total Bookings", value: "15" },
        { label: "Unpaid Invoices", value: "0" }
      ],
      upcoming: {
        title: "Upcoming Services",
        service: "Corporate Termite Inspection",
        date: "Oct 12, 2026 - 10:00 AM",
        location: "Dhaka North - Banani",
        status: "Confirmed"
      },
      history: {
        title: "Recent History",
        columns: ["Date", "Service", "Location", "Action"],
        data: [
          { date: "Sep 01, 2026", service: "General Pest Control", location: "Gulshan-1 Office" },
          { date: "Aug 15, 2026", service: "Cockroach Baiting", location: "Banani Warehouse" },
          { date: "Jul 05, 2026", service: "Rodent Control", location: "Gulshan-1 Office" },
        ]
      },
      bookNew: "Book New Service",
      download: "Download Report",
      allBookings: "All Bookings",
      invoicesTitle: "Invoices & Reports",
      invoiceColumns: ["Invoice No", "Date", "Amount", "Status", "Action"],
      invoiceData: [
        { id: "INV-2026-081", date: "Sep 01, 2026", amount: "৳12,500", status: "Paid" },
        { id: "INV-2026-074", date: "Aug 15, 2026", amount: "৳8,000", status: "Paid" },
        { id: "INV-2026-052", date: "Jul 05, 2026", amount: "৳15,200", status: "Paid" }
      ],
      settingsTitle: "Account Settings",
      settingsForm: {
        name: "Company / User Name",
        email: "Email Address",
        phone: "Phone Number",
        address: "Billing Address",
        password: "Change Password",
        save: "Save Changes"
      }
    },
    bn: {
      title: "ক্লায়েন্ট পোর্টাল",
      welcome: "স্বাগতম, একমি কর্পোরেশন",
      nav: {
        dashboard: "ড্যাশবোর্ড",
        bookings: "আমার বুকিং",
        invoices: "ইনভয়েস এবং রিপোর্ট",
        settings: "সেটিংস",
        logout: "লগআউট"
      },
      stats: [
        { label: "অ্যাক্টিভ সার্ভিস", value: "২" },
        { label: "মোট বুকিং", value: "১৫" },
        { label: "বকেয়া ইনভয়েস", value: "০" }
      ],
      upcoming: {
        title: "আসন্ন সার্ভিস",
        service: "কর্পোরেট উইপোকা পরিদর্শন",
        date: "১২ অক্টো, ২০২৬ - সকাল ১০:০০",
        location: "ঢাকা উত্তর - বনানী",
        status: "কনফার্মড"
      },
      history: {
        title: "সাম্প্রতিক হিস্ট্রি",
        columns: ["তারিখ", "সার্ভিস", "লোকেশন", "অ্যাকশন"],
        data: [
          { date: "০১ সেপ্টে, ২০২৬", service: "জেনারেল পেস্ট কন্ট্রোল", location: "গুলশান-১ অফিস" },
          { date: "১৫ আগস্ট, ২০২৬", service: "তেলাপোকা নিয়ন্ত্রণ", location: "বনানী ওয়ারহাউস" },
          { date: "০৫ জুলাই, ২০২৬", service: "ইঁদুর নিয়ন্ত্রণ", location: "গুলশান-১ অফিস" },
        ]
      },
      bookNew: "নতুন সার্ভিস বুক করুন",
      download: "রিপোর্ট ডাউনলোড করুন",
      allBookings: "সকল বুকিং",
      invoicesTitle: "ইনভয়েস এবং রিপোর্ট",
      invoiceColumns: ["ইনভয়েস নং", "তারিখ", "পরিমাণ", "স্ট্যাটাস", "অ্যাকশন"],
      invoiceData: [
        { id: "INV-2026-081", date: "০১ সেপ্টে, ২০২৬", amount: "৳১২,৫০০", status: "পেইড" },
        { id: "INV-2026-074", date: "১৫ আগস্ট, ২০২৬", amount: "৳৮,০০০", status: "পেইড" },
        { id: "INV-2026-052", date: "০৫ জুলাই, ২০২৬", amount: "৳১৫,২০০", status: "পেইড" }
      ],
      settingsTitle: "অ্যাকাউন্ট সেটিংস",
      settingsForm: {
        name: "কোম্পানি / ব্যবহারকারীর নাম",
        email: "ইমেইল এড্রেস",
        phone: "ফোন নম্বর",
        address: "বিলিং ঠিকানা",
        password: "পাসওয়ার্ড পরিবর্তন করুন",
        save: "পরিবর্তন সেভ করুন"
      }
    }
  };

  const t = content[lang as keyof typeof content] || content.en;
  
  const userCustomer = customers.find(c => c.name === "Acme Corp") || customers[0];
  const userBookings = bookings.filter(b => b.phone === userCustomer?.phone);
  
  const upcomingBooking = userBookings.find(b => b.status === "Scheduled" || b.status === "Pending");
  const completedBookings = userBookings.filter(b => b.status === "Completed");

  const handleLogout = () => {
    router.push("/");
  };

  const getTabStyle = (tabName: string) => {
    const isActive = activeTab === tabName;
    return {
      display: "flex", 
      alignItems: "center", 
      gap: "12px", 
      padding: "12px", 
      borderRadius: "8px", 
      backgroundColor: isActive ? "rgba(253, 69, 2, 0.1)" : "transparent", 
      color: isActive ? "var(--color-orange)" : "var(--color-charcoal)", 
      border: "none", 
      fontWeight: 600, 
      fontSize: "15px", 
      cursor: "pointer", 
      textAlign: "left"
    } as React.CSSProperties;
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", paddingTop: "80px", paddingBottom: "80px" }}>
      <div className={styles.layout}>
        
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px", paddingBottom: "24px", borderBottom: "1px solid var(--color-line)" }}>
            <div style={{ width: "48px", height: "48px", backgroundColor: "var(--color-orange)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
              <User size={24} />
            </div>
            <div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-black)" }}>Acme Corp</div>
              <div style={{ fontSize: "13px", color: "var(--color-charcoal)" }}>Corporate Client</div>
            </div>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <button onClick={() => setActiveTab("dashboard")} style={getTabStyle("dashboard")}>
              <Search size={18} /> {t.nav.dashboard}
            </button>
            <button onClick={() => setActiveTab("bookings")} style={getTabStyle("bookings")}>
              <Calendar size={18} /> {t.nav.bookings}
            </button>
            <button onClick={() => setActiveTab("invoices")} style={getTabStyle("invoices")}>
              <FileText size={18} /> {t.nav.invoices}
            </button>
            <button onClick={() => setActiveTab("settings")} style={getTabStyle("settings")}>
              <Settings size={18} /> {t.nav.settings}
            </button>
            <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "8px", backgroundColor: "transparent", color: "red", border: "none", fontWeight: 600, fontSize: "15px", cursor: "pointer", textAlign: "left", marginTop: "24px" }}>
              <LogOut size={18} /> {t.nav.logout}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div>
          {activeTab === "dashboard" && (
            <>
              <div className={styles.headerRow}>
                <div>
                  <h1 style={{ fontSize: "32px", fontWeight: 700, color: "var(--color-black)", margin: "0 0 8px" }}>{t.title}</h1>
                  <p style={{ fontSize: "16px", color: "var(--color-charcoal)" }}>{t.welcome}</p>
                </div>
                <button 
                  onClick={() => setIsBookingModalOpen(true)}
                  style={{ backgroundColor: "var(--color-black)", border: "none", cursor: "pointer", color: "white", padding: "12px 24px", borderRadius: "8px", fontWeight: 700 }}
                >
                  {t.bookNew}
                </button>
              </div>
              
              {/* Stats Row */}
              <div className={styles.statsRow}>
                {t.stats.map((stat, idx) => (
                  <div key={idx} style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                    <div style={{ fontSize: "14px", color: "var(--color-charcoal)", fontWeight: 600, marginBottom: "8px" }}>{stat.label}</div>
                    <div style={{ fontSize: "36px", fontWeight: 700, color: "var(--color-orange)" }}>{stat.value}</div>
                  </div>
                ))}
              </div>
              
              {/* Upcoming Service Card */}
              {upcomingBooking && (
                <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "32px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", marginBottom: "32px", borderLeft: "4px solid var(--color-orange)" }}>
                  <h2 style={{ fontSize: "20px", fontWeight: 700, color: "var(--color-black)", marginBottom: "24px" }}>{t.upcoming.title}</h2>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px" }}>
                    <div>
                      <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-black)", marginBottom: "8px" }}>{upcomingBooking.service}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--color-charcoal)", fontSize: "14px", marginBottom: "4px" }}>
                        <Calendar size={16} /> {upcomingBooking.date} {upcomingBooking.time && `at ${upcomingBooking.time}`}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--color-charcoal)", fontSize: "14px" }}>
                        <MapPin size={16} /> {upcomingBooking.address}
                      </div>
                    </div>
                    <div style={{ padding: "8px 16px", backgroundColor: upcomingBooking.status === "Scheduled" ? "rgba(0,128,0,0.1)" : "rgba(255, 165, 0, 0.1)", color: upcomingBooking.status === "Scheduled" ? "green" : "darkorange", borderRadius: "20px", fontWeight: 700, fontSize: "14px" }}>
                      {upcomingBooking.status}
                    </div>
                  </div>
                </div>
              )}
              
              {/* History Table */}
              <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "32px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                <h2 style={{ fontSize: "20px", fontWeight: 700, color: "var(--color-black)", marginBottom: "24px" }}>{t.history.title}</h2>
                
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px solid var(--color-line)", textAlign: "left" }}>
                        <th style={{ padding: "12px 16px", color: "var(--color-charcoal)", fontWeight: 600, fontSize: "14px" }}>{t.history.columns[0]}</th>
                        <th style={{ padding: "12px 16px", color: "var(--color-charcoal)", fontWeight: 600, fontSize: "14px" }}>{t.history.columns[1]}</th>
                        <th style={{ padding: "12px 16px", color: "var(--color-charcoal)", fontWeight: 600, fontSize: "14px" }}>{t.history.columns[2]}</th>
                        <th style={{ padding: "12px 16px", color: "var(--color-charcoal)", fontWeight: 600, fontSize: "14px", textAlign: "right" }}>{t.history.columns[3]}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {completedBookings.length > 0 ? completedBookings.map((row, idx) => (
                        <tr key={idx} style={{ borderBottom: "1px solid var(--color-line)" }}>
                          <td style={{ padding: "16px", fontSize: "15px", color: "var(--color-black)", fontWeight: 500 }}>{row.date}</td>
                          <td style={{ padding: "16px", fontSize: "15px", color: "var(--color-charcoal)" }}>{row.service}</td>
                          <td style={{ padding: "16px", fontSize: "15px", color: "var(--color-charcoal)" }}>{row.address}</td>
                          <td style={{ padding: "16px", textAlign: "right" }}>
                            <button style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "transparent", border: "1px solid var(--color-line)", padding: "6px 12px", borderRadius: "6px", color: "var(--color-black)", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
                              <Download size={14} /> {t.download}
                            </button>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={4} style={{ padding: "24px", textAlign: "center", color: "var(--color-charcoal)" }}>No service history found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === "bookings" && (
            <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "32px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <div className={styles.headerRow}>
                <h2 style={{ fontSize: "24px", fontWeight: 700, color: "var(--color-black)", margin: 0 }}>{t.allBookings}</h2>
                <Link href="/#booking" style={{ backgroundColor: "var(--color-orange)", color: "white", padding: "8px 16px", borderRadius: "8px", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
                  + {t.bookNew}
                </Link>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid var(--color-line)", textAlign: "left", backgroundColor: "#f8fafc" }}>
                      <th style={{ padding: "12px 16px", color: "var(--color-charcoal)", fontWeight: 600, fontSize: "14px" }}>{t.history.columns[0]}</th>
                      <th style={{ padding: "12px 16px", color: "var(--color-charcoal)", fontWeight: 600, fontSize: "14px" }}>{t.history.columns[1]}</th>
                      <th style={{ padding: "12px 16px", color: "var(--color-charcoal)", fontWeight: 600, fontSize: "14px" }}>{t.history.columns[2]}</th>
                      <th style={{ padding: "12px 16px", color: "var(--color-charcoal)", fontWeight: 600, fontSize: "14px", textAlign: "right" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userBookings.length > 0 ? userBookings.map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid var(--color-line)" }}>
                        <td style={{ padding: "16px", fontSize: "15px", color: "var(--color-black)", fontWeight: 500 }}>{row.date}</td>
                        <td style={{ padding: "16px", fontSize: "15px", color: "var(--color-charcoal)" }}>{row.service}</td>
                        <td style={{ padding: "16px", fontSize: "15px", color: "var(--color-charcoal)" }}>{row.address}</td>
                        <td style={{ padding: "16px", textAlign: "right" }}>
                          <span style={{ 
                            padding: "6px 12px", 
                            backgroundColor: row.status === "Scheduled" ? "rgba(0,128,0,0.1)" : row.status === "Pending" ? "rgba(255, 165, 0, 0.1)" : "#f1f5f9", 
                            color: row.status === "Scheduled" ? "green" : row.status === "Pending" ? "darkorange" : "var(--color-charcoal)", 
                            borderRadius: "20px", 
                            fontSize: "12px", 
                            fontWeight: 700 
                          }}>{row.status}</span>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={4} style={{ padding: "24px", textAlign: "center", color: "var(--color-charcoal)" }}>No bookings found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "invoices" && (
            <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "32px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <h2 style={{ fontSize: "24px", fontWeight: 700, color: "var(--color-black)", marginBottom: "24px", margin: 0 }}>{t.invoicesTitle}</h2>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid var(--color-line)", textAlign: "left", backgroundColor: "#f8fafc" }}>
                      <th style={{ padding: "12px 16px", color: "var(--color-charcoal)", fontWeight: 600, fontSize: "14px" }}>{t.invoiceColumns[0]}</th>
                      <th style={{ padding: "12px 16px", color: "var(--color-charcoal)", fontWeight: 600, fontSize: "14px" }}>{t.invoiceColumns[1]}</th>
                      <th style={{ padding: "12px 16px", color: "var(--color-charcoal)", fontWeight: 600, fontSize: "14px" }}>{t.invoiceColumns[2]}</th>
                      <th style={{ padding: "12px 16px", color: "var(--color-charcoal)", fontWeight: 600, fontSize: "14px" }}>{t.invoiceColumns[3]}</th>
                      <th style={{ padding: "12px 16px", color: "var(--color-charcoal)", fontWeight: 600, fontSize: "14px", textAlign: "right" }}>{t.invoiceColumns[4]}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.invoiceData.map((inv, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid var(--color-line)" }}>
                        <td style={{ padding: "16px", fontSize: "15px", color: "var(--color-black)", fontWeight: 600 }}>{inv.id}</td>
                        <td style={{ padding: "16px", fontSize: "15px", color: "var(--color-charcoal)" }}>{inv.date}</td>
                        <td style={{ padding: "16px", fontSize: "15px", color: "var(--color-black)", fontWeight: 600 }}>{inv.amount}</td>
                        <td style={{ padding: "16px" }}>
                          <span style={{ padding: "6px 12px", backgroundColor: "rgba(0,200,0,0.1)", color: "green", borderRadius: "20px", fontSize: "12px", fontWeight: 700 }}>{inv.status}</span>
                        </td>
                        <td style={{ padding: "16px", textAlign: "right" }}>
                          <button style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "transparent", border: "1px solid var(--color-line)", padding: "6px 12px", borderRadius: "6px", color: "var(--color-black)", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
                            <Download size={14} /> PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "32px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", maxWidth: "800px" }}>
              <h2 style={{ fontSize: "24px", fontWeight: 700, color: "var(--color-black)", marginBottom: "32px", margin: 0 }}>{t.settingsTitle}</h2>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div className={styles.settingsRow}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-black)" }}>{t.settingsForm.name}</label>
                    <input type="text" defaultValue="Acme Corp" style={{ padding: "12px 16px", border: "1px solid var(--color-line)", borderRadius: "8px", fontSize: "15px", outline: "none" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-black)" }}>{t.settingsForm.email}</label>
                    <input type="email" defaultValue="admin@acmecorp.com" style={{ padding: "12px 16px", border: "1px solid var(--color-line)", borderRadius: "8px", fontSize: "15px", outline: "none" }} />
                  </div>
                </div>
                
                <div className={styles.settingsRow}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-black)" }}>{t.settingsForm.phone}</label>
                    <input type="tel" defaultValue="+8801700000000" style={{ padding: "12px 16px", border: "1px solid var(--color-line)", borderRadius: "8px", fontSize: "15px", outline: "none" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-black)" }}>{t.settingsForm.password}</label>
                    <input type="password" placeholder="••••••••" style={{ padding: "12px 16px", border: "1px solid var(--color-line)", borderRadius: "8px", fontSize: "15px", outline: "none" }} />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-black)" }}>{t.settingsForm.address}</label>
                  <textarea rows={3} defaultValue="Dhaka North - Banani, Block C, Road 11" style={{ padding: "12px 16px", border: "1px solid var(--color-line)", borderRadius: "8px", fontSize: "15px", outline: "none", resize: "vertical" }} />
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
                  <button style={{ backgroundColor: "var(--color-orange)", color: "white", padding: "12px 32px", borderRadius: "8px", border: "none", fontWeight: 700, fontSize: "16px", cursor: "pointer" }}>
                    {t.settingsForm.save}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <ClientBookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </div>
  );
}
