'use client';

import { useState, useEffect } from 'react';

interface ServiceStatus {
  ollama: { status: string; running: string; port: number };
  app: { status: string; running: string; port: number };
  ngrok: { status: string; running: string; port: number };
}

interface StatusResponse {
  ngrok_url: string | null;
  services: ServiceStatus;
  success: boolean;
}

export default function StartRoomPage() {
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roomName, setRoomName] = useState('');
  const [copied, setCopied] = useState(false);

  const API_BASE = '/api/gummy';

  const fetchStatus = async () => {
    try {
      const response = await fetch(`${API_BASE}?endpoint=status`);
      if (response.ok) {
        const data = await response.json();
        setStatus(data);
        setError(null);
      } else {
        setError('Failed to get status from API');
      }
    } catch (error) {
      setError('Cannot connect to Gummy server. Make sure the server is running and accessible.');
    }
  };

  const startAllServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}?endpoint=start-all`, { method: 'POST' });
      const result = await response.json();
      
      if (result.success) {
        setTimeout(() => {
          fetchStatus();
          setLoading(false);
        }, 2000);
      } else {
        setError(result.message || 'Failed to start services');
        setLoading(false);
      }
    } catch (error) {
      setError(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setLoading(false);
    }
  };

  const startAppOnly = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}?endpoint=start-app`, { method: 'POST' });
      const result = await response.json();
      
      if (result.success) {
        setTimeout(() => {
          fetchStatus();
          setLoading(false);
        }, 2000);
      } else {
        setError(result.message || 'Failed to start app');
        setLoading(false);
      }
    } catch (error) {
      setError(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setLoading(false);
    }
  };

  const startNgrokOnly = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}?endpoint=start-ngrok`, { method: 'POST' });
      const result = await response.json();
      
      if (result.success) {
        setTimeout(() => {
          fetchStatus();
          setLoading(false);
        }, 2000);
      } else {
        setError(result.message || 'Failed to start ngrok');
        setLoading(false);
      }
    } catch (error) {
      setError(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const isAllRunning = status?.services.ollama.status === 'online' && 
                      status?.services.app.status === 'online' && 
                      status?.services.ngrok.status === 'online';

  const hasPublicUrl = status?.ngrok_url && status.ngrok_url !== 'Not available';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center space-x-2">
            <img 
              src="/gummy-logo.svg" 
              alt="Gummy Logo" 
              className="h-8 w-auto"
            />
          </a>
          <div className="flex items-center space-x-6">
            <a href="/" className="text-white/80 hover:text-white transition-colors">
              Home
            </a>
            <a 
              href="https://github.com/bohselecta/gummy2" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-2 text-white hover:bg-white/20 transition-all"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-6">
        <div className="w-full max-w-md">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Start a Room</h1>
              <p className="text-white/70">Launch your Ollama chat host and create a collaborative space</p>
            </div>

            {/* Room Name Input */}
            <div className="mb-6">
              <label htmlFor="roomName" className="block text-white font-medium mb-2">
                Room Name (Optional)
              </label>
              <input
                type="text"
                id="roomName"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Enter a name for your room"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Status Indicators */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${
                  status?.services.ollama.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <div className="text-white text-sm font-medium">Ollama</div>
                <div className="text-white/60 text-xs">
                  {status?.services.ollama.status === 'online' ? 'Running' : 'Offline'}
                </div>
              </div>
              
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${
                  status?.services.app.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <div className="text-white text-sm font-medium">App</div>
                <div className="text-white/60 text-xs">
                  {status?.services.app.status === 'online' ? 'Running' : 'Offline'}
                </div>
              </div>
              
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${
                  status?.services.ngrok.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <div className="text-white text-sm font-medium">Tunnel</div>
                <div className="text-white/60 text-xs">
                  {status?.services.ngrok.status === 'online' ? 'Active' : 'Offline'}
                </div>
              </div>
            </div>

            {/* Public URL Display */}
            {hasPublicUrl && (
              <div className="mb-6 bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm mb-1">Your Public Room URL:</p>
                    <p className="text-white font-mono text-sm break-all">{status.ngrok_url}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(status.ngrok_url || '')}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            )}

            {/* Control Buttons */}
            <div className="space-y-3">
              <button
                onClick={startAllServices}
                disabled={loading}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-105 disabled:transform-none"
              >
                {loading ? 'Starting...' : '🚀 Start Everything'}
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={startAppOnly}
                  disabled={loading}
                  className="bg-white/10 hover:bg-white/20 disabled:bg-gray-600 border border-white/20 text-white font-medium py-2 px-3 rounded-lg transition-all text-sm"
                >
                  📱 Start App
                </button>
                
                <button
                  onClick={startNgrokOnly}
                  disabled={loading}
                  className="bg-white/10 hover:bg-white/20 disabled:bg-gray-600 border border-white/20 text-white font-medium py-2 px-3 rounded-lg transition-all text-sm"
                >
                  🌐 Start Tunnel
                </button>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                <div className="text-sm text-red-200">{error}</div>
              </div>
            )}

            {/* Open Room Button */}
            {isAllRunning && (
              <div className="mt-6 pt-4 border-t border-white/10">
                <a
                  href="http://localhost:5006"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors block text-center"
                >
                  🏠 Open Your Chat Room
                </a>
              </div>
            )}

            {/* Instructions */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <h3 className="text-white font-medium mb-3">How to start:</h3>
              <ol className="text-white/70 text-sm space-y-2">
                <li>1. Enter a room name (optional)</li>
                <li>2. Click "Start Everything" to launch all services</li>
                <li>3. Copy the public URL to share with others</li>
                <li>4. Click "Open Your Chat Room" to start chatting</li>
              </ol>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <a 
              href="/"
              className="text-white/70 hover:text-white transition-colors"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
