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

  // Check if questionnaire is completed
  const isQuestionnaireCompleted = currentQuesion >= questions.length

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

      // Reset questionnaire store (questions, answers, etc.)
      resetQuestionnaire()

      // Update current chat ID
      setCurrentChatId(chatId)

      // TODO: Here you would typically fetch the assignment status from server
      // to determine if questionnaire is completed or not
      // For now, we'll start fresh with questionnaire
    }
  }, [chatId, currentChatId, resetChat, resetQuestionnaire])



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
