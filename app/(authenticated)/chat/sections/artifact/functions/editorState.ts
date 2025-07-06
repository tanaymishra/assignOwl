/**
 * Animation and state management utilities for the editor
 */

export interface EditorAnimationState {
  isEditing: boolean
  showEditor: boolean
  isClosing: boolean
}

export const createAnimationHandlers = (
  setState: React.Dispatch<React.SetStateAction<EditorAnimationState>>,
  onClose: () => void
) => {
  const handleClose = () => {
    setState(prev => ({
      ...prev,
      isClosing: true,
      showEditor: false
    }))
    
    // Delay the actual close to allow animation
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        isEditing: false,
        isClosing: false
      }))
      onClose()
    }, 300) // Match animation duration
  }

  const initializeEditor = () => {
    // Trigger opening animation on mount
    const timer = setTimeout(() => {
      setState(prev => ({
        ...prev,
        showEditor: true
      }))
    }, 50) // Small delay to ensure animation triggers
    
    return () => clearTimeout(timer)
  }

  return {
    handleClose,
    initializeEditor
  }
}

export const createEditorHandlers = (
  editorRef: React.RefObject<HTMLDivElement>,
  onSave: (content: string) => void,
  cleanHtml: (html: string) => string,
  handleClose: () => void
) => {
  const handleSave = () => {
    if (editorRef.current) {
      // Clean up the content by removing extra spaces and normalizing HTML
      const cleanContent = cleanHtml(editorRef.current.innerHTML)
      onSave(cleanContent)
    }
    handleClose() // Use animated close
  }

  const handleInput = () => {
    if (editorRef.current) {
      // Prevent excessive nested elements and clean up on input
      const content = editorRef.current.innerHTML
      if (content.includes('<div><div>') || content.includes('<span><span>')) {
        editorRef.current.innerHTML = cleanHtml(content)
        
        // Restore cursor position
        const selection = window.getSelection()
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0)
          range.collapse(false)
          selection.removeAllRanges()
          selection.addRange(range)
        }
      }
    }
  }

  return {
    handleSave,
    handleInput
  }
}
