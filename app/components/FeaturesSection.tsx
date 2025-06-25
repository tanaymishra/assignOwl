import React from 'react'
import { Brain, Clock, Target } from 'lucide-react'

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose <span className="gradient-text">assignOwl</span>?
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Discover the powerful features that make academic success effortless and enjoyable
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="group p-6 bg-gradient-to-br from-blue-50 to-white rounded-3xl border border-blue-100 hover:border-blue-200 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">AI-Powered Intelligence</h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Advanced machine learning algorithms provide personalized assistance tailored to your unique learning style and academic requirements.
            </p>
          </div>

          <div className="group p-6 bg-gradient-to-br from-blue-50 to-white rounded-3xl border border-blue-100 hover:border-blue-200 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">24/7 Availability</h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Get help whenever you need it. Our AI assistant is available around the clock to support your academic journey without interruption.
            </p>
          </div>

          <div className="group p-6 bg-gradient-to-br from-blue-50 to-white rounded-3xl border border-blue-100 hover:border-blue-200 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Precision Accuracy</h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Get accurate, reliable assistance with advanced fact-checking and quality assurance built into every response and recommendation.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
