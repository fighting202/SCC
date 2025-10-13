'use client';

import FloatingButtons from '@/components/floating-buttons';
import { useSCCStore } from '@/store/scc_store';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function PrivacyPolicyPage() {
  const { language } = useSCCStore();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleBackToHome = () => {
    setIsNavigating(true);

    // 애니메이션 효과를 위한 지연
    setTimeout(() => {
      if (window.opener) {
        window.close();
      } else {
        window.location.href = '/';
      }
    }, 800);
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-background py-20"
      style={{ paddingTop: '5rem', paddingBottom: '5rem' }}
      initial={{ opacity: 0, y: 100 }}
      animate={{
        opacity: isNavigating ? 0 : 1,
        y: isNavigating ? -100 : 0,
      }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <div
        className="container mx-auto px-4 max-w-4xl"
        style={{
          maxWidth: '56rem',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '1rem',
          paddingRight: '1rem',
        }}
      >
        {/* Home Button */}
        <div className="mb-6">
          <motion.button
            onClick={handleBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl active:scale-95 touch-manipulation"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>←</span>
            <span className={language === 'zh' ? 'font-chinese' : 'font-sans'}>
              {language === 'zh' ? '返回首页' : 'Back to Home'}
            </span>
          </motion.button>
        </div>

        <h1 className="text-4xl font-bold mb-8 text-primary dark:text-foreground">
          {language === 'zh' ? '隐私政策' : 'Privacy Policy'}
        </h1>

        <div className="bg-card text-card-foreground rounded-xl p-8 shadow-lg">
          <div className="text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
            <p>
              <span className="font-bold">
                {language === 'zh' ? '最后更新时间：' : 'Last Updated:'}
              </span>{' '}
              {language === 'zh' ? '2025年10月11日' : 'October 11, 2025'}
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              {language === 'zh'
                ? '1. 我们收集的信息'
                : '1. Information We Collect'}
            </h2>
            <p className="text-muted-foreground mb-4">
              {language === 'zh'
                ? '当您使用我们的服务时，我们收集以下信息：'
                : 'We collect the following information when you use our services:'}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>{language === 'zh' ? '姓名' : 'Name'}</li>
              <li>{language === 'zh' ? '电子邮件地址' : 'Email address'}</li>
              <li>{language === 'zh' ? '电话号码' : 'Phone number'}</li>
              <li>{language === 'zh' ? '国籍' : 'Nationality'}</li>
              <li>
                {language === 'zh'
                  ? '旅行日期和服务偏好'
                  : 'Travel dates and service preferences'}
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              {language === 'zh'
                ? '2. 我们如何使用您的信息'
                : '2. How We Use Your Information'}
            </h2>
            <p className="text-muted-foreground mb-4">
              {language === 'zh'
                ? '我们使用您的信息来：'
                : 'We use your information to:'}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                {language === 'zh'
                  ? '提供管家服务'
                  : 'Provide concierge services'}
              </li>
              <li>
                {language === 'zh'
                  ? '安排医疗和美容预约'
                  : 'Arrange medical and beauty appointments'}
              </li>
              <li>
                {language === 'zh'
                  ? '就您的预订进行沟通'
                  : 'Communicate about your booking'}
              </li>
              <li>
                {language === 'zh'
                  ? '发送服务更新（经您同意）'
                  : 'Send service updates (with your consent)'}
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              {language === 'zh' ? '3. 信息共享' : '3. Information Sharing'}
            </h2>
            <p className="text-muted-foreground mb-4">
              {language === 'zh'
                ? '我们与以下方共享您的信息：'
                : 'We share your information with:'}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                {language === 'zh'
                  ? 'Tally Forms（表单服务提供商）'
                  : 'Tally Forms (form service provider)'}
              </li>
              <li>
                {language === 'zh'
                  ? '医疗美容服务提供商（必要时）'
                  : 'Medical and beauty service providers (as necessary)'}
              </li>
              <li>
                {language === 'zh' ? '住宿合作伙伴' : 'Accommodation partners'}
              </li>
            </ul>
            <p className="text-muted-foreground mt-4 font-semibold">
              {language === 'zh'
                ? '我们不会向第三方出售您的个人信息。'
                : 'We do NOT sell your personal information to third parties.'}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              {language === 'zh' ? '4. 数据保留' : '4. Data Retention'}
            </h2>
            <p className="text-muted-foreground">
              {language === 'zh'
                ? '我们在服务完成后保留您的信息3年或法律要求的期限。'
                : 'We retain your information for 3 years after service completion or as required by law.'}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              {language === 'zh' ? '5. 您的权利' : '5. Your Rights'}
            </h2>
            <p className="text-muted-foreground mb-4">
              {language === 'zh' ? '您有权：' : 'You have the right to:'}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                {language === 'zh'
                  ? '访问您的个人信息'
                  : 'Access your personal information'}
              </li>
              <li>{language === 'zh' ? '请求更正' : 'Request corrections'}</li>
              <li>{language === 'zh' ? '请求删除' : 'Request deletion'}</li>
              <li>
                {language === 'zh'
                  ? '选择退出营销通信'
                  : 'Opt-out of marketing communications'}
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              {language === 'zh' ? '6. 安全措施' : '6. Security'}
            </h2>
            <p className="text-muted-foreground">
              {language === 'zh'
                ? '我们使用包括SSL加密在内的行业标准安全措施来保护您的信息。'
                : 'We use industry-standard security measures including SSL encryption to protect your information.'}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              {language === 'zh' ? '7. Cookie政策' : '7. Cookies'}
            </h2>
            <p className="text-muted-foreground">
              {language === 'zh'
                ? '我们使用cookie进行分析以改善网站体验。'
                : 'We use cookies for analytics (Google Analytics) to improve our website experience.'}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              {language === 'zh' ? '8. 联系我们' : '8. Contact Us'}
            </h2>
            <p className="text-muted-foreground mb-4">
              {language === 'zh'
                ? '如有隐私相关问题或请求：'
                : 'For privacy-related questions or requests:'}
            </p>
            <div className="bg-gray-50 dark:bg-background p-6 rounded-lg">
              <div className="mb-3">
                <p className="font-semibold text-lg text-foreground">
                  Seoul Care Concierge
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === 'zh'
                    ? '首尔医疗美容管家'
                    : 'Medical & Beauty Care in Korea'}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-primary">📧</span>
                  <a
                    href="mailto:seoulcareconcierge@gmail.com"
                    className="text-primary hover:text-accent hover:underline font-medium transition-colors duration-200 active:scale-95 touch-manipulation"
                  >
                    seoulcareconcierge@gmail.com
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-primary">📱</span>
                  <a
                    href="tel:+82-10-2981-6653"
                    className="text-primary hover:text-accent hover:underline font-medium transition-colors duration-200 active:scale-95 touch-manipulation"
                  >
                    +82-10-2981-6653
                  </a>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  {language === 'zh'
                    ? '营业时间: 周一至周五 09:00-18:00 (韩国时间)'
                    : 'Business hours: Mon-Fri 9AM-6PM KST'}
                </p>
              </div>
            </div>
          </section>

          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              {language === 'zh'
                ? `© ${new Date().getFullYear()} Seoul Care Concierge. 保留所有权利。`
                : `© ${new Date().getFullYear()} Seoul Care Concierge. All rights reserved.`}
            </p>
          </div>
        </div>
      </div>
      <FloatingButtons />
    </motion.div>
  );
}
