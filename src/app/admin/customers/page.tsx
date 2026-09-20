"use client";
import React, { useState } from "react";
import { Search, Download, Plus, Mail, Phone, MoreHorizontal, Trash2, CalendarCheck } from "lucide-react";
import { useJourney, Customer } from "@/context/JourneyContext";

export default function AdminCustomers() {
  const { customers, deleteCustomer, bookings } = useJourney();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const filteredCustomers = customers.filter((customer: Customer) => {
    const matchesSearch = 
      (customer.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (customer.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (customer.phone || "").includes(searchQuery);
      
    const matchesType = typeFilter === "All Types" || customer.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-black)", margin: "0 0 8px" }}>Customers Directory</h1>
          <p style={{ color: "var(--color-charcoal)", margin: 0 }}>Manage your residential and commercial clients.</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button 
            onClick={() => {
              const headers = "ID,Name,Type,Phone,Email,Address,Total Spent,Status\n";
              const rows = filteredCustomers.map(c => `${c.id},"${c.name}",${c.type},${c.phone},${c.email},"${c.address}",${c.totalSpent},${c.status}`).join("\n");
              const blob = new Blob([headers + rows], { type: 'text/csv' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'customers.csv';
              a.click();
            }} 
            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", backgroundColor: "white", border: "1px solid var(--color-line)", borderRadius: "8px", color: "var(--color-black)", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}
          >
            <Download size={16} /> Export CSV
          </button>
          <button 
            onClick={() => {
              // This is a UI demo since context doesn't expose addCustomer explicitly right now
              // (but it gets added dynamically upon completeService)
              alert("Adding customers directly will be available once the full CRM is connected.");
            }} 
            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", backgroundColor: "var(--color-orange)", border: "none", borderRadius: "8px", color: "white", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}
          >
            <Plus size={16} /> Add Customer
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: "white", borderRadius: "12px", border: "1px solid var(--color-line)", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
        
        {/* Toolbar */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--color-line)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ position: "relative", width: "100%", maxWidth: "400px" }}>
            <Search size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-charcoal)" }} />
            <input 
              type="text" 
              placeholder="Search by name, email, or phone..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "100%", padding: "10px 16px 10px 40px", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "14px" }} 
            />
          </div>
          
          <div style={{ display: "flex", gap: "12px" }}>
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              style={{ padding: "10px 16px", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "14px", color: "var(--color-charcoal)", backgroundColor: "white", cursor: "pointer" }}
            >
              <option value="All Types">All Types</option>
              <option value="Commercial">Commercial</option>
              <option value="Residential">Residential</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f8fafc", textAlign: "left", borderBottom: "1px solid var(--color-line)" }}>
                <th style={{ padding: "16px 24px", fontSize: "13px", color: "var(--color-charcoal)", fontWeight: 600, textTransform: "uppercase" }}>Customer</th>
                <th style={{ padding: "16px 24px", fontSize: "13px", color: "var(--color-charcoal)", fontWeight: 600, textTransform: "uppercase" }}>Contact Info</th>
                <th style={{ padding: "16px 24px", fontSize: "13px", color: "var(--color-charcoal)", fontWeight: 600, textTransform: "uppercase" }}>Address</th>
                <th style={{ padding: "16px 24px", fontSize: "13px", color: "var(--color-charcoal)", fontWeight: 600, textTransform: "uppercase" }}>Total Spent</th>
                <th style={{ padding: "16px 24px", fontSize: "13px", color: "var(--color-charcoal)", fontWeight: 600, textTransform: "uppercase" }}>Recent Service</th>
                <th style={{ padding: "16px 24px", fontSize: "13px", color: "var(--color-charcoal)", fontWeight: 600, textTransform: "uppercase" }}>Status</th>
                <th style={{ padding: "16px 24px", fontSize: "13px", color: "var(--color-charcoal)", fontWeight: 600, textTransform: "uppercase", textAlign: "right" }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length > 0 ? filteredCustomers.map((customer, idx) => {
                const customerBookings = bookings.filter(b => b.phone === customer.phone && b.status === "Completed");
                const lastService = customerBookings.length > 0 ? customerBookings[customerBookings.length - 1] : null;

                return (
                <tr key={idx} style={{ borderBottom: "1px solid var(--color-line)", transition: "background-color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8fafc"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
                  <td style={{ padding: "20px 24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: customer.type === "Commercial" ? "rgba(0,0,255,0.05)" : "rgba(253,69,2,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: customer.type === "Commercial" ? "blue" : "var(--color-orange)", fontWeight: 700 }}>
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--color-black)" }}>{customer.name}</div>
                        <div style={{ fontSize: "12px", color: "var(--color-charcoal)", marginTop: "2px", display: "inline-block", padding: "2px 8px", borderRadius: "10px", backgroundColor: "var(--color-line)" }}>{customer.type}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "20px 24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", color: "var(--color-black)", marginBottom: "4px" }}>
                      <Phone size={14} color="var(--color-charcoal)" /> {customer.phone}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "var(--color-charcoal)" }}>
                      <Mail size={14} /> {customer.email}
                    </div>
                  </td>
                  <td style={{ padding: "20px 24px", fontSize: "14px", color: "var(--color-charcoal)" }}>
                    {customer.address}
                  </td>
                  <td style={{ padding: "20px 24px", fontSize: "15px", fontWeight: 600, color: "var(--color-black)" }}>
                    {customer.totalSpent}
                  </td>
                  <td style={{ padding: "20px 24px" }}>
                    {lastService ? (
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-black)", marginBottom: "4px" }}>{lastService.service}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "var(--color-charcoal)" }}>
                          <CalendarCheck size={14} /> {lastService.date}
                        </div>
                      </div>
                    ) : (
                      <span style={{ fontSize: "13px", color: "var(--color-charcoal)", fontStyle: "italic" }}>No completed services</span>
                    )}
                  </td>
                  <td style={{ padding: "20px 24px" }}>
                    <span style={{ 
                      padding: "6px 12px", 
                      borderRadius: "20px", 
                      fontSize: "12px", 
                      fontWeight: 600,
                      display: "inline-block",
                      backgroundColor: customer.status === "Active" ? "rgba(0,128,0,0.1)" : "rgba(128,128,128,0.1)",
                      color: customer.status === "Active" ? "green" : "gray"
                    }}>
                      {customer.status}
                    </span>
                  </td>
                  <td style={{ padding: "20px 24px", textAlign: "right" }}>
                    <button 
                      onClick={() => {
                        if(window.confirm(`Are you sure you want to delete ${customer.name}?`)) {
                          deleteCustomer(customer.id);
                        }
                      }} 
                      style={{ background: "none", border: "none", cursor: "pointer", color: "red", display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 600 }}
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </td>
                </tr>
              )}) : (
                <tr>
                  <td colSpan={7} style={{ padding: "40px", textAlign: "center", color: "var(--color-charcoal)" }}>
                    No customers found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid var(--color-line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: "13px", color: "var(--color-charcoal)" }}>Showing 1 to {filteredCustomers.length} of {customers.length} entries</div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button style={{ padding: "6px 12px", border: "1px solid var(--color-line)", backgroundColor: "white", borderRadius: "4px", fontSize: "13px", cursor: "not-allowed", color: "var(--color-line)" }} disabled>Previous</button>
            <button style={{ padding: "6px 12px", border: "1px solid var(--color-orange)", backgroundColor: "var(--color-orange)", color: "white", borderRadius: "4px", fontSize: "13px", cursor: "pointer" }}>1</button>
            <button style={{ padding: "6px 12px", border: "1px solid var(--color-line)", backgroundColor: "white", borderRadius: "4px", fontSize: "13px", cursor: "not-allowed", color: "var(--color-line)" }} disabled>Next</button>
          </div>
        </div>

      </div>
    </div>
  );
}
