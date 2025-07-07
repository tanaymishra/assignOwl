/**
 * HTML cleaning and formatting utilities for the rich text editor
 */

export const cleanHtml = (html: string): string => {
  // Remove extra spaces, normalize line breaks, and clean up formatting
  return html
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/>\s+</g, '><') // Remove spaces between tags
    .replace(/<div><br><\/div>/g, '<br>') // Replace empty divs with br
    .replace(/<div>/g, '<p>') // Convert divs to paragraphs
    .replace(/<\/div>/g, '</p>')
    .replace(/<br\s*\/?>\s*<br\s*\/?>/g, '</p><p>') // Convert double br to paragraph breaks
    .replace(/<p>\s*<\/p>/g, '') // Remove empty paragraphs
    .replace(/(<p[^>]*>)\s*/g, '$1') // Remove leading spaces in paragraphs
    .replace(/\s*(<\/p>)/g, '$1') // Remove trailing spaces in paragraphs
    .replace(/<font[^>]*>/g, '') // Remove font tags
    .replace(/<\/font>/g, '') // Remove closing font tags
    .replace(/<span[^>]*>\s*<\/span>/g, '') // Remove empty spans
    .trim()
}

export const normalizeContent = (editorRef: React.RefObject<HTMLDivElement>): void => {
  if (!editorRef.current) return

  const selection = window.getSelection()
  const range = selection?.getRangeAt(0)
  if (range) {
    // Normalize the content around the cursor
    const container = range.commonAncestorContainer
    if (container.nodeType === Node.TEXT_NODE && container.parentElement) {
      const parent = container.parentElement
      parent.normalize()
    }
  }
}

export const restoreCursorPosition = (): void => {
  const selection = window.getSelection()
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0)
    range.collapse(false)
    selection.removeAllRanges()
    selection.addRange(range)
  }
}

export const hasNestedElements = (content: string): boolean => {
  return content.includes('<div><div>') || content.includes('<span><span>')
}
