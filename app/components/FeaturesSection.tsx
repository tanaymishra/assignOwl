import React from 'react'
import { Brain, Clock, Target } from 'lucide-react'

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Why Choose <span className="gradient-text">assignOwl</span>?
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Discover the powerful features that make academic success effortless and enjoyable
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="group p-10 bg-gradient-to-br from-blue-50 to-white rounded-3xl border border-blue-100 hover:border-blue-200 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">AI-Powered Intelligence</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Advanced machine learning algorithms provide personalized assistance tailored to your unique learning style and academic requirements.
            </p>
          </div>

          <div className="group p-10 bg-gradient-to-br from-blue-50 to-white rounded-3xl border border-blue-100 hover:border-blue-200 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">24/7 Availability</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Get help whenever you need it. Our AI assistant is available around the clock to support your academic journey without interruption.
            </p>
          </div>

          <div className="group p-10 bg-gradient-to-br from-blue-50 to-white rounded-3xl border border-blue-100 hover:border-blue-200 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Precision Accuracy</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Get accurate, reliable assistance with advanced fact-checking and quality assurance built into every response and recommendation.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
