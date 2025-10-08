/**
 * Seoul Care Concierge (SCC) 타입 정의
 * 모든 TypeScript 타입은 여기에 중앙 집중식으로 관리됩니다.
 */

// 기본 타입
export type Language = 'en' | 'zh';
export type ServiceType = 'medical' | 'beauty' | 'support' | 'all';
export type ContactMethod = 'wechat' | 'whatsapp' | 'email';
export type PackageType = 'basic' | 'premium';
export type Size = 'sm' | 'md' | 'lg' | 'xl';

// 이중 언어 텍스트
export interface BilingualText {
  en: string;
  zh: string;
}

// 서비스 아이템
export interface ServiceItem {
  id: string;
  title: BilingualText;
  description: BilingualText;
  icon: string;
  category: ServiceType;
  features?: BilingualText[];
}

// 연락처 정보
export interface ContactInfo {
  email: string;
  phone: string;
  whatsapp: string;
  wechatId: string;
  address: BilingualText;
}

// 문의 폼
export interface InquiryForm {
  name: string;
  email: string;
  phone: string;
  nationality: string;
  preferredContact: ContactMethod;
  serviceInterest: ServiceType;
  travelDate: string;
  budget?: string;
  message?: string;
  agreeToTerms: boolean;
  agreeToPrivacy: boolean;
}

// 패키지 정보
export interface PackageInfo {
  name: BilingualText;
  duration: number;
  price: {
    from: number;
    to: number;
  };
  currency: string;
  features: BilingualText[];
}

// 신뢰 배지
export interface TrustBadge {
  en: string;
  zh: string;
  icon: string;
}

// 연락 방법
export interface ContactMethodInfo {
  name: string;
  icon: string;
  color: string;
  url: string;
}

// 언어 정보
export interface LanguageInfo {
  code: Language;
  name: string;
  flag: string;
}

// 컴포넌트 Props 타입들
export interface ContactButtonProps {
  type: ContactMethod;
  size?: Size;
  className?: string;
  children?: React.ReactNode;
}

export interface BilingualTextProps extends BilingualText {
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export interface ServiceCardProps {
  service: ServiceItem;
  className?: string;
  onClick?: () => void;
}

export interface PackageCardProps {
  packageInfo: PackageInfo;
  type: PackageType;
  className?: string;
  onSelect?: (type: PackageType) => void;
}

export interface TrustBadgeProps {
  badge: TrustBadge;
  className?: string;
}

// 폼 관련 타입
export interface FormFieldProps {
  label: BilingualText;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'date' | 'textarea' | 'select';
  placeholder?: BilingualText;
  required?: boolean;
  options?: Array<{ value: string; label: BilingualText }>;
  className?: string;
}

export interface FormError {
  field: string;
  message: BilingualText;
}

// API 응답 타입
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: BilingualText;
}

// 페이지 메타데이터
export interface PageMetadata {
  title: BilingualText;
  description: BilingualText;
  keywords?: BilingualText;
  ogImage?: string;
}

// 네비게이션 아이템
export interface NavItem {
  label: BilingualText;
  href: string;
  icon?: string;
  children?: NavItem[];
}

// 소셜 미디어 링크
export interface SocialLink {
  platform: 'instagram' | 'facebook' | 'youtube' | 'wechat' | 'whatsapp';
  url: string;
  icon: string;
}

// 테마 관련
export interface ThemeConfig {
  colors: {
    primary: string;
    primaryHover: string;
    accent: string;
    accentHover: string;
    success: string;
    warning: string;
    error: string;
    foreground: string;
    muted: string;
    mutedForeground: string;
    border: string;
  };
  fonts: {
    sans: string;
    serif: string;
  };
}

// 유틸리티 타입들
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// 이벤트 핸들러 타입들
export type ClickHandler = (event: React.MouseEvent<HTMLElement>) => void;
export type ChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
export type SubmitHandler = (event: React.FormEvent<HTMLFormElement>) => void;

// 스토어 타입들
export interface SCCStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  inquiryForm: Partial<InquiryForm>;
  setInquiryForm: (data: Partial<InquiryForm>) => void;
  resetInquiryForm: () => void;
  isFormSubmitted: boolean;
  setIsFormSubmitted: (submitted: boolean) => void;
}

// 설정 타입
export interface AppConfig {
  defaultLanguage: Language;
  supportedLanguages: Language[];
  contactMethods: ContactMethod[];
  serviceTypes: ServiceType[];
  packageTypes: PackageType[];
}

// Notion 관련 타입들
export interface NotionDatabase {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  cover?: string;
  properties: Record<string, any>;
  created_time: string;
  last_edited_time: string;
  url: string;
}

export interface NotionPage {
  id: string;
  title: string;
  properties: Record<string, any>;
  created_time: string;
  last_edited_time: string;
  url: string;
  parent: {
    type: 'database_id' | 'page_id';
    database_id?: string;
    page_id?: string;
  };
}

export interface NotionBlock {
  id: string;
  type: string;
  content: any;
  created_time: string;
  last_edited_time: string;
  has_children: boolean;
}

// Server Actions 응답 타입
export interface ServerActionResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// 데이터베이스 입력 타입
export interface DatabaseInput {
  parent: { page_id: string } | { workspace: true };
  title: Array<{ text: { content: string } }>;
  properties: Record<string, any>;
  description?: Array<{ text: { content: string } }>;
  icon?: { emoji: string } | { external: { url: string } };
  cover?: { external: { url: string } };
}

// 페이지 입력 타입
export interface PageInput {
  parent: { database_id: string } | { page_id: string };
  properties: Record<string, any>;
  children?: NotionBlock[];
  icon?: { emoji: string } | { external: { url: string } };
  cover?: { external: { url: string } };
}

// 데이터베이스 속성 업데이트 타입
export interface DatabasePropertiesUpdate {
  [key: string]: any;
}

// 페이지 속성 업데이트 타입
export interface PagePropertiesUpdate {
  [key: string]: any;
}

// 검색 결과 타입
export interface SearchResult<T> {
  success: boolean;
  data?: T[];
  hasMore?: boolean;
  nextCursor?: string | null;
  error?: string;
}

// 페이지네이션 타입
export interface PaginationParams {
  pageSize?: number;
  startCursor?: string;
}

// 필터 타입
export interface NotionFilter {
  property: string;
  value: any;
  condition?: string;
}

// 정렬 타입
export interface NotionSort {
  property: string;
  direction: 'ascending' | 'descending';
}

// 쿼리 파라미터 타입
export interface NotionQuery {
  filter?: NotionFilter;
  sorts?: NotionSort[];
  pageSize?: number;
  startCursor?: string;
}

// Notion API 에러 타입
export interface NotionError {
  code: string;
  message: string;
  status: number;
}

// Notion 클라이언트 설정 타입
export interface NotionClientConfig {
  auth: string;
  notionVersion?: string;
  timeoutMs?: number;
  baseUrl?: string;
}

// Notion 통합 설정 타입
export interface NotionIntegrationConfig {
  apiKey: string;
  workspaceId?: string;
  databases: {
    [key: string]: {
      id: string;
      name: string;
      properties: string[];
    };
  };
  pages: {
    [key: string]: {
      id: string;
      name: string;
      parent: string;
    };
  };
}