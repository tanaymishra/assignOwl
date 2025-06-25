'use client'

import React, { useState } from 'react'
import { Mail } from 'lucide-react'
import { useWaitlistModal } from '@/lib/store'

export default function CTASection() {
  const [email, setEmail] = useState('')
  const { openModal } = useWaitlistModal()

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    openModal(email)
  }

  return (
    <section className="py-16 bg-gradient-to-br from-green-900 to-green-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
            Ready to Transform Your <br />
            Academic Experience?
          </h2>
          <p className="text-green-100 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Join thousands of students who are already experiencing the future of academic assistance.
            Be among the first to access our revolutionary AI platform.
          </p>

          <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3 max-w-lg mx-auto">
            <div className="relative flex-1 w-full">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent shadow-lg text-sm"
              />
            </div>
            <button
              type="submit"
              className="whitespace-nowrap px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
            >
              Get Started Free
            </button>
          </form>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-green-200 text-xs">
            <div className="flex items-center space-x-1">
              <span>✓</span>
              <span>Free to join</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>✓</span>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>✓</span>
              <span>Early access benefits</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
