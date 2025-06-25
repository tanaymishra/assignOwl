'use client'

import React from 'react'
import { BookOpen } from 'lucide-react'
import { useWaitlistModal } from '@/lib/store'
import Image from 'next/image'

export default function Header() {
  const { openModal } = useWaitlistModal()

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Image src={'/logo.svg'} alt='AssignOwl' width={120} height={40} />
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => openModal()}
              className="px-4 sm:px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
