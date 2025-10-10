import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Language, InquiryForm } from '@/lib/scc-types';

interface SCCStore {
  // 언어 설정
  language: Language;
  setLanguage: (lang: Language) => void;
  
  // 문의 폼 상태
  inquiryForm: Partial<InquiryForm>;
  setInquiryForm: (data: Partial<InquiryForm>) => void;
  resetInquiryForm: () => void;
  isFormSubmitted: boolean;
  setIsFormSubmitted: (submitted: boolean) => void;
  
  // 사용자 선호도
  preferences: {
    preferredContact: 'wechat' | 'whatsapp' | 'email';
    serviceInterest: 'medical' | 'beauty' | 'support' | 'all';
    budget: string;
    travelDate: string;
  };
  setPreferences: (prefs: Partial<SCCStore['preferences']>) => void;
  
  // 온라인 상태
  isOnline: boolean;
  setIsOnline: (online: boolean) => void;
  
  // 영업시간 관련
  businessHours: {
    isOpen: boolean;
    nextOpenTime: string;
    timezone: string;
  };
  setBusinessHours: (hours: Partial<SCCStore['businessHours']>) => void;
  
  // 방문 통계
  visitCount: number;
  lastVisit: string;
  incrementVisitCount: () => void;
  
  // 즐겨찾기 서비스
  favoriteServices: string[];
  toggleFavoriteService: (serviceId: string) => void;
  
  // 최근 검색어
  recentSearches: string[];
  addRecentSearch: (search: string) => void;
  clearRecentSearches: () => void;
}

export const useSCCStore = create<SCCStore>()(
  persist(
    (set, get) => ({
      // 언어 설정
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
      
      // 문의 폼 상태
  inquiryForm: {},
  setInquiryForm: (data) => set((state) => ({ 
    inquiryForm: { ...state.inquiryForm, ...data } 
      })),
      resetInquiryForm: () => set({ inquiryForm: {} }),
      isFormSubmitted: false,
      setIsFormSubmitted: (submitted) => set({ isFormSubmitted: submitted }),
      
      // 사용자 선호도
      preferences: {
        preferredContact: 'email',
        serviceInterest: 'all',
        budget: '',
        travelDate: ''
      },
      setPreferences: (prefs) => set((state) => ({
        preferences: { ...state.preferences, ...prefs }
      })),
      
      // 온라인 상태
      isOnline: true,
      setIsOnline: (online) => set({ isOnline: online }),
      
      // 영업시간 관련
      businessHours: {
        isOpen: true,
        nextOpenTime: '',
        timezone: 'Asia/Seoul'
      },
      setBusinessHours: (hours) => set((state) => ({
        businessHours: { ...state.businessHours, ...hours }
      })),
      
      // 방문 통계
      visitCount: 0,
      lastVisit: new Date().toISOString(),
      incrementVisitCount: () => set((state) => ({
        visitCount: state.visitCount + 1,
        lastVisit: new Date().toISOString()
      })),
      
      // 즐겨찾기 서비스
      favoriteServices: [],
      toggleFavoriteService: (serviceId) => set((state) => {
        const favorites = state.favoriteServices;
        const isFavorite = favorites.includes(serviceId);
        
        return {
          favoriteServices: isFavorite
            ? favorites.filter(id => id !== serviceId)
            : [...favorites, serviceId]
        };
      }),
      
      // 최근 검색어
      recentSearches: [],
      addRecentSearch: (search) => set((state) => {
        const searches = state.recentSearches.filter(s => s !== search);
        return {
          recentSearches: [search, ...searches].slice(0, 10) // 최대 10개
        };
      }),
      clearRecentSearches: () => set({ recentSearches: [] })
    }),
    {
      name: 'scc-store', // localStorage 키
      partialize: (state) => ({
        // 지속할 상태만 선택
        language: state.language,
        preferences: state.preferences,
        favoriteServices: state.favoriteServices,
        recentSearches: state.recentSearches,
        visitCount: state.visitCount,
        lastVisit: state.lastVisit
      })
    }
  )
);

// 편의 함수들
export const useLanguage = () => {
  const language = useSCCStore((state) => state.language);
  const setLanguage = useSCCStore((state) => state.setLanguage);
  
  return { language, setLanguage };
};

export const useInquiryForm = () => {
  const inquiryForm = useSCCStore((state) => state.inquiryForm);
  const setInquiryForm = useSCCStore((state) => state.setInquiryForm);
  const resetInquiryForm = useSCCStore((state) => state.resetInquiryForm);
  const isFormSubmitted = useSCCStore((state) => state.isFormSubmitted);
  const setIsFormSubmitted = useSCCStore((state) => state.setIsFormSubmitted);
  
  return { 
    inquiryForm, 
    setInquiryForm, 
    resetInquiryForm, 
    isFormSubmitted, 
    setIsFormSubmitted 
  };
};

export const usePreferences = () => {
  const preferences = useSCCStore((state) => state.preferences);
  const setPreferences = useSCCStore((state) => state.setPreferences);
  
  return { preferences, setPreferences };
};

export const useBusinessHours = () => {
  const businessHours = useSCCStore((state) => state.businessHours);
  const setBusinessHours = useSCCStore((state) => state.setBusinessHours);
  
  return { businessHours, setBusinessHours };
};