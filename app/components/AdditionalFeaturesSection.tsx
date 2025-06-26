import React from 'react'
import { Shield, TrendingUp, Users, Zap } from 'lucide-react'

export default function AdditionalFeaturesSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
              For Modern Students of <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">Tommorow </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Our platform combines cutting-edge AI technology with intuitive design to deliver an unparalleled academic experience.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-900 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1">Secure & Private</h3>
                  <p className="text-gray-300 text-sm">Your data and assignments are protected with enterprise-grade security measures.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-900 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1">Progress Tracking</h3>
                  <p className="text-gray-300 text-sm">Monitor your academic improvement with detailed analytics and insights.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-900 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1">Collaborative Learning</h3>
                  <p className="text-gray-300 text-sm">Connect with peers and share knowledge in a supportive environment.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="w-full h-80 bg-gradient-to-br from-green-900 to-green-950 rounded-3xl flex items-center justify-center shadow-2xl">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto shadow-lg animate-float">
                  <Zap className="w-8 h-8 text-green-400" />
                </div>
                <p className="text-green-300 font-semibold text-base">AI-Powered Platform</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
