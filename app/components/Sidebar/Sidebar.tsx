'use client'

import React, { useState } from 'react'
import { 
  MessageSquare, 
  Plus, 
  Settings, 
  User, 
  History, 
  FileText, 
  Search,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { IconButton } from '@/app/ui'
import styles from './Sidebar.module.scss'
import Image from 'next/image'

interface SidebarProps {
  isCollapsed?: boolean
  onToggle?: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isCollapsed = false, 
  onToggle 
}) => {
  const [activeItem, setActiveItem] = useState('chat')

  const menuItems = [
    { id: 'chat', label: 'New Chat', icon: Plus, isButton: true },
    { id: 'recent', label: 'Recent Chats', icon: History },
    { id: 'assignments', label: 'My Assignments', icon: FileText },
  ]

  const bottomItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'profile', label: 'Profile', icon: User },
  ]

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      {/* Header */}
      <div className={styles.header}>
        {!isCollapsed && (
          <div className={styles.logo}>
            <Image src={'/logo.svg'} alt='AssignOwl' width={100} height={40}></Image>
          </div>
        )}
        
        <button 
          onClick={onToggle}
          className={styles.toggleButton}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      {/* Search */}
      {!isCollapsed && (
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
            onClick={() => setActiveItem(item.id)}
            variant={item.isButton ? 'primary' : 'default'}
            size="md"
            isActive={activeItem === item.id && !item.isButton}
            showLabel={!isCollapsed}
            className={styles.navItem}
            title={isCollapsed ? item.label : undefined}
          />
        ))}
      </nav>

      {/* Chat History */}
      {!isCollapsed && (
        <div className={styles.chatHistory}>
          <h3 className={styles.sectionTitle}>Recent Chats</h3>
          <div className={styles.chatList}>
            {/* Sample chat items */}
            <div className={styles.chatItem}>
              <div className={styles.chatTitle}>Math Assignment Help</div>
              <div className={styles.chatTime}>2 hours ago</div>
            </div>
            <div className={styles.chatItem}>
              <div className={styles.chatTitle}>Essay Writing Tips</div>
              <div className={styles.chatTime}>Yesterday</div>
            </div>
            <div className={styles.chatItem}>
              <div className={styles.chatTitle}>Physics Problem Solving</div>
              <div className={styles.chatTime}>2 days ago</div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Section */}
      <div className={styles.bottomSection}>
        {bottomItems.map((item) => (
          <IconButton
            key={item.id}
            icon={item.icon}
            label={item.label}
            onClick={() => setActiveItem(item.id)}
            variant="default"
            size="md"
            isActive={activeItem === item.id}
            showLabel={!isCollapsed}
            className={styles.navItem}
            title={isCollapsed ? item.label : undefined}
          />
        ))}
      </div>
    </div>
  )
}

export default Sidebar
