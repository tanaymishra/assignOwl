/**
 * Editor command utilities for rich text editing
 */

export const executeCommand = (
  command: string, 
  value: string = '', 
  editorRef: React.RefObject<HTMLDivElement>
): void => {
  document.execCommand(command, false, value)
  editorRef.current?.focus()
}

export const insertHeading = (
  level: number, 
  editorRef: React.RefObject<HTMLDivElement>
): void => {
  executeCommand('formatBlock', `h${level}`, editorRef)
}

export const isCommandActive = (command: string): boolean => {
  try {
    return document.queryCommandState(command)
  } catch {
    return false
  }
}

export const handleKeyboardShortcuts = (
  e: React.KeyboardEvent,
  onSave: () => void,
  editorRef: React.RefObject<HTMLDivElement>
): void => {
  if (e.ctrlKey || e.metaKey) {
    switch (e.key) {
      case 'b':
        e.preventDefault()
        executeCommand('bold', '', editorRef)
        break
      case 'i':
        e.preventDefault()
        executeCommand('italic', '', editorRef)
        break
      case 'u':
        e.preventDefault()
        executeCommand('underline', '', editorRef)
        break
      case 's':
        e.preventDefault()
        onSave()
        break
    }
  }
}

export const applyTextAlignment = (
  alignment: 'left' | 'center' | 'right' | 'justify',
  editorRef: React.RefObject<HTMLDivElement>
): void => {
  const commands = {
    left: 'justifyLeft',
    center: 'justifyCenter',
    right: 'justifyRight',
    justify: 'justifyFull'
  }
  
  executeCommand(commands[alignment], '', editorRef)
}

export const insertList = (
  type: 'ordered' | 'unordered',
  editorRef: React.RefObject<HTMLDivElement>
): void => {
  const command = type === 'ordered' ? 'insertOrderedList' : 'insertUnorderedList'
  executeCommand(command, '', editorRef)
}

export const formatBlock = (
  blockType: 'p' | 'blockquote' | 'pre',
  editorRef: React.RefObject<HTMLDivElement>
): void => {
  executeCommand('formatBlock', blockType, editorRef)
}
