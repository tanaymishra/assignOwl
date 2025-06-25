import React from 'react'
import { BookOpen } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="py-16 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="flex items-center space-x-3 mb-6 md:mb-0">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">
              assignOwl
            </span>
          </div>

          <div className="flex items-center space-x-8 text-gray-600">
            <a href="#" className="hover:text-blue-600 transition-colors font-medium">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors font-medium">Terms of Service</a>
            <a href="#" className="hover:text-blue-600 transition-colors font-medium">Contact Us</a>
            <a href="#" className="hover:text-blue-600 transition-colors font-medium">Support</a>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            &copy; 2025 assignOwl. All rights reserved. Revolutionizing education through artificial intelligence.
          </p>
        </div>
      </div>
    </footer>
  )
}
