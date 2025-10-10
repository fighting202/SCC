"use client"

import { useLanguage, useInquiryForm, usePreferences } from '@/lib/store'
import { useSidebar, useView, useToast, useModals } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Globe, 
  Heart, 
  Settings, 
  MessageSquare, 
  Calendar,
  DollarSign,
  Star,
  Search
} from 'lucide-react'

export default function StoreDemo() {
  // SCC 스토어 훅들
  const { language, setLanguage } = useLanguage()
  const { inquiryForm, setInquiryForm, resetInquiryForm } = useInquiryForm()
  const { preferences, setPreferences } = usePreferences()
  
  // UI 스토어 훅들
  const { sidebarOpen, toggleSidebar } = useSidebar()
  const { currentView, setView } = useView()
  const { showToast } = useToast()
  const { openModal, closeModal, modals } = useModals()

  const handleLanguageChange = () => {
    const newLang = language === 'en' ? 'zh' : 'en'
    setLanguage(newLang)
    showToast(`Language changed to ${newLang.toUpperCase()}`, 'success')
  }

  const handleViewChange = (view: 'grid' | 'list' | 'table') => {
    setView(view)
    showToast(`View changed to ${view}`, 'info')
  }

  const handlePreferenceUpdate = () => {
    setPreferences({
      preferredContact: 'wechat',
      serviceInterest: 'medical',
      budget: '5000-10000',
      travelDate: '2024-06-01'
    })
    showToast('Preferences updated!', 'success')
  }

  const handleFormUpdate = () => {
    setInquiryForm({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+82-10-1234-5678',
      nationality: 'American',
      preferredContact: 'wechat',
      serviceInterest: 'medical',
      travelDate: '2024-06-01',
      budget: '5000-10000'
    })
    showToast('Form data updated!', 'success')
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            SCC Store Demo
          </CardTitle>
          <CardDescription>
            Zustand 스토어 시스템의 다양한 기능들을 테스트해보세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 언어 설정 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span className="font-medium">Language Settings</span>
              <Badge variant="outline">{language.toUpperCase()}</Badge>
            </div>
            <Button onClick={handleLanguageChange} variant="outline" size="sm">
              Switch to {language === 'en' ? 'Chinese' : 'English'}
            </Button>
          </div>

          <Separator />

          {/* 뷰 모드 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="font-medium">View Mode</span>
              <Badge variant="outline">{currentView}</Badge>
            </div>
            <div className="flex gap-2">
              {(['grid', 'list', 'table'] as const).map((view) => (
                <Button
                  key={view}
                  onClick={() => handleViewChange(view)}
                  variant={currentView === view ? 'primary' : 'outline'}
                  size="sm"
                >
                  {view}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* 사이드바 상태 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="font-medium">Sidebar</span>
              <Badge variant={sidebarOpen ? 'default' : 'secondary'}>
                {sidebarOpen ? 'Open' : 'Closed'}
              </Badge>
            </div>
            <Button onClick={toggleSidebar} variant="outline" size="sm">
              Toggle Sidebar
            </Button>
          </div>

          <Separator />

          {/* 사용자 선호도 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span className="font-medium">User Preferences</span>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Contact: {preferences.preferredContact}</p>
              <p>Interest: {preferences.serviceInterest}</p>
              <p>Budget: {preferences.budget || 'Not set'}</p>
              <p>Travel Date: {preferences.travelDate || 'Not set'}</p>
            </div>
            <Button onClick={handlePreferenceUpdate} variant="outline" size="sm">
              Update Preferences
            </Button>
          </div>

          <Separator />

          {/* 문의 폼 상태 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="font-medium">Inquiry Form</span>
              <Badge variant={Object.keys(inquiryForm).length > 0 ? 'default' : 'secondary'}>
                {Object.keys(inquiryForm).length} fields
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              {Object.keys(inquiryForm).length > 0 ? (
                Object.entries(inquiryForm).map(([key, value]) => (
                  <p key={key}>
                    {key}: {String(value)}
                  </p>
                ))
              ) : (
                <p>No form data</p>
              )}
            </div>
            <div className="flex gap-2">
              <Button onClick={handleFormUpdate} variant="outline" size="sm">
                Add Form Data
              </Button>
              <Button onClick={resetInquiryForm} variant="outline" size="sm">
                Reset Form
              </Button>
            </div>
          </div>

          <Separator />

          {/* 모달 테스트 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span className="font-medium">Modals</span>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => openModal('contactForm')} 
                variant="outline" 
                size="sm"
              >
                Open Contact Form
              </Button>
              <Button 
                onClick={() => openModal('bookingForm')} 
                variant="outline" 
                size="sm"
              >
                Open Booking Form
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              Contact Form: {modals.contactForm ? 'Open' : 'Closed'} | 
              Booking Form: {modals.bookingForm ? 'Open' : 'Closed'}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
