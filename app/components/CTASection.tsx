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
    <section className="py-24 bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <h2 className="text-5xl font-bold text-white leading-tight">
            Ready to Transform Your <br />
            Academic Experience?
          </h2>
          <p className="text-blue-100 text-xl leading-relaxed max-w-3xl mx-auto">
            Join thousands of students who are already experiencing the future of academic assistance.
            Be among the first to access our revolutionary AI platform.
          </p>

          <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-lg mx-auto">
            <div className="relative flex-1 w-full">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-12 pr-6 py-4 bg-white border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent shadow-lg"
              />
            </div>
            <button
              type="submit"
              className="whitespace-nowrap px-8 py-4 bg-white hover:bg-gray-50 text-blue-600 font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Get Started Free
            </button>
          </form>

          <div className="flex items-center justify-center space-x-8 text-blue-200 text-sm">
            <div className="flex items-center space-x-2">
              <span>✓</span>
              <span>Free to join</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>✓</span>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>✓</span>
              <span>Early access benefits</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
