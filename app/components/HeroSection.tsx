'use client'

import React, { useState } from 'react'
import { Sparkles, ArrowRight, Mail } from 'lucide-react'
import { useWaitlistModal } from '@/lib/store'

export default function HeroSection() {
  const [email, setEmail] = useState('')
  const { openModal } = useWaitlistModal()

  const handleEarlyAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    openModal(email)
  }

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-green-950/30 to-green-900/20 blur-3xl"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-fade-in">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-900/80 to-gray-800/80 rounded-full border border-gray-700 shadow-sm">
            <Sparkles className="w-5 h-5 text-green-400" />
            <span className="text-sm font-semibold text-green-300">Powered by Advanced AI Technology</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-white">
              Transform Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
              Academic Journey
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
            AssignOwl packs half a decade of experience into an AI assistant fine‑tuned on thousands of real assignments—so you get coursework help that hits the mark, every time.
          </p>

          <div className="max-w-md mx-auto pt-8">
            <form onSubmit={handleEarlyAccessSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-6 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-lg text-base"
                />
              </div>
              <button
                type="submit"
                className="group w-full px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center space-x-3"
              >
                <span className="text-base">Request Early Access</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}