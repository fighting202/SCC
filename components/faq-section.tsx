"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Do you work with specific hospitals and clinics?",
    answer:
      "We connect you with trusted, verified medical facilities throughout Korea based on your specific needs. We can provide recommendations and arrange appointments at leading hospitals and clinics.",
  },
  {
    question: "What languages do you support?",
    answer:
      "We provide full support in English and Chinese (Mandarin). Our team can also arrange interpreters for other languages upon request.",
  },
  {
    question: "How do I pay for your services?",
    answer:
      "We accept international payments via PayPal, bank transfer, or credit card. Payment terms will be clearly outlined in your personalized quote.",
  },
  {
    question: "Can I change my itinerary after booking?",
    answer:
      "Yes, we understand plans can change. We offer flexible adjustments to your itinerary. Changes may affect pricing depending on timing and availability.",
  },
  {
    question: "What if I need emergency help during my stay?",
    answer:
      "We provide 24/7 emergency contact support. Your dedicated care manager will be available via phone and WhatsApp throughout your entire stay.",
  },
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend booking at least 2-4 weeks in advance to ensure availability of accommodations and medical appointments. However, we can accommodate shorter notice when possible.",
  },
]

export default function FAQSection() {
  return (
    <section className="py-20 lg:py-32 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-xl px-6 border-none shadow-sm"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
