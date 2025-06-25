import React from 'react'
import { BookOpen } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="py-12 bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <Image src={'/logo.svg'} alt='AssignOwl' width={120} height={40} />

          </div>

          <div className="flex flex-wrap items-center justify-center space-x-4 sm:space-x-6 text-gray-300 text-sm">
            <a href="#" className="hover:text-green-400 transition-colors font-medium">Privacy Policy</a>
            <a href="#" className="hover:text-green-400 transition-colors font-medium">Terms of Service</a>
            <a href="#" className="hover:text-green-400 transition-colors font-medium">Contact Us</a>
            <a href="#" className="hover:text-green-400 transition-colors font-medium">Support</a>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2025 assignOwl. All rights reserved. Revolutionizing education through artificial intelligence.
          </p>
        </div>
      </div>
    </footer>
  )
}
