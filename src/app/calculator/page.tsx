import React from "react";
import PriceCalculator from "@/components/PriceCalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Price Calculator | Surokkha365",
  description: "Get an instant price estimate for professional pest control services in your division.",
};

export default function CalculatorPage() {
  return (
    <main style={{ padding: "80px 24px", backgroundColor: "#f8fafc", minHeight: "calc(100vh - 80px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: "800px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: 800, color: "var(--color-black)", marginBottom: "16px" }}>
            Instant Price Estimate
          </h1>
          <p style={{ fontSize: "16px", color: "var(--color-charcoal)", maxWidth: "500px", margin: "0 auto" }}>
            Select your division and pest problem to see our transparent, square-foot pricing structure before you book.
          </p>
        </div>
        
        <PriceCalculator />
      </div>
    </main>
  );
}
