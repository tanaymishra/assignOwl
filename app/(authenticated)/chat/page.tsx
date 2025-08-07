'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import useChatStore from './store/chatStore'
import { ChatMessages, AssignmentQuestionnaire } from './sections'
import { useCreateNewChat } from '@/app/components/Sidebar/functions/chatFunctions'
import useAssignmentQuestionnaireStore from './sections/assignmentQuestionnaire/store/assignMentQuestionare'
import { questions } from './sections/assignmentQuestionnaire/questions'
import styles from './page.module.scss'



export default function ChatPage() {
  const searchParams = useSearchParams()
  const chatId = searchParams.get('id')
  const { createNewChat } = useCreateNewChat()
  const [currentChatId, setCurrentChatId] = React.useState<string | null>(null)

  const { resetChat } = useChatStore()

  // Get questionnaire state
  const { currentQuesion, reset: resetQuestionnaire } = useAssignmentQuestionnaireStore()

  // Default to questionnaire completed (true) - show ChatMessages by default
  // Only becomes false when socket confirms questionnaire is needed
  const [isQuestionnaireCompleted, setIsQuestionnaireCompleted] = React.useState(true)

  // Function to be called by socket when questionnaire is needed for new chat
  React.useEffect(() => {
    // This would be called by your socket event handler when server confirms
    // that this is a new chat requiring questionnaire
    // Example: socket.on('assignment:needs_questionnaire', () => {
    //   resetQuestionnaire()
    //   setIsQuestionnaireCompleted(false)
    // })
  }, [])

  // Auto-create new chat if no ID exists
  React.useEffect(() => {
    if (!chatId) {
      createNewChat()
    }
  }, [chatId, createNewChat])

  // Handle ID changes - reset state when chat ID changes
  React.useEffect(() => {
    if (chatId && chatId !== currentChatId) {
      // ID has changed, reset all state
      console.log(`Chat ID changed from ${currentChatId} to ${chatId} - resetting state`)

      // Reset chat store (messages, loading, etc.)
      resetChat()

      // Update current chat ID
      setCurrentChatId(chatId)

      // DON'T automatically reset questionnaire or show it
      // Wait for socket confirmation to determine if questionnaire is needed
      // Keep showing ChatMessages (with skeleton) until socket confirms otherwise
    }
  }, [chatId, currentChatId, resetChat, resetQuestionnaire])



  // If no chat ID exists, return null (createNewChat will redirect)
  if (!chatId) {
    return null
  }

  return (
    <div className={styles.container}>
      {!isQuestionnaireCompleted ? (
        <AssignmentQuestionnaire onComplete={() => setIsQuestionnaireCompleted(true)} />
      ) : (
        <div className={styles.chatContainer}>
          <ChatMessages />
        </div>
      )}
    </div>
  )
}
