'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function StartPage() {
  const [roomName, setRoomName] = useState('')
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const chatRoomUrl = process.env.NEXT_PUBLIC_GUMMY_API_URL || 'https://diatonically-pistonlike-verda.ngrok-free.dev';

  return (
    <div className="min-h-screen bg-[url('/gummy-diagonal.svg')] bg-cover bg-center bg-no-repeat">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <img 
              src="/gummy-logo.svg" 
              alt="Gummy Logo" 
              className="h-8 w-auto"
            />
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-white/80 hover:text-white transition-colors">
              Home
            </Link>
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
          <div className="bg-gray-800/80 backdrop-blur-md border border-gray-600/30 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Start a Room</h1>
              <p className="text-white/70">Use our servers to host a room and create a collaborative space</p>
            </div>

            {/* Room Name Input */}
            <div className="mb-6">
              <label htmlFor="roomName" className="block text-white font-medium mb-2">Room Name (Optional)</label>
              <input
                type="text"
                id="roomName"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Enter a name for your room"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Public URL Display */}
            <div className="mb-6 bg-gray-700/60 border border-gray-600/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm mb-1">Your Chat Room URL:</p>
                  <p className="text-white font-mono text-sm break-all">{chatRoomUrl}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(chatRoomUrl)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Launch Room Button */}
            <div className="mt-6">
              <a
                href={chatRoomUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-4 rounded-lg transition-all transform hover:scale-105"
              >
                🚀 Launch Room
              </a>
            </div>

            {/* Instructions */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <h3 className="text-white font-medium mb-3">How to use:</h3>
              <ol className="text-white/70 text-sm space-y-2">
                <li>1. Enter a room name (optional)</li>
                <li>2. Click "Launch Room" to start your chat room</li>
                <li>3. Copy the URL above to share with others</li>
                <li>4. If the server is offline, you'll see an error message</li>
              </ol>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <Link 
              href="/"
              className="text-white/70 hover:text-white transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}