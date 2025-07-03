import React from 'react'
import { Brain, Clock, Target } from 'lucide-react'

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">assignOwl</span>?
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Discover the powerful features that make academic success effortless and enjoyable
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="group p-6 bg-white rounded-3xl border border-gray-200 hover:border-green-300 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-green-500/25 transition-all duration-300">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Crafted from Real Student Work</h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Trained on thousands of actual quality assignments of different universities to understand exactly what educators expect.
            </p>
          </div>

          <div className="group p-6 bg-white rounded-3xl border border-gray-200 hover:border-green-300 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-green-500/25 transition-all duration-300">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Context‑Aware Assistance</h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Our model knows your assignment structure, citation style, formatting needs,research sources, and more.
            </p>
          </div>

          <div className="group p-6 bg-white rounded-3xl border border-gray-200 hover:border-green-300 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-green-500/25 transition-all duration-300">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Beyond Generic LLMs</h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Fine‑tuned to excel in academic tasks-assignment help and exam prep, unlike out-of-the-box models like Grok, Claude, or ChatGPT.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
