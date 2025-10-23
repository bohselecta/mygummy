'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function JoinPage() {
  const [nickname, setNickname] = useState('')
  const [roomUrl, setRoomUrl] = useState('')
  const [generatedRoomId, setGeneratedRoomId] = useState('')
  const [copied, setCopied] = useState(false)

  const generateRoomId = () => {
    const randomId = Math.floor(Math.random() * 1000)
    const roomId = `@gummy-${randomId}`
    setGeneratedRoomId(roomId)
    return roomId
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nickname.trim()) {
      alert('Please enter a nickname')
      return
    }
    
    const roomId = generatedRoomId || generateRoomId()
    const joinUrl = `${window.location.origin}/room/${roomId}?nickname=${encodeURIComponent(nickname)}`
    
    // In a real app, you'd redirect to the room or handle the join logic
    console.log('Joining room:', { nickname, roomId, joinUrl })
    alert(`Joining room ${roomId} as ${nickname}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Join a Room</h1>
              <p className="text-white/70">Enter your nickname and room details to start collaborating</p>
            </div>

            <form onSubmit={handleJoinRoom} className="space-y-6">
              {/* Nickname Input */}
              <div>
                <label htmlFor="nickname" className="block text-white font-medium mb-2">
                  Your Nickname
                </label>
                <input
                  type="text"
                  id="nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="Enter your nickname"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Room URL Input */}
              <div>
                <label htmlFor="roomUrl" className="block text-white font-medium mb-2">
                  Room URL (Optional)
                </label>
                <input
                  type="url"
                  id="roomUrl"
                  value={roomUrl}
                  onChange={(e) => setRoomUrl(e.target.value)}
                  placeholder="Paste room URL or leave blank for new room"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Generate Room ID Button */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={generateRoomId}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-2 rounded-lg transition-all"
                >
                  Generate Room ID
                </button>
              </div>

              {/* Generated Room ID Display */}
              {generatedRoomId && (
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm mb-1">Room ID:</p>
                      <p className="text-white font-mono">{generatedRoomId}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(generatedRoomId)}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              )}

              {/* Join Room Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-105"
              >
                Join Room
              </button>
            </form>

            {/* Instructions */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <h3 className="text-white font-medium mb-3">How to join:</h3>
              <ol className="text-white/70 text-sm space-y-2">
                <li>1. Enter your nickname above</li>
                <li>2. Either paste a room URL or generate a new room ID</li>
                <li>3. Click "Join Room" to start collaborating</li>
                <li>4. Share the room ID with others to invite them</li>
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
