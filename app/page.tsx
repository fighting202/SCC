import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { ServicesSection } from "@/components/services-section"
import { WhyChooseUs } from "@/components/why-choose-us"
import PaymentBookingSection from "@/components/payment-booking-section"
import PricingSection from "@/components/pricing-section"
import PackageComparison from "@/components/package-comparison"
import ContactSection from "@/components/contact-section"
import FAQSection from "@/components/faq-section"
import TestimonialsSection from "@/components/testimonials-section"
import { CommitmentSection } from "@/components/commitment-section"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <HowItWorks />
      <ServicesSection />
      <WhyChooseUs />
      <PaymentBookingSection />
      <PricingSection />
      <PackageComparison />
      <ContactSection />
      <FAQSection />
      <TestimonialsSection />
      <CommitmentSection />
      <Footer />
      <BackToTop />
    </main>
  )
}