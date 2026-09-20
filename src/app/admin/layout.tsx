"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Clock,
  Users, 
  Settings, 
  Bell, 
  Search, 
  LogOut,
  Menu,
  X,
  Layout
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  React.useEffect(() => {
    const auth = localStorage.getItem("isAdminLoggedIn");
    if (auth !== "true") {
      router.replace("/account");
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (!isAuthorized) {
    return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f8fafc" }}>Loading...</div>;
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "Bookings", href: "/admin/bookings", icon: <CalendarCheck size={20} /> },
    { name: "Schedule", href: "/admin/schedule", icon: <Clock size={20} /> },
    { name: "Customers", href: "/admin/customers", icon: <Users size={20} /> },
    { name: "Website Editor", href: "/admin/website", icon: <Layout size={20} /> },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f1f5f9" }}>
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 40 }}
        />
      )}

      {/* Sidebar */}
      <aside 
        style={{ 
          width: "280px", 
          backgroundColor: "var(--color-black)", 
          color: "white", 
          display: "flex", 
          flexDirection: "column",
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 50,
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
          borderRight: "1px solid rgba(255,255,255,0.1)"
        }}
        className="admin-sidebar"
      >
        <div style={{ padding: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <Link href="/" style={{ position: "relative", width: "140px", height: "40px", display: "block" }}>
            <Image src="/logo-white.png" alt="Surokkha365" fill style={{ objectFit: "contain" }} />
          </Link>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="mobile-close-btn"
            style={{ background: "none", border: "none", color: "white", cursor: "pointer", display: "none" }}
          >
            <X size={24} />
          </button>
        </div>

        <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px", paddingLeft: "12px" }}>
            Menu
          </div>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "12px", 
                  padding: "12px", 
                  borderRadius: "8px", 
                  backgroundColor: isActive ? "var(--color-orange)" : "transparent",
                  color: isActive ? "white" : "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  fontWeight: 600,
                  transition: "all 0.2s"
                }}
              >
                {item.icon}
                {item.name}
              </Link>
            )
          })}
        </div>

        <div style={{ padding: "24px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <button
            onClick={() => {
              localStorage.removeItem("isAdminLoggedIn");
              router.push("/");
            }}
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "12px", 
              padding: "12px", 
              borderRadius: "8px", 
              color: "rgba(255,255,255,0.7)",
              textDecoration: "none",
              fontWeight: 600,
              background: "none",
              border: "none",
              cursor: "pointer",
              width: "100%",
              textAlign: "left"
            }}
          >
            <LogOut size={20} />
            Exit Admin
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div 
        style={{ 
          flex: 1, 
          display: "flex", 
          flexDirection: "column",
          minWidth: 0,
        }}
        className="admin-main"
      >
        
        {/* Top Navbar */}
        <header style={{ height: "72px", backgroundColor: "white", borderBottom: "1px solid var(--color-line)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", position: "sticky", top: 0, zIndex: 30 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button 
              onClick={() => setSidebarOpen(true)}
              className="mobile-menu-btn"
              style={{ background: "none", border: "none", cursor: "pointer", display: "none", color: "var(--color-black)" }}
            >
              <Menu size={24} />
            </button>
            <div className="search-bar" style={{ position: "relative", width: "300px" }}>
              <Search size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-charcoal)" }} />
              <input type="text" placeholder="Search bookings..." style={{ width: "100%", padding: "10px 16px 10px 40px", backgroundColor: "#f8fafc", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "14px" }} />
            </div>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <button style={{ position: "relative", background: "none", border: "none", cursor: "pointer", color: "var(--color-charcoal)" }}>
              <Bell size={20} />
              <span style={{ position: "absolute", top: "-4px", right: "-4px", width: "10px", height: "10px", backgroundColor: "var(--color-orange)", borderRadius: "50%" }}></span>
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", borderLeft: "1px solid var(--color-line)", paddingLeft: "24px" }}>
              <div style={{ textAlign: "right", display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--color-black)" }}>Admin User</span>
                <span style={{ fontSize: "12px", color: "var(--color-charcoal)" }}>Superadmin</span>
              </div>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "var(--color-black)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700 }}>
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ padding: "32px", flex: 1, overflowY: "auto" }}>
          {children}
        </main>
      </div>

      <style jsx global>{`
        @media (min-width: 1024px) {
          .admin-sidebar {
            transform: translateX(0) !important;
          }
          .admin-main {
            margin-left: 280px;
          }
        }
        @media (max-width: 1023px) {
          .mobile-menu-btn {
            display: block !important;
          }
          .mobile-close-btn {
            display: block !important;
          }
          .search-bar {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
