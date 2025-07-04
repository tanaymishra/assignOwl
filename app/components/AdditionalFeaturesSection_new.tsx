import React from 'react'
import { Shield, TrendingUp, Users, Zap, Binoculars } from 'lucide-react';

export default function AdditionalFeaturesSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              For Modern Students of <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">Tomorrow </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Our platform combines cutting-edge AI technology with intuitive design to deliver an unparalleled academic experience.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">Trained on Real Assignments</h3>
                  <p className="text-gray-600 text-sm">We've fine-tuned our AI using thousands of actual, high-quality student submissions—so it understands what works, not just what sounds good.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">Smarter Prompts, Better Outputs</h3>
                  <p className="text-gray-600 text-sm">No more trial and error. AssignOwl guides you with context-aware prompt suggestions to help you get the best possible results on the first try.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">Up to 80% of the Work—Handled</h3>
                  <p className="text-gray-600 text-sm">From research structuring to citations and formatting, AssignOwl can complete up to 80% of your assignment with precision. You just polish and submit.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">Built for Accuracy, Not Just Answers</h3>
                  <p className="text-gray-600 text-sm">While generic AIs guess, AssignOwl delivers focused, relevant responses based on fine-tuned academic patterns and requirements.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="w-full h-80 bg-gradient-to-br from-green-50/40 to-green-100/30 rounded-3xl backdrop-blur-sm border border-green-200/40 shadow-xl">
              <div className="p-6 h-full flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="space-y-2 flex flex-col items-center">
                    <div className="w-15 h-12 bg-green-100/60 rounded-lg flex items-center justify-center border border-green-200/50">
                      <Binoculars className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">Works, not just looks</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl sm:text-3xl font-bold text-green-600">5x</div>
                    <div className="text-xs sm:text-sm text-gray-600">Faster Output</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl sm:text-3xl font-bold text-green-600">80%</div>
                    <div className="text-xs sm:text-sm text-gray-600">Work Handled</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl sm:text-3xl font-bold text-green-600">99%</div>
                    <div className="text-xs sm:text-sm text-gray-600">Satisfaction</div>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <div className="w-12 h-12 bg-green-100/60 rounded-xl flex items-center justify-center mx-auto shadow-lg animate-pulse border border-green-200/50">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-green-700 font-semibold text-sm mt-2">Powered by Advanced AI</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
