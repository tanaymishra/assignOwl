'use client'

import React from 'react'
import { useWaitlistModal } from '@/lib/store'
import Image from 'next/image'
import { Button } from '@/app/ui'

export default function Header() {
  const { openModal } = useWaitlistModal()

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Image src={'/logo.svg'} alt='AssignOwl' width={120} height={40} />
          </div>

          <div className="flex items-center space-x-3">
            <Button
              onClick={() => openModal()}
              variant="primary"
              size="md"
              glow={true}
            >
              Join Waitlist
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
