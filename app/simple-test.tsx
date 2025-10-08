export default function SimpleTest() {
  return (
    <div className="min-h-screen bg-white">
      <div className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mb-4">
            Ready to Start Your Journey?
          </h2>
          
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Complete our quick consultation form and receive a personalized plan within 24 hours
          </p>

          <div className="mb-8">
            <button
              onClick={() => {
                const isMobile = window.innerWidth < 768
                if (isMobile) {
                  window.open('https://tally.so/r/nWxl8Q', '_blank')
                } else {
                  if (window.Tally) {
                    window.Tally.openPopup('nWxl8Q', {
                      layout: 'modal',
                      width: 700,
                      autoClose: 3000
                    })
                  } else {
                    window.open('https://tally.so/r/nWxl8Q', '_blank')
                  }
                }
              }}
              className="h-20 px-12 text-xl font-semibold bg-gradient-to-r from-[#2C5F7C] to-[#1F4A5F] hover:scale-105 hover:shadow-2xl transition-all duration-300 rounded-xl text-white"
            >
              📋 Get Free Consultation
            </button>
          </div>

          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-3 bg-amber-50 text-amber-700 rounded-lg text-sm font-medium">
              <span>📢</span>
              <span>Best results when booked 2-3 weeks in advance</span>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Or contact us directly:
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/821029816653?text=Hi%20Seoul%20Care%20Concierge!%0A%0AName:%20%0AService:%20%0ATravel%20dates:%20"
                target="_blank"
                rel="noopener noreferrer"
                className="h-14 px-8 bg-[#25D366] hover:bg-[#25D366]/90 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>💬</span>
                <span>WhatsApp</span>
              </a>

              <button
                onClick={() => alert('WeChat ID: SeoulCareConcierge')}
                className="h-14 px-8 bg-[#07C160] hover:bg-[#07C160]/90 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>💚</span>
                <span>WeChat</span>
              </button>

              <a
                href="mailto:seoulcareconcierge@gmail.com"
                className="h-14 px-8 bg-[#2C5F7C] hover:bg-[#2C5F7C]/90 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>✉️</span>
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
