// PWA 방지 스크립트 - 개발 환경에서만 사용
if (process.env.NODE_ENV === 'development') {
  // Service Worker 등록 방지
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(registration => {
        registration.unregister();
      });
    });
  }

  // Manifest 링크 제거
  const manifestLinks = document.querySelectorAll('link[rel="manifest"]');
  manifestLinks.forEach(link => link.remove());

  // PWA 관련 메타 태그 제거
  const pwaMetaTags = [
    'apple-mobile-web-app-capable',
    'apple-mobile-web-app-status-bar-style',
    'apple-mobile-web-app-title',
    'mobile-web-app-capable',
    'theme-color'
  ];
  
  pwaMetaTags.forEach(name => {
    const meta = document.querySelector(`meta[name="${name}"]`);
    if (meta) meta.remove();
  });

  console.log('🚫 PWA 방지 스크립트 활성화됨');
}
