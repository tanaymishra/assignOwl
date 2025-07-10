'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Send, PenTool, BookOpen, Target, Sparkles } from 'lucide-react'
import { Button } from '@/app/ui'

export default function AssignmentInputSection() {
  const [assignment, setAssignment] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const router = useRouter()

  const handleAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (assignment.trim()) {
      setIsAnimating(true)
      
      // Add a slight delay for animation effect
      setTimeout(() => {
        const encodedQuery = encodeURIComponent(assignment.trim())
        router.push(`/chat?query=${encodedQuery}`)
      }, 300)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleAssignmentSubmit(e)
    }
  }

  const suggestedPrompts = [
    "Write a research paper on climate change impacts",
    "Help me structure an essay about Shakespeare's Hamlet",
    "Create an analysis of the economic effects of globalization",
    "Develop a thesis statement for my history assignment"
  ]

  const handleSuggestionClick = (suggestion: string) => {
    setAssignment(suggestion)
  }

  return (
    <section className="relative py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-50 to-blue-50 rounded-full border border-green-200/50 mb-6">
            <Sparkles className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">AI-Powered Writing Assistant</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Tell me about your{' '}
            <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              assignment
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Describe your assignment, essay topic, or research question. Our AI will help you structure, 
            research, and write high-quality academic content.
          </p>
        </div>

        {/* Main Input Area */}
        <div className="relative mb-8">
          <form onSubmit={handleAssignmentSubmit} className="space-y-6">
            <div className="relative group">
              {/* Input Container */}
              <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl border border-gray-200/50 transition-all duration-500 group-hover:shadow-3xl group-focus-within:shadow-3xl group-focus-within:border-green-300/50">
                {/* Animated gradient border */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative bg-white rounded-3xl p-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <PenTool className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <textarea
                        value={assignment}
                        onChange={(e) => setAssignment(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Describe your assignment in detail... (e.g., 'Write a 1500-word essay analyzing the causes of World War I with focus on political tensions')"
                        className="w-full h-32 text-lg text-gray-900 placeholder-gray-500 bg-transparent border-none outline-none resize-none leading-relaxed"
                        rows={4}
                      />
                    </div>
                  </div>
                  
                  {/* Action Bar */}
                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4" />
                        <span>Essays & Reports</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4" />
                        <span>Research Papers</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-500">
                        Press <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">Enter</kbd> to start
                      </span>
                      
                      <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        icon={Send}
                        iconPosition="right"
                        glow={true}
                        disabled={!assignment.trim() || isAnimating}
                        className={`px-6 py-3 font-semibold transition-all duration-300 ${
                          isAnimating ? 'scale-95 opacity-75' : 'hover:scale-105'
                        }`}
                      >
                        {isAnimating ? 'Starting...' : 'Start Writing'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Suggested Prompts */}
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700 mb-4">Or try one of these examples:</p>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {suggestedPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(prompt)}
                className="px-4 py-2 text-sm text-gray-600 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 transition-all duration-200 hover:shadow-md"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
