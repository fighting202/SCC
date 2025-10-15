'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useSCCStore } from '@/store/scc_store';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: 'Do you work with specific hospitals and clinics?',
    questionZh: '你们与特定的医院和诊所合作吗？',
    answer:
      'We connect you with trusted, verified medical facilities throughout Korea based on your specific needs. We can provide recommendations and arrange appointments at leading hospitals and clinics.',
    answerZh:
      '我们根据您的具体需求，为您联系韩国各地值得信赖、经过验证的医疗机构。我们可以提供推荐并安排与领先医院和诊所的预约。',
  },
  {
    question: 'What languages do you support?',
    questionZh: '你们支持哪些语言？',
    answer:
      'We provide full support in English and Chinese (Mandarin). Our team can also arrange interpreters for other languages upon request.',
    answerZh:
      '我们提供英语和中文（普通话）的全面支持。我们的团队还可以根据要求安排其他语言的翻译。',
  },
  {
    question: 'Do I need to pay online immediately?',
    questionZh: '我需要立即在线付款吗？',
    answer:
      'No. Payment is arranged after you approve your detailed quote through consultation. We provide secure payment links with clear documentation. There are no automatic charges.',
    answerZh:
      '不需要。付款是在您通过咨询批准详细报价后安排的。我们提供安全的付款链接和清晰的文档。没有自动扣费。',
  },
  {
    question: 'How do I pay for your services?',
    questionZh: '如何支付你们的服务费用？',
    answer:
      'We accept multiple payment methods including WeChat Pay (微信支付) for Chinese clients, PayPal for international clients, bank transfer, and Alipay (支付宝). Payment terms will be clearly outlined in your personalized quote.',
    answerZh:
      '我们接受多种付款方式，包括中国客户的微信支付、国际客户的PayPal、银行转账和支付宝。付款条件将在您的个性化报价中清楚说明。',
  },
  {
    question: 'Will I get spam if I share my contact information?',
    questionZh: '如果我分享我的联系信息，我会收到垃圾邮件吗？',
    answer:
      'Absolutely not. Your information is only used for your consultation and service delivery. We never share your details with third parties or send marketing messages without permission.',
    answerZh:
      '绝对不会。您的信息仅用于您的咨询和服务提供。我们从不与第三方分享您的详细信息，也不会在未经许可的情况下发送营销信息。',
  },
  {
    question: 'Can I change my itinerary after booking?',
    questionZh: '预订后可以更改行程吗？',
    answer:
      'Yes, we understand plans can change. We offer flexible adjustments to your itinerary. Changes may affect pricing depending on timing and availability.',
    answerZh:
      '是的，我们理解计划可能会改变。我们提供灵活的行程调整。根据时间和可用性，更改可能会影响定价。',
  },
  {
    question: 'What if I need emergency help during my stay?',
    questionZh: '如果我在逗留期间需要紧急帮助怎么办？',
    answer:
      'We provide 24/7 emergency contact support. Your dedicated care manager will be available via phone and WhatsApp throughout your entire stay.',
    answerZh:
      '我们提供24/7紧急联系支持。您的专属护理经理将在您整个逗留期间通过电话和WhatsApp为您服务。',
  },
  {
    question: 'How far in advance should I book?',
    questionZh: '应该提前多久预订？',
    answer:
      'We recommend booking at least 2-4 weeks in advance to ensure availability of accommodations and medical appointments. However, we can accommodate shorter notice when possible.',
    answerZh:
      '我们建议至少提前2-4周预订，以确保住宿和医疗预约的可用性。但是，我们可以在可能的情况下接受较短时间的通知。',
  },
];

export default function FAQSection() {
  const { language } = useSCCStore();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <section
      id="faq"
      className="section-padding bg-gray-50 dark:bg-scc-dark-bg"
    >
      <div className="container-responsive">
        <div className="text-center section-margin">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl text-[#2C5F7C] dark:text-scc-dark-text mb-4 ${
              language === 'zh' ? 'font-chinese' : 'font-sans'
            }`}
            style={{ fontWeight: 700 }}
          >
            {language === 'zh' ? '常见问题' : 'Frequently Asked Questions'}
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Accordion
            type="single"
            collapsible
            className="space-y-3 md:space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="hover-glow active:scale-95 touch-manipulation"
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-white dark:bg-scc-dark-card rounded-xl border-none shadow-sm"
                >
                  <AccordionTrigger className="w-full text-left py-4 md:py-5 px-4 md:px-6 flex items-center min-h-[60px] hover:no-underline active:scale-95 touch-manipulation">
                    <span
                      className={`body-text leading-relaxed ${
                        language === 'zh' ? 'font-chinese' : 'font-sans'
                      }`}
                    >
                      {language === 'zh' ? faq.questionZh : faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 md:px-6 pb-4 md:pb-6">
                    <p
                      className={`body-text text-gray-700 dark:text-scc-dark-text leading-relaxed ${
                        language === 'zh' ? 'font-chinese' : 'font-sans'
                      }`}
                    >
                      {language === 'zh' ? faq.answerZh : faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
