'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/app/ui'
import { useLoginStore } from './loginModal/store/loginStore'
import { useAuth } from './loginModal/functions/authStore'

export default function Header() {
  const router = useRouter()
  const { openModal, setMode } = useLoginStore()
  const { isAuthenticated, isHydrated } = useAuth()

  const handleSignIn = () => {
    setMode('signin')
    openModal()
  }

  const handleSignUp = () => {
    setMode('signup')
    openModal()
  }

  const handleGoToConsole = () => {
    router.push('/chat')
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Image 
              src='/logo.svg' 
              alt='AssignOwl' 
              width={120} 
              height={40} 
            />
          </div>

          <div className="flex items-center space-x-3">
            {!isHydrated ? (
              // Show loading state while hydrating
              <div className="flex items-center space-x-3">
                <div className="w-16 h-8 bg-gray-200 animate-pulse rounded"></div>
                <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
              </div>
            ) : isAuthenticated ? (
              // Show "Go to Console" if authenticated
              <Button
                onClick={handleGoToConsole}
                variant="primary"
                size="md"
                glow={true}
              >
                Go to Console
              </Button>
            ) : (
              // Show Sign In/Sign Up if not authenticated
              <>
                <Button
                  onClick={handleSignIn}
                  variant="ghost"
                  size="md"
                >
                  Sign In
                </Button>
                <Button
                  onClick={handleSignUp}
                  variant="primary"
                  size="md"
                  glow={true}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
