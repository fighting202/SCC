// Analytics and monitoring utilities

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// Google Analytics 4 Event Tracking
export const trackEvent = (event: AnalyticsEvent) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
    });
  }
};

// Page view tracking
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url,
    });
  }
};

// Error tracking
export const trackError = (error: Error, context?: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'exception', {
      description: error.message,
      fatal: false,
      custom_map: {
        context: context || 'unknown',
        stack: error.stack,
      },
    });
  }
};

// Performance tracking
export const trackPerformance = (metric: string, value: number) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'timing_complete', {
      name: metric,
      value: Math.round(value),
    });
  }
};

// Conversion tracking
export const trackConversion = (conversionType: string, value?: number) => {
  trackEvent({
    action: 'conversion',
    category: conversionType,
    value: value,
  });
};

// User engagement tracking
export const trackEngagement = (action: string, element: string) => {
  trackEvent({
    action: action,
    category: 'engagement',
    label: element,
  });
};

// Language switch tracking
export const trackLanguageSwitch = (fromLang: string, toLang: string) => {
  trackEvent({
    action: 'language_switch',
    category: 'user_interaction',
    label: `${fromLang}_to_${toLang}`,
  });
};

// Contact method tracking
export const trackContactMethod = (method: 'whatsapp' | 'wechat' | 'email' | 'tally') => {
  trackEvent({
    action: 'contact_method_click',
    category: 'conversion',
    label: method,
  });
};

// Service interest tracking
export const trackServiceInterest = (service: string) => {
  trackEvent({
    action: 'service_interest',
    category: 'engagement',
    label: service,
  });
};
