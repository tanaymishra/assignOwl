import React from 'react'
import { Shield, TrendingUp, Users, Zap } from 'lucide-react'

export default function AdditionalFeaturesSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-gray-900">
              Advanced Features for <span className="gradient-text">Modern Students</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Our platform combines cutting-edge AI technology with intuitive design to deliver an unparalleled academic experience.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
                  <p className="text-gray-600">Your data and assignments are protected with enterprise-grade security measures.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Progress Tracking</h3>
                  <p className="text-gray-600">Monitor your academic improvement with detailed analytics and insights.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Collaborative Learning</h3>
                  <p className="text-gray-600">Connect with peers and share knowledge in a supportive environment.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center shadow-2xl">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-lg animate-float">
                  <Zap className="w-12 h-12 text-blue-600" />
                </div>
                <p className="text-blue-700 font-semibold text-lg">AI-Powered Platform</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
