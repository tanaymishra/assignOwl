import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ModalProvider from './components/ModalProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AssignOwl - AI-Powered Assignment Assistant',
  description: 'Transform your academic journey with our AI-powered platform. Get personalized help, instant feedback, and expert guidance for all your assignments.',
  keywords: 'AI, assignment help, academic assistance, homework help, study assistant',
  authors: [{ name: 'AssignOwl Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ModalProvider />
      </body>
    </html>
  )
}