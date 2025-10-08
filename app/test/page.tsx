export default function TestPage() {
  return (
    <div className="min-h-screen bg-scc-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-scc-primary mb-8">
          SCC CSS Test Page
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="scc-card p-6">
            <h2 className="text-2xl font-semibold text-scc-text mb-4">
              Primary Card
            </h2>
            <p className="text-gray-600 mb-4">
              This is a test card to verify CSS is working properly.
            </p>
            <button className="scc-button-primary px-4 py-2">
              Primary Button
            </button>
          </div>
          
          <div className="scc-card p-6">
            <h2 className="text-2xl font-semibold text-scc-accent mb-4">
              Accent Card
            </h2>
            <p className="text-gray-600 mb-4">
              This card uses the accent color scheme.
            </p>
            <button className="scc-button-secondary px-4 py-2">
              Secondary Button
            </button>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-scc-primary text-white rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Contact Methods</h3>
          <div className="flex gap-4">
            <button className="bg-scc-wechat hover:bg-scc-wechat/90 px-4 py-2 rounded">
              WeChat
            </button>
            <button className="bg-scc-whatsapp hover:bg-scc-whatsapp/90 px-4 py-2 rounded">
              WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
