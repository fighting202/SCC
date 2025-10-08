import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIState {
  // 사이드바 상태
  sidebarOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  
  // 뷰 모드
  currentView: 'grid' | 'list' | 'table'
  setView: (view: 'grid' | 'list' | 'table') => void
  
  // 모바일 메뉴
  mobileMenuOpen: boolean
  toggleMobileMenu: () => void
  setMobileMenuOpen: (open: boolean) => void
  
  // 로딩 상태
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  
  // 토스트 알림
  toast: {
    message: string
    type: 'success' | 'error' | 'warning' | 'info'
    show: boolean
  }
  showToast: (message: string, type?: 'success' | 'error' | 'warning' | 'info') => void
  hideToast: () => void
  
  // 모달 상태
  modals: {
    contactForm: boolean
    bookingForm: boolean
    costEstimator: boolean
    emergencyContact: boolean
  }
  openModal: (modal: keyof UIState['modals']) => void
  closeModal: (modal: keyof UIState['modals']) => void
  closeAllModals: () => void
  
  // 스크롤 위치
  scrollPosition: number
  setScrollPosition: (position: number) => void
  
  // 테마 관련 (SCC는 라이트 모드만 사용하지만 확장성 고려)
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      // 사이드바 상태
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      
      // 뷰 모드
      currentView: 'grid',
      setView: (view) => set({ currentView: view }),
      
      // 모바일 메뉴
      mobileMenuOpen: false,
      toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
      
      // 로딩 상태
      isLoading: false,
      setIsLoading: (loading) => set({ isLoading: loading }),
      
      // 토스트 알림
      toast: {
        message: '',
        type: 'info',
        show: false
      },
      showToast: (message, type = 'info') => set({
        toast: {
          message,
          type,
          show: true
        }
      }),
      hideToast: () => set((state) => ({
        toast: {
          ...state.toast,
          show: false
        }
      })),
      
      // 모달 상태
      modals: {
        contactForm: false,
        bookingForm: false,
        costEstimator: false,
        emergencyContact: false
      },
      openModal: (modal) => set((state) => ({
        modals: {
          ...state.modals,
          [modal]: true
        }
      })),
      closeModal: (modal) => set((state) => ({
        modals: {
          ...state.modals,
          [modal]: false
        }
      })),
      closeAllModals: () => set({
        modals: {
          contactForm: false,
          bookingForm: false,
          costEstimator: false,
          emergencyContact: false
        }
      }),
      
      // 스크롤 위치
      scrollPosition: 0,
      setScrollPosition: (position) => set({ scrollPosition: position }),
      
      // 테마
      theme: 'light',
      setTheme: (theme) => set({ theme })
    }),
    {
      name: 'scc-ui-store', // localStorage 키
      partialize: (state) => ({
        // 지속할 상태만 선택
        sidebarOpen: state.sidebarOpen,
        currentView: state.currentView,
        theme: state.theme
      })
    }
  )
)

// 편의 함수들
export const useSidebar = () => {
  const sidebarOpen = useUIStore((state) => state.sidebarOpen)
  const toggleSidebar = useUIStore((state) => state.toggleSidebar)
  const setSidebarOpen = useUIStore((state) => state.setSidebarOpen)
  
  return { sidebarOpen, toggleSidebar, setSidebarOpen }
}

export const useView = () => {
  const currentView = useUIStore((state) => state.currentView)
  const setView = useUIStore((state) => state.setView)
  
  return { currentView, setView }
}

export const useMobileMenu = () => {
  const mobileMenuOpen = useUIStore((state) => state.mobileMenuOpen)
  const toggleMobileMenu = useUIStore((state) => state.toggleMobileMenu)
  const setMobileMenuOpen = useUIStore((state) => state.setMobileMenuOpen)
  
  return { mobileMenuOpen, toggleMobileMenu, setMobileMenuOpen }
}

export const useToast = () => {
  const toast = useUIStore((state) => state.toast)
  const showToast = useUIStore((state) => state.showToast)
  const hideToast = useUIStore((state) => state.hideToast)
  
  return { toast, showToast, hideToast }
}

export const useModals = () => {
  const modals = useUIStore((state) => state.modals)
  const openModal = useUIStore((state) => state.openModal)
  const closeModal = useUIStore((state) => state.closeModal)
  const closeAllModals = useUIStore((state) => state.closeAllModals)
  
  return { modals, openModal, closeModal, closeAllModals }
}
