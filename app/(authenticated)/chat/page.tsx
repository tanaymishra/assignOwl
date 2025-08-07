'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import useChatStore from './store/chatStore'
import { ChatMessages, AssignmentQuestionnaire } from './sections'
import { useCreateNewChat } from '@/app/components/Sidebar/functions/chatFunctions'
import useAssignmentQuestionnaireStore from './sections/assignmentQuestionnaire/store/assignMentQuestionare'
import { questions } from './sections/assignmentQuestionnaire/questions'
import { fetchAssignmentStatus } from './functions/assignmentStatusHandler'
import { useSocketStore } from '@/app/socket'
import { useMessagesStore } from './sections/chatMessages/store/store'
import styles from './page.module.scss'

export default function ChatPage() {
  const searchParams = useSearchParams()
  const chatId = searchParams.get('id')
  const { createNewChat } = useCreateNewChat()
  const [currentChatId, setCurrentChatId] = React.useState<string | null>(null)

  const { resetChat } = useChatStore()
  const { socket } = useSocketStore()
  const { update } = useMessagesStore()

  // Get questionnaire state
  const { currentQuesion, reset: resetQuestionnaire } = useAssignmentQuestionnaireStore()

  // Simple approach: use questionnaire store directly, but default to completed
  // This way socket can control it by updating the store
  const isQuestionnaireCompleted = currentQuesion >= questions.length

  // Auto-create new chat if no ID exists
  React.useEffect(() => {
    if (!chatId) {
      createNewChat()
    }
  }, [chatId, createNewChat])

  // Handle ID changes and fetch assignment status
  React.useEffect(() => {
    if (chatId && chatId !== currentChatId) {
      // ID has changed, reset all state
      console.log(`Chat ID changed from ${currentChatId} to ${chatId} - resetting state`)

      // Reset chat store (messages, loading, etc.)
      resetChat()

      // Update current chat ID
      setCurrentChatId(chatId)
    }
  }, [chatId, currentChatId, resetChat])

  // Separate effect to wait for socket connection before fetching assignment status
  React.useEffect(() => {
    if (chatId && socket && socket.connected) {
      console.log("Socket connected, fetching assignment status for:", chatId)
      const cleanup = fetchAssignmentStatus(chatId)
      return cleanup
    }
  }, [chatId, socket])



  // If no chat ID exists, return null (createNewChat will redirect)
  if (!chatId) {
    return null
  }

  return (
    <div className={styles.container}>
      {!isQuestionnaireCompleted ? (
        <AssignmentQuestionnaire />
      ) : (
        <div className={styles.chatContainer}>
          <ChatMessages />
        </div>
      )}
    </div>
  )
}
