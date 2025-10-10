"use client"

import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { ServicesSection } from "@/components/services-section"
import { WhyChooseUs } from "@/components/why-choose-us"
import PackageComparison from "@/components/package-comparison"
import ContactSection from "@/components/contact-section"
import FAQSection from "@/components/faq-section"
import { CommitmentSection } from "@/components/commitment-section"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-scc-dark-bg">
      <Header />
      <HeroSection />
      <ServicesSection />
      <HowItWorks />
      <WhyChooseUs />
      <PackageComparison />
      <FAQSection />
      <ContactSection />
      <CommitmentSection />
      <Footer />
      <BackToTop />
    </main>
  )
}