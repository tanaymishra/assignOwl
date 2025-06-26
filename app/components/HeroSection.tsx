'use client'

import React, { useState } from 'react'
import { Sparkles, ArrowRight, Mail } from 'lucide-react'
import { useWaitlistModal } from '@/lib/store'
import { Button, Input } from '@/app/ui'

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
              Built on Experience. Powered by AI.
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
              Ready to Help.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
            AssignOwl packs half a decade of experience into an AI assistant fine‑tuned on thousands of real assignments—so you get coursework help that hits the mark, every time.
          </p>

          <div className="max-w-md mx-auto pt-8">
            <form onSubmit={handleEarlyAccessSubmit} className="space-y-4">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                icon={Mail}
                iconPosition="left"
                variant="glow"
                fullWidth={true}
              />
              <Button
                type="submit"
                variant="primary"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                glow={true}
                fullWidth={true}
              >
                Request Early Access
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}