"use client"

import { useState } from "react"
import Image from "next/image"
import { CONTACT } from "@/lib/scc-constants"
import { useSCCStore } from "@/lib/store/sccStore"
import { Button } from "@/components/ui/button"

export default function WeChatQRPage() {
  const { language } = useSCCStore()
  const [copied, setCopied] = useState(false)
  const [imageLoadFailed, setImageLoadFailed] = useState(false)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {language === 'zh' ? 'WeChat 二维码' : 'WeChat QR Code'}
          </h1>
          <p className="text-gray-600">
            {language === 'zh' 
              ? '扫描二维码添加好友' 
              : 'Scan QR code to add friend'
            }
          </p>
        </div>

        <div className="bg-gray-100 p-6 rounded-xl mb-6">
          <div className="flex flex-col items-center">
            <div className="w-48 h-48 bg-white rounded-lg shadow-md mb-4 flex items-center justify-center relative">
              {imageLoadFailed ? (
                <div className="text-center text-gray-500 p-4">
                  <div className="text-4xl mb-2">📱</div>
                  <div className="text-sm">QR Code</div>
                  <div className="text-xs mt-1">WeChat ID: {CONTACT.wechatId}</div>
                </div>
              ) : (
                <Image
                  src="/scc-wechat-qr.jpg"
                  alt="WeChat QR Code"
                  width={192}
                  height={192}
                  className="object-contain rounded-lg"
                  onError={(e) => {
                    console.error('QR 이미지 로드 실패:', e);
                    setImageLoadFailed(true);
                  }}
                />
              )}
            </div>
            <p className="text-sm text-gray-600">
              {language === 'zh' ? 'WeChat ID: ' : 'WeChat ID: '}
              <span className="font-mono font-bold text-scc-primary">{CONTACT.wechatId}</span>
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => copyToClipboard(CONTACT.wechatId)}
            variant="success"
            className="w-full"
          >
            {copied 
              ? (language === 'zh' ? '已复制!' : 'Copied!')
              : (language === 'zh' ? '复制 ID' : 'Copy ID')
            }
          </Button>

          <Button
            onClick={() => window.close()}
            variant="outline"
            className="w-full"
          >
            {language === 'zh' ? '关闭' : 'Close'}
          </Button>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            {language === 'zh' 
              ? '请使用 WeChat 扫描二维码或搜索 ID 添加好友' 
              : 'Use WeChat to scan QR code or search by ID to add friend'
            }
          </p>
        </div>
      </div>
    </div>
  )
}