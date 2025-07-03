# Modal Component

A generic, reusable modal component built with React and TypeScript.

## Features

- **Backdrop click to close** (configurable)
- **ESC key to close**
- **Customizable sizes** (sm, md, lg, xl)
- **Optional close button**
- **Smooth animations** (fade in/slide up)
- **Body scroll lock** when open
- **Fully accessible** with ARIA labels
- **White theme** styled for the application

## Usage

```tsx
import { Modal } from '@/app/components/Modal'
import { useState } from 'react'

const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open Modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        maxWidth="md"
        showCloseButton={true}
        closeOnBackdropClick={true}
      >
        <div style={{ padding: '2rem' }}>
          <h2>Modal Title</h2>
          <p>Modal content goes here...</p>
        </div>
      </Modal>
    </>
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | - | Controls whether the modal is visible |
| `onClose` | `() => void` | - | Callback when modal should close |
| `children` | `React.ReactNode` | - | Content to display inside the modal |
| `maxWidth` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Maximum width of the modal |
| `showCloseButton` | `boolean` | `true` | Whether to show the X close button |
| `closeOnBackdropClick` | `boolean` | `true` | Whether clicking backdrop closes modal |
| `className` | `string` | `''` | Additional CSS class for the modal |

## Size Options

- **sm**: 384px (24rem)
- **md**: 448px (28rem) 
- **lg**: 512px (32rem)
- **xl**: 672px (42rem)

## Accessibility

- Automatically focuses on modal when opened
- ESC key closes the modal
- Body scroll is locked when modal is open
- Proper ARIA labels for screen readers

## Examples

See `ExampleModal.tsx` for a complete usage example.

## Styling

The modal uses CSS modules. You can customize the appearance by:

1. Adding a `className` prop
2. Modifying `Modal.module.scss`
3. Using CSS custom properties for theming
