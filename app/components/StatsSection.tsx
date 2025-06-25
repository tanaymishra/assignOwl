import React from 'react'

export default function StatsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Trusted by Students Worldwide
          </h2>
          <p className="text-base sm:text-lg text-gray-600">Join thousands who have transformed their academic experience</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-2">
            <div className="text-3xl sm:text-4xl font-bold gradient-text">
              25K+
            </div>
            <div className="text-gray-600 text-sm sm:text-base font-medium">Students Helped</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl sm:text-4xl font-bold gradient-text">
              98%
            </div>
            <div className="text-gray-600 text-sm sm:text-base font-medium">Success Rate</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl sm:text-4xl font-bold gradient-text">
              24/7
            </div>
            <div className="text-gray-600 text-sm sm:text-base font-medium">Support Available</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl sm:text-4xl font-bold gradient-text">
              100+
            </div>
            <div className="text-gray-600 text-sm sm:text-base font-medium">Subject Areas</div>
          </div>
        </div>
      </div>
    </section>
  )
}
