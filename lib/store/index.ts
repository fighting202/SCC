/**
 * SCC Store 통합 인덱스
 * 모든 Zustand 스토어들을 한 곳에서 관리합니다.
 */

// SCC 전용 스토어
export {
  useSCCStore,
  useLanguage,
  useInquiryForm,
  usePreferences,
  useBusinessHours
} from './sccStore'

// UI 스토어
export {
  useUIStore,
  useSidebar,
  useView,
  useMobileMenu,
  useToast,
  useModals
} from './uiStore'

// 타입 재내보내기
export type { Language, InquiryForm } from '@/lib/scc-types'
