'use client'

import React from 'react'
import { BookOpen } from 'lucide-react'
import { useWaitlistModal } from '@/lib/store'
import Image from 'next/image'

export default function Header() {
  const { openModal } = useWaitlistModal()

  return (
    <header className="sticky top-0 z-50 glass-effect shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Image src={'/logo.svg'} alt='AssignOwl' width={120} height={40} />
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => openModal()}
              className="px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
