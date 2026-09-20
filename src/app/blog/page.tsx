import type { Metadata } from "next";
import React from "react";
import BlogIndexContent from "./BlogIndexContent";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Pest Control Advice & Case Studies | Surokkha365 Blog",
  description: "Expert insights on preventing and treating pest infestations in Bangladesh. Learn evidence-based methods for termite, mosquito, and rodent control.",
};

export default function BlogPage() {
  return (
    <main>
      <Header />
      <BlogIndexContent />
      <Footer />
    </main>
  );
}
