"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2, Clock, Globe } from "lucide-react"
import { TrustIndicators } from "@/components/scc/trust-indicators"

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center pt-36">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/modern-seoul-skyline-at-sunset-with-luxury-medical.jpg" 
              alt="Seoul medical tourism skyline with luxury medical facilities" 
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-white mb-6 text-balance leading-tight animate-fade-in">
              Your Safe & Seamless Journey in Korea
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-10 max-w-3xl mx-auto text-pretty leading-relaxed animate-slide-up">
              Medical & Beauty care with full support — from airport to departure
            </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-scale-in">
          <Button
            onClick={() => scrollToSection("contact")}
            size="lg"
            className="bg-scc-primary hover:bg-scc-primary/90 text-white text-base sm:text-lg px-8 py-4 sm:py-6 w-full sm:w-auto min-h-[56px] font-semibold"
          >
            Get Free Consultation
          </Button>
          <Button
            onClick={() => scrollToSection("services")}
            size="lg"
            variant="outline"
            className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-base sm:text-lg px-8 py-4 sm:py-6 w-full sm:w-auto min-h-[56px] font-semibold"
          >
            Explore Services
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="max-w-4xl mx-auto animate-fade-in">
          <TrustIndicators className="justify-center" />
        </div>
      </div>
    </section>
  )
}
