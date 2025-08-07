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
import styles from './page.module.scss'

export default function ChatPage() {
  const searchParams = useSearchParams()
  const chatId = searchParams.get('id')
  const { createNewChat } = useCreateNewChat()
  const [currentChatId, setCurrentChatId] = React.useState<string | null>(null)
  const fetchedAssignments = React.useRef<Set<string>>(new Set())

  const { resetChat } = useChatStore()
  const { isConnected } = useSocketStore()

  // Get questionnaire state
  const { currentQuesion } = useAssignmentQuestionnaireStore()

  // Check if questionnaire is completed
  const isQuestionnaireCompleted = currentQuesion >= questions.length

  // Auto-create new chat if no ID exists
  React.useEffect(() => {
    if (!chatId) {
      createNewChat()
    }
  }, [chatId, createNewChat])

  // Handle chat ID changes - reset state and clear fetch tracking
  React.useEffect(() => {
    if (chatId && chatId !== currentChatId) {
      console.log(`Chat ID changed from ${currentChatId} to ${chatId}`)

      // Reset chat store
      resetChat()

      // Clear fetch tracking for new chat
      fetchedAssignments.current.clear()

      // Update current chat ID
      setCurrentChatId(chatId)
    }
  }, [chatId, currentChatId, resetChat])

  // Fetch assignment status once per chat when socket is connected
  React.useEffect(() => {
    if (chatId && isConnected && !fetchedAssignments.current.has(chatId)) {
      console.log("Fetching assignment status for:", chatId)

      // Mark as fetched immediately to prevent duplicates
      fetchedAssignments.current.add(chatId)

      // Fetch assignment status
      const cleanup = fetchAssignmentStatus(chatId)

      return cleanup
    }
  }, [chatId, isConnected])



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
