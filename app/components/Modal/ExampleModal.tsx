'use client'

import React, { useState } from 'react'
import { Modal } from '@/app/components/Modal'
import { Button } from '@/app/ui'

/**
 * Example component demonstrating how to use the generic Modal
 * This can be used as a reference for creating other modals
 */
const ExampleModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Example Modal
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        maxWidth="md"
        showCloseButton={true}
        closeOnBackdropClick={true}
      >
        <div style={{ padding: '2rem' }}>
          <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Example Modal
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#6b7280' }}>
            This is an example of how to use the generic Modal component. 
            You can put any content here as children.
          </p>
          <Button 
            onClick={() => setIsOpen(false)}
            variant="primary"
            fullWidth={true}
          >
            Close Modal
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default ExampleModal
