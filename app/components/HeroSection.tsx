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
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-blue-200/30 blur-3xl"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-fade-in">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-100 to-blue-50 rounded-full border border-blue-200 shadow-sm">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">Powered by Advanced AI Technology</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-gray-900">
              Transform Your
            </span>
            <br />
            <span className="gradient-text">
              Academic Journey
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Experience the future of academic assistance with our AI-powered platform.
            Get personalized help, instant feedback, and expert guidance for all your assignments
            with unprecedented accuracy and speed.
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
                  className="w-full pl-12 pr-6 py-3 bg-white border border-blue-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg text-base"
                />
              </div>
              <button
                type="submit"
                className="group w-full px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center space-x-3"
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