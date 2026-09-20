"use client";
import React, { useState, useEffect } from "react";
import { useWebsiteData } from "@/context/WebsiteContext";
import Link from "next/link";
import { Calculator, ArrowRight } from "lucide-react";

export default function PriceCalculator() {
  const { pricingData, servicesData } = useWebsiteData();
  const [mounted, setMounted] = useState(false);

  const divisions = pricingData ? Object.keys(pricingData) : [];
  const defaultDivision = divisions.length > 0 ? divisions[0] : "";
  
  const pestTypes = servicesData ? servicesData.map(s => s.title) : [];
  const defaultPest = pestTypes.length > 0 ? pestTypes[0] : "";

  const [selectedDivision, setSelectedDivision] = useState(defaultDivision);
  const [selectedPest, setSelectedPest] = useState(defaultPest);
  const [audience, setAudience] = useState<"homes" | "facilities">("homes");
  const [areaSqFt, setAreaSqFt] = useState<number | "">("");

  useEffect(() => {
    setMounted(true);
    if (divisions.length > 0 && !selectedDivision) setSelectedDivision(divisions[0]);
    if (pestTypes.length > 0 && !selectedPest) setSelectedPest(pestTypes[0]);
  }, [divisions, pestTypes, selectedDivision, selectedPest]);

  if (!mounted) return null;

  const priceObj = pricingData?.[selectedDivision]?.[selectedPest];
  const pricePerSqFt = priceObj ? (audience === "homes" ? priceObj.homes : priceObj.facilities) : 0;
  const totalPrice = typeof areaSqFt === "number" && areaSqFt > 0 ? areaSqFt * pricePerSqFt : 0;

  return (
    <div style={{ backgroundColor: "white", padding: "48px", borderRadius: "16px", boxShadow: "0 20px 40px rgba(0,0,0,0.08)", border: "1px solid var(--color-line)", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
        <div style={{ width: "48px", height: "48px", borderRadius: "12px", backgroundColor: "rgba(253, 69, 2, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-orange)" }}>
          <Calculator size={24} />
        </div>
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "var(--color-black)", margin: 0 }}>Price Estimator</h2>
          <p style={{ color: "var(--color-charcoal)", fontSize: "14px", marginTop: "4px" }}>Get an instant estimate for your pest problem.</p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Division Selection */}
        <div>
          <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "var(--color-black)", marginBottom: "8px" }}>Select Division</label>
          <select 
            value={selectedDivision} 
            onChange={(e) => setSelectedDivision(e.target.value)}
            style={{ width: "100%", padding: "14px 16px", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "15px", backgroundColor: "#f8fafc", cursor: "pointer" }}
          >
            {divisions.map(div => (
              <option key={div} value={div}>{div}</option>
            ))}
          </select>
        </div>

        {/* Pest Type Selection */}
        <div>
          <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "var(--color-black)", marginBottom: "8px" }}>Type of Pest</label>
          <select 
            value={selectedPest} 
            onChange={(e) => setSelectedPest(e.target.value)}
            style={{ width: "100%", padding: "14px 16px", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "15px", backgroundColor: "#f8fafc", cursor: "pointer" }}
          >
            {pestTypes.map(pest => (
              <option key={pest} value={pest}>{pest}</option>
            ))}
          </select>
        </div>

        {/* Premise Type Toggle */}
        <div>
          <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "var(--color-black)", marginBottom: "8px" }}>Premise Type</label>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => setAudience("homes")}
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "8px",
                border: `2px solid ${audience === "homes" ? "var(--color-orange)" : "var(--color-line)"}`,
                backgroundColor: audience === "homes" ? "rgba(253, 69, 2, 0.05)" : "transparent",
                color: audience === "homes" ? "var(--color-orange)" : "var(--color-charcoal)",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              Residential
            </button>
            <button
              onClick={() => setAudience("facilities")}
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "8px",
                border: `2px solid ${audience === "facilities" ? "var(--color-orange)" : "var(--color-line)"}`,
                backgroundColor: audience === "facilities" ? "rgba(253, 69, 2, 0.05)" : "transparent",
                color: audience === "facilities" ? "var(--color-orange)" : "var(--color-charcoal)",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              Commercial
            </button>
          </div>
        </div>

        {/* Area Input */}
        <div>
          <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "var(--color-black)", marginBottom: "8px" }}>Total Area (Square Feet)</label>
          <input 
            type="number" 
            placeholder="e.g. 1200"
            value={areaSqFt} 
            onChange={(e) => setAreaSqFt(e.target.value ? parseInt(e.target.value) : "")}
            style={{ width: "100%", padding: "14px 16px", border: "1px solid var(--color-line)", borderRadius: "8px", outline: "none", fontSize: "15px", backgroundColor: "#f8fafc" }}
          />
        </div>

        {/* Result & CTA */}
        <div style={{ marginTop: "16px", padding: "24px", backgroundColor: "rgba(253, 69, 2, 0.05)", borderRadius: "12px", border: "1px solid rgba(253, 69, 2, 0.2)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "14px", color: "var(--color-charcoal)", fontWeight: 600 }}>Rate:</span>
            <span style={{ fontSize: "15px", color: "var(--color-black)", fontWeight: 700 }}>৳{pricePerSqFt} / sq ft</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", borderTop: "1px dashed rgba(253, 69, 2, 0.3)", paddingTop: "16px" }}>
            <span style={{ fontSize: "16px", color: "var(--color-black)", fontWeight: 700 }}>Estimated Total:</span>
            <span style={{ fontSize: "28px", color: "var(--color-orange)", fontWeight: 800 }}>৳{totalPrice.toLocaleString()}</span>
          </div>
          
          <Link href={`/checkout?service=${selectedPest}&division=${selectedDivision}&area=${areaSqFt}&type=${audience}&price=${totalPrice}`} style={{ textDecoration: "none" }}>
            <button 
              disabled={!totalPrice}
              style={{ 
                width: "100%", 
                padding: "16px", 
                backgroundColor: totalPrice ? "var(--color-orange)" : "#ccc", 
                color: "white", 
                border: "none", 
                borderRadius: "8px", 
                fontWeight: 700, 
                fontSize: "16px", 
                cursor: totalPrice ? "pointer" : "not-allowed",
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                gap: "12px",
                transition: "background-color 0.2s"
              }}
            >
              Book Now <ArrowRight size={20} />
            </button>
          </Link>
          <p style={{ textAlign: "center", fontSize: "12px", color: "var(--color-charcoal)", marginTop: "12px" }}>
            *Final price may vary upon physical inspection.
          </p>
        </div>
      </div>
    </div>
  );
}
