'use client'

import React, { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import styles from './AuthenticatedLayout.module.scss'

interface AuthenticatedLayoutProps {
  children: React.ReactNode
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  return (
    <div className={styles.layout}>
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={toggleSidebar} 
      />
      <main className={`${styles.main} ${isSidebarCollapsed ? styles.expanded : ''}`}>
        {children}
      </main>
    </div>
  )
}

export default AuthenticatedLayout
