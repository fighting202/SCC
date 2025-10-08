import { Shield, FileText, Clock } from "lucide-react"

const promises = [
  {
    icon: Shield,
    title: "Your Safety First",
    description: "Verified partners and 24/7 support",
  },
  {
    icon: FileText,
    title: "Transparent Pricing",
    description: "No hidden fees, clear quotes upfront",
  },
  {
    icon: Clock,
    title: "Always Available",
    description: "Emergency support whenever you need",
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promises.map((promise, index) => (
            <div
              key={index}
              className="text-center p-8 bg-gray-50 rounded-xl hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 rounded-full bg-scc-primary/10 flex items-center justify-center mx-auto mb-4">
                <promise.icon className="w-7 h-7 text-scc-primary" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2">{promise.title}</h3>
              <p className="text-gray-600">{promise.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
