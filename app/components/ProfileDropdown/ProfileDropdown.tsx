'use client'

import React, { useState, useRef, useEffect } from 'react'
import { User, LogOut, Settings, HelpCircle, ChevronDown } from 'lucide-react'
import styles from './ProfileDropdown.module.scss'

interface ProfileDropdownProps {
  userName?: string
  userEmail?: string
  onLogout?: () => void
  onSettings?: () => void
  onHelp?: () => void
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  userName = "John Doe",
  userEmail = "john@example.com",
  onLogout,
  onSettings,
  onHelp
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    setIsOpen(false)
    if (onLogout) {
      onLogout()
    } else {
      // Default logout behavior
      console.log('Logging out...')
      // You can add your logout logic here
    }
  }

  const handleSettings = () => {
    setIsOpen(false)
    if (onSettings) {
      onSettings()
    } else {
      console.log('Opening settings...')
    }
  }

  const handleHelp = () => {
    setIsOpen(false)
    if (onHelp) {
      onHelp()
    } else {
      console.log('Opening help...')
    }
  }

  return (
    <div className={styles.profileDropdown} ref={dropdownRef}>
      {/* Profile Button */}
      <button
        className={styles.profileButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Profile menu"
        aria-expanded={isOpen}
      >
        <div className={styles.avatar}>
          <User size={18} />
        </div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{userName}</span>
          <span className={styles.userEmail}>{userEmail}</span>
        </div>
        <ChevronDown 
          size={16} 
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={styles.dropdownMenu}>
          <div className={styles.userSection}>
            <div className={styles.userAvatar}>
              <User size={24} />
            </div>
            <div className={styles.userDetails}>
              <div className={styles.displayName}>{userName}</div>
              <div className={styles.email}>{userEmail}</div>
            </div>
          </div>
          
          <div className={styles.divider} />
          
          <div className={styles.menuItems}>
            {onSettings && (
              <button className={styles.menuItem} onClick={handleSettings}>
                <Settings size={18} />
                <span>Settings</span>
              </button>
            )}
            
            <button className={styles.menuItem} onClick={handleHelp}>
              <HelpCircle size={18} />
              <span>Help & Support</span>
            </button>
            
            <div className={styles.divider} />
            
            <button className={styles.menuItem} onClick={handleLogout}>
              <LogOut size={18} />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileDropdown
