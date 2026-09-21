import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BookingCalculator from "@/components/BookingCalculator";
import WhyChooseUs from "@/components/WhyChooseUs";
import ServicesCarousel from "@/components/ServicesCarousel";
import ProblemBlock from "@/components/ProblemBlock";
import SolutionPillars from "@/components/SolutionPillars";
import SocialProof from "@/components/SocialProof";
import Testimonials from "@/components/Testimonials";
import BlogsSection from "@/components/BlogsSection";
import PricingOffer from "@/components/PricingOffer";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Best Pest Control Services in Dhaka | Surokkha365",
  description: "Book professional pest control in Dhaka instantly. Urban residential from 10 TK/sq ft. Verified technicians, safe chemicals, and digital audit-ready reports.",
};

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <BookingCalculator />
      <WhyChooseUs />
      <ServicesCarousel />
      <ProblemBlock />
      <SolutionPillars />
      <SocialProof />
      <Testimonials />
      <BlogsSection />
      <PricingOffer />
      <Footer />
    </main>
  );
}
