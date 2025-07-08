'use client'

import React, { useState, useEffect } from 'react'
import { 
  MessageSquare, 
  Plus, 
  Settings, 
  User, 
  History, 
  FileText, 
  Search,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react'
import { IconButton } from '@/app/ui'
import ThemeToggle from '@/app/components/ThemeToggle'
import ProfileDropdown from '@/app/components/ProfileDropdown'
import { useTheme } from '@/app/contexts/ThemeContext'
import styles from './Sidebar.module.scss'
import Image from 'next/image'

interface SidebarProps {
  isCollapsed?: boolean
  isMobileOpen?: boolean
  onToggle?: () => void
  onMobileClose?: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isCollapsed = false, 
  isMobileOpen = false,
  onToggle,
  onMobileClose 
}) => {
  const [activeItem, setActiveItem] = useState('chat')
  const [isMobile, setIsMobile] = useState(false)
  const { theme } = useTheme()

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleToggle = () => {
    if (isMobile && onMobileClose) {
      onMobileClose()
    } else if (onToggle) {
      onToggle()
    }
  }

  const menuItems = [
    { id: 'chat', label: 'New Chat', icon: Plus, isButton: true },
    { id: 'recent', label: 'Recent Chats', icon: History },
    { id: 'assignments', label: 'My Assignments', icon: FileText },
  ]

  const bottomItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''} ${isMobileOpen ? styles.open : ''}`}>
      {/* Header */}
      <div className={styles.header}>
        {(!isCollapsed || isMobile) && (
          <div className={styles.logo}>
            <Image 
              src={theme === 'dark' ? '/darkThemeLogo.svg' : '/logo.svg'} 
              alt='AssignOwl' 
              width={100} 
              height={40}
            />
          </div>
        )}
        
        <button 
          onClick={handleToggle}
          className={styles.toggleButton}
          aria-label={
            isMobile 
              ? 'Close sidebar' 
              : isCollapsed 
                ? 'Expand sidebar' 
                : 'Collapse sidebar'
          }
        >
          {isMobile ? <X /> : isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      {/* Search */}
      {(!isCollapsed || isMobile) && (
        <div className={styles.searchSection}>
          <div className={styles.searchInput}>
            <Search className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search chats..."
              className={styles.input}
            />
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <nav className={styles.navigation}>
        {menuItems.map((item) => (
          <IconButton
            key={item.id}
            icon={item.icon}
            label={item.label}
            onClick={() => {
              setActiveItem(item.id)
              // Close mobile menu when selecting an item
              if (isMobile && onMobileClose) {
                onMobileClose()
              }
            }}
            variant={item.isButton ? 'primary' : 'default'}
            size="md"
            isActive={activeItem === item.id && !item.isButton}
            showLabel={!isCollapsed || isMobile}
            className={styles.navItem}
            title={isCollapsed && !isMobile ? item.label : undefined}
          />
        ))}
      </nav>

      {/* Chat History */}
      {(!isCollapsed || isMobile) && (
        <div className={`${styles.chatHistory} sidebar-scrollbar`}>
          <h3 className={styles.sectionTitle}>Recent Chats</h3>
          <div className={styles.chatList}>
            {/* Sample chat items */}
            <div 
              className={styles.chatItem}
              onClick={() => {
                // Close mobile menu when selecting a chat
                if (isMobile && onMobileClose) {
                  onMobileClose()
                }
              }}
            >
              <div className={styles.chatTitle}>Math Assignment Help</div>
              <div className={styles.chatTime}>2 hours ago</div>
            </div>
            <div 
              className={styles.chatItem}
              onClick={() => {
                // Close mobile menu when selecting a chat
                if (isMobile && onMobileClose) {
                  onMobileClose()
                }
              }}
            >
              <div className={styles.chatTitle}>Essay Writing Tips</div>
              <div className={styles.chatTime}>Yesterday</div>
            </div>
            <div 
              className={styles.chatItem}
              onClick={() => {
                // Close mobile menu when selecting a chat
                if (isMobile && onMobileClose) {
                  onMobileClose()
                }
              }}
            >
              <div className={styles.chatTitle}>Physics Problem Solving</div>
              <div className={styles.chatTime}>2 days ago</div>
            </div>
          </div>
        </div>
      )}

      {/* Token Usage Section */}
      {(!isCollapsed || isMobile) && (
        <div className={styles.tokenUsage}>
          <div className={styles.tokenHeader}>
            <span className={styles.tokenTitle}>Token Usage</span>
            <span className={styles.planBadge}>Free Plan</span>
          </div>
          <div className={styles.tokenStats}>
            <div className={styles.tokenBar}>
              <div className={styles.tokenProgress} style={{ width: '67%' }}></div>
            </div>
            <div className={styles.tokenText}>
              <span>1,340 / 2,000</span>
              <span className={styles.tokenPeriod}>tokens this month</span>
            </div>
          </div>
          <button className={styles.upgradeButton}>
            Upgrade to Pro 🚀
          </button>
        </div>
      )}

      {/* Bottom Section */}
      <div className={styles.bottomSection}>
        {/* Profile Dropdown */}
        {(!isCollapsed || isMobile) && (
          <div className={styles.profileSection}>
            <ProfileDropdown 
              userName="John Doe"
              userEmail="john@example.com"
              onLogout={() => {
                console.log('Logging out...')
                // Add your logout logic here
              }}
              onSettings={() => {
                console.log('Opening settings...')
                setActiveItem('settings')
                if (isMobile && onMobileClose) {
                  onMobileClose()
                }
              }}
              onHelp={() => {
                console.log('Opening help...')
                if (isMobile && onMobileClose) {
                  onMobileClose()
                }
              }}
            />
          </div>
        )}
        
        {bottomItems.map((item) => (
          <IconButton
            key={item.id}
            icon={item.icon}
            label={item.label}
            onClick={() => {
              setActiveItem(item.id)
              // Close mobile menu when selecting an item
              if (isMobile && onMobileClose) {
                onMobileClose()
              }
            }}
            variant="default"
            size="md"
            isActive={activeItem === item.id}
            showLabel={!isCollapsed || isMobile}
            className={styles.navItem}
            title={isCollapsed && !isMobile ? item.label : undefined}
          />
        ))}
        
        {/* Theme Toggle */}
        <ThemeToggle
          variant="ghost"
          size="md"
          showLabel={!isCollapsed || isMobile}
          className={styles.navItem}
        />
      </div>
    </div>
  )
}

export default Sidebar
