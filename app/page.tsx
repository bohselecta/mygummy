export default function Page() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/gummy-logo.png" alt="Gummy" className="h-8 w-auto" style={{filter: 'drop-shadow(0 0 0 1px black)'}}/>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
          <a href="#how" className="text-gray-600 hover:text-gray-900 transition-colors">How it works</a>
          <a href="#download" className="text-gray-600 hover:text-gray-900 transition-colors">Download</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-8 pb-16">
        <div className="text-center mb-16">
          {/* Hero graphic */}
          <div className="mb-8">
            <img 
              src="/gummybag.png" 
              alt="Gummy bag" 
              className="w-full h-auto max-w-xs mx-auto"
            />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Ollama Chat Host
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Turn your desktop Ollama into a secure chat host you can reach from anywhere. 
            Control it from your phone, or share the link to give someone else free access to your local AI — safely.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a href="https://diatonically-pistonlike-verda.ngrok-free.dev" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors relative">
              Start a Room Online
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">new</span>
            </a>
            <a href="https://github.com/bohselecta/gummy2" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-gray-900 font-semibold px-8 py-3 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors">
              Download via GitHub
            </a>
          </div>

        </div>

        {/* What people can do */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {title: "Host your AI", desc: "Expose your local Ollama securely", icon: "/ai-cola-gummy.png"},
            {title: "Control remotely", desc: "Use your phone to drive it", icon: "/green-gummy-bear.png"},
            {title: "Share freely", desc: "Let someone else use your AI", icon: "/orange-gummy-bear.png"},
            {title: "Private threads", desc: "Each user isolated, fair queue", icon: "/red-gummy-bear.png"},
          ].map((feature, i) => (
            <div key={i} className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="mb-4">
                <img 
                  src={feature.icon} 
                  alt={feature.title} 
                  className={`mx-auto ${feature.icon === "/ai-cola-gummy.png" ? "w-8 h-auto" : "w-12 h-auto"}`}
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

      </section>

      {/* How it works */}
      <section id="how" className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Small bag image */}
          <div className="text-center mb-8">
            <img 
              src="/small-bag.png" 
              alt="Small gummy bag" 
              className="w-24 h-auto mx-auto"
            />
          </div>
          <h2 className="text-3xl font-bold text-center mb-12">How Gummy hosting works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Start Hosting</h3>
              <p className="text-gray-600">Gummy connects your Ollama to a secure URL (ngrok/LAN).</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Use Anywhere</h3>
              <p className="text-gray-600">Open the link on your phone to chat your local AI on the go.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Share to Collaborate</h3>
              <p className="text-gray-600">Send the link to others; each gets private access and fair use.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="download" className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img src="/gummy-logo.png" alt="Gummy logo" className="h-6 w-auto" style={{filter: 'drop-shadow(0 0 0 1px black)'}}/>
              <span className="text-sm">© {new Date().getFullYear()} Gummy</span>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://github.com/bohselecta/gummy2" target="_blank" rel="noopener noreferrer" className="text-sm px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                Download via GitHub
              </a>
              <a href="https://diatonically-pistonlike-verda.ngrok-free.dev" target="_blank" rel="noopener noreferrer" className="text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors relative">
                Start a Room Online
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">new</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
