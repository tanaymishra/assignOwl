'use client'

import React from 'react'
import WaitlistModal from './WaitlistModal'
import { useWaitlistModal } from '@/lib/store'

export default function ModalProvider() {
  const { isOpen, prefilledEmail, closeModal } = useWaitlistModal()

  return (
    <WaitlistModal 
      isOpen={isOpen} 
      onClose={closeModal}
      prefilledEmail={prefilledEmail}
    />
  )
}
