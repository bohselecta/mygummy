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

export default function GummyHostingControls() {
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_GUMMY_API_URL || 'http://localhost:5007/api';

  const fetchStatus = async () => {
    try {
      const response = await fetch(`${API_BASE}/status`);
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
      const response = await fetch(`${API_BASE}/start-all`, { method: 'POST' });
      const result = await response.json();
      
      if (result.success) {
        // Wait a moment then refresh status
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
      const response = await fetch(`${API_BASE}/start-app`, { method: 'POST' });
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
      const response = await fetch(`${API_BASE}/start-ngrok`, { method: 'POST' });
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

  useEffect(() => {
    fetchStatus();
    // Poll status every 5 seconds
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const isAllRunning = status?.services.ollama.status === 'online' && 
                      status?.services.app.status === 'online' && 
                      status?.services.ngrok.status === 'online';

  const hasPublicUrl = status?.ngrok_url && status.ngrok_url !== 'Not available';

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Start Gummy Room</h3>
        <p className="text-gray-600">Launch the Ollama chat host and share it with others</p>
        {API_BASE.includes('localhost') && (
          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              ⚠️ Currently configured for local development. Set NEXT_PUBLIC_GUMMY_API_URL to your public server URL for production.
            </p>
          </div>
        )}
      </div>

      {/* Status Indicators */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${
            status?.services.ollama.status === 'online' ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
          <div className="text-sm font-medium">Ollama</div>
          <div className="text-xs text-gray-500">
            {status?.services.ollama.status === 'online' ? 'Running' : 'Offline'}
          </div>
        </div>
        
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${
            status?.services.app.status === 'online' ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
          <div className="text-sm font-medium">App</div>
          <div className="text-xs text-gray-500">
            {status?.services.app.status === 'online' ? 'Running' : 'Offline'}
          </div>
        </div>
        
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${
            status?.services.ngrok.status === 'online' ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
          <div className="text-sm font-medium">Tunnel</div>
          <div className="text-xs text-gray-500">
            {status?.services.ngrok.status === 'online' ? 'Active' : 'Offline'}
          </div>
        </div>
      </div>

      {/* Public URL Display */}
      {hasPublicUrl && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="text-sm font-medium text-green-800 mb-1">🌐 Your Public Room URL:</div>
          <div className="text-lg font-mono text-green-900 break-all">{status.ngrok_url}</div>
          <div className="text-xs text-green-600 mt-1">Share this link to let others join your AI chat room</div>
        </div>
      )}

      {/* Control Buttons */}
      <div className="space-y-3">
        <button
          onClick={startAllServices}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          {loading ? 'Starting...' : '🚀 Start Everything'}
        </button>
        
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={startAppOnly}
            disabled={loading}
            className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm"
          >
            📱 Start App
          </button>
          
          <button
            onClick={startNgrokOnly}
            disabled={loading}
            className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm"
          >
            🌐 Start Tunnel
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-sm text-red-800">{error}</div>
        </div>
      )}

      {/* Join Room Button */}
      {isAllRunning && (
        <div className="mt-6 pt-4 border-t border-gray-200">
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
    </div>
  );
}
