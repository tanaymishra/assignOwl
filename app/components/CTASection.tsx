'use client'

import React, { useState } from 'react'
import { Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useWaitlistModal } from '@/lib/store'
import { Button, Input } from '@/app/ui'

export default function CTASection() {
  const [email, setEmail] = useState('')
  const { openModal } = useWaitlistModal()
  const router = useRouter()

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    openModal(email)
  }

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-green-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            10,000+ Students Helped <br />
            Now, It's Automated.
          </h2>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            AssignOwl takes years of real, hands-on support and turns it into an AI that's ready to help anytime, anywhere.
          </p>

          <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3 max-w-lg mx-auto">
            <div className="flex-1 w-full">
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
            </div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              glow={true}
            >
              Join Waitlist
            </Button>
          </form>

          <div className="flex items-center justify-center space-x-4 pt-4">
            <Button
              onClick={() => router.push('/packages')}
              variant="outline"
              size="md"
            >
              View Pricing
            </Button>
          </div>

          <div className="text-center space-y-2 pt-4">
            <p className="text-sm text-gray-600">
              Be the first to experience the future of academic success.
            </p>
            <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>No spam, ever</span>
              </span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Early access perks</span>
              </span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Exclusive updates</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
