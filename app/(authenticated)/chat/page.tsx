'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import useChatStore, { Message, Artifact } from './store/chatStore'
import { ChatMessages, ChatInput, AssignmentQuestionnaire } from './sections'
import { useCreateNewChat } from '@/app/components/Sidebar/functions/chatFunctions'
import useAssignmentQuestionnaireStore from './sections/assignmentQuestionnaire/store/assignMentQuestionare'
import { questions } from './sections/assignmentQuestionnaire/questions'
import styles from './page.module.scss'

const generateSampleAssignmentContent = () => {
  return `
    <h1>Assignment Structure Guide</h1>
    
    <h2>1. Understanding the Assignment</h2>
    <p>Before you begin writing, make sure you fully understand what is being asked of you:</p>
    <ul>
      <li>Read the assignment prompt multiple times</li>
      <li>Identify key requirements and criteria</li>
      <li>Note the word count and formatting requirements</li>
      <li>Check the due date and plan accordingly</li>
    </ul>
    
    <h2>2. Research and Planning</h2>
    <p>Effective research is the foundation of a strong assignment:</p>
    <ul>
      <li><strong>Primary Sources:</strong> Original documents, research papers, interviews</li>
      <li><strong>Secondary Sources:</strong> Academic books, journal articles, credible websites</li>
      <li><strong>Note-taking:</strong> Organize your research with proper citations</li>
    </ul>
    
    <h2>3. Creating an Outline</h2>
    <p>A well-structured outline will guide your writing process:</p>
    <ol>
      <li><strong>Introduction</strong> - Hook, background, thesis statement</li>
      <li><strong>Body Paragraphs</strong> - Main arguments with supporting evidence</li>
      <li><strong>Conclusion</strong> - Summary and final thoughts</li>
    </ol>
    
    <h2>4. Writing Tips</h2>
    <ul>
      <li>Start with a compelling introduction</li>
      <li>Use clear topic sentences for each paragraph</li>
      <li>Support your arguments with evidence</li>
      <li>Maintain academic tone and style</li>
      <li>Cite all sources properly</li>
    </ul>
    
    <h2>5. Review and Editing</h2>
    <p>Always leave time for revision:</p>
    <ul>
      <li>Check for clarity and coherence</li>
      <li>Verify all citations and references</li>
      <li>Proofread for grammar and spelling</li>
      <li>Ensure you've met all requirements</li>
    </ul>
    
    <p><em>Remember: Good assignments are not written, they are rewritten. Take time to refine your work!</em></p>
  `
}

export default function ChatPage() {
  const searchParams = useSearchParams()
  const chatId = searchParams.get('id')
  const { createNewChat } = useCreateNewChat()

  const {
    messages,
    inputValue,
    attachedFiles,
    addMessage,
    clearInput,
    setIsLoading,
    updateMessageArtifact
  } = useChatStore()

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

  const handleSubmit = async () => {
    if (!inputValue.trim() && attachedFiles.length === 0) return

    // Use a more consistent ID generation
    const now = Date.now()
    const userMessage: Message = {
      id: `user-${now}`,
      type: 'user',
      content: inputValue,
      timestamp: new Date(now),
      attachments: attachedFiles.map(f => f.name)
    }

    addMessage(userMessage)
    clearInput()
    setIsLoading(true)

    // Simulate AI response with static data
    setTimeout(() => {
      const aiResponseTime = Date.now()
      const aiResponseId = `assistant-${aiResponseTime}`
      const aiResponse: Message = {
        id: aiResponseId,
        type: 'assistant',
        content: "I understand you need help with your assignment. Based on what you've shared, here are some suggestions:\n\n1. **Start with an outline** - Break down your assignment into smaller, manageable sections.\n\n2. **Research thoroughly** - Use credible academic sources to support your arguments.\n\n3. **Create a timeline** - Set deadlines for each section to avoid last-minute stress.\n\n4. **Review requirements** - Make sure you understand all the assignment criteria.\n\nI'm generating a detailed assignment structure document for you below.",
        timestamp: new Date(aiResponseTime)
      }
      addMessage(aiResponse)
      setIsLoading(false)

      // Generate artifact after a short delay
      setTimeout(() => {
        const artifactTime = Date.now()
        const artifact: Artifact = {
          id: `artifact-${artifactTime}`,
          title: 'Assignment Structure Guide',
          type: 'document',
          content: generateSampleAssignmentContent(),
          isGenerating: true
        }

        // Add artifact with generating state
        updateMessageArtifact(aiResponseId, artifact)

        // Simulate artifact generation completion
        setTimeout(() => {
          const completedArtifact: Artifact = {
            ...artifact,
            isGenerating: false
          }
          updateMessageArtifact(aiResponseId, completedArtifact)
        }, 3000)
      }, 1000)
    }, 2000)
  }

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
