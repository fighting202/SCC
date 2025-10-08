"use client"

import { Button } from "@/components/ui/button"
import { Check, Lightbulb, AlertTriangle } from "lucide-react"

const packages = [
  {
    badge: "Great Start",
    title: "3-Day Basic Package",
    price: "From $1,200",
    features: [
      "Airport pickup (round trip)",
      "2 nights hotel accommodation",
      "Basic translation support",
      "Restaurant recommendations",
      "24/7 emergency contact",
    ],
    highlighted: false,
  },
  {
    badge: "Most Popular",
    title: "7-Day Premium Package",
    price: "From $3,500",
    features: [
      "Airport pickup (round trip)",
      "6 nights 4-star hotel",
      "Full-time personal interpreter",
      "Daily meal arrangements",
      "Post-care follow-up support",
      "24/7 emergency contact",
    ],
    highlighted: true,
  },
]

export default function PricingSection() {
  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="pricing" className="py-20 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mb-4">Sample Packages</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Flexible pricing tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all ${
                pkg.highlighted ? "ring-2 ring-scc-primary lg:scale-105" : ""
              }`}
            >
              {/* Badge */}
              <div className="inline-block px-4 py-1 rounded-full bg-scc-accent/10 text-scc-accent text-sm font-semibold mb-4">
                {pkg.badge}
              </div>

              {/* Title & Price */}
              <h3 className="text-2xl font-serif font-bold mb-2">{pkg.title}</h3>
              <p className="text-4xl font-bold text-scc-primary mb-6">{pkg.price}</p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="w-5 h-5 text-scc-primary mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                onClick={scrollToContact}
                className={`w-full ${
                  pkg.highlighted
                    ? "bg-scc-primary hover:bg-scc-primary/90 text-white"
                    : "bg-transparent border-2 border-scc-primary text-scc-primary hover:bg-scc-primary hover:text-white"
                }`}
              >
                Request Custom Quote
              </Button>
            </div>
          ))}
        </div>

        {/* Important Note */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Information</h3>
            <div className="space-y-3 text-gray-700">
              <p className="text-sm leading-relaxed">
                Medical and beauty procedure costs are separate and paid directly to facilities.
              </p>
              <p className="text-sm leading-relaxed">
                Our fees cover concierge services only (pickup, accommodation, translation, coordination, etc.). All services are customized to your needs. Prices may vary depending on specific requests. Contact us for a detailed quote.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
