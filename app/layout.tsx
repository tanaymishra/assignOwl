import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'
import ModalProvider from './components/ModalProvider'
import LoginComp from './components/loginModal/login'
import { ThemeProvider } from './contexts/ThemeContext'

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
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script 
          src="https://accounts.google.com/gsi/client" 
          async 
          defer
        ></script>
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <ThemeProvider>
          {children}
          <ModalProvider />
          <LoginComp />
        </ThemeProvider>
      </body>
    </html>
  )
}