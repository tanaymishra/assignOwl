import React from 'react'

export default function StatsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Students Worldwide
          </h2>
          <p className="text-xl text-gray-600">Join thousands who have transformed their academic experience</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div className="space-y-4">
            <div className="text-5xl font-bold gradient-text">
              25K+
            </div>
            <div className="text-gray-600 text-lg font-medium">Students Helped</div>
          </div>
          <div className="space-y-4">
            <div className="text-5xl font-bold gradient-text">
              98%
            </div>
            <div className="text-gray-600 text-lg font-medium">Success Rate</div>
          </div>
          <div className="space-y-4">
            <div className="text-5xl font-bold gradient-text">
              24/7
            </div>
            <div className="text-gray-600 text-lg font-medium">Support Available</div>
          </div>
          <div className="space-y-4">
            <div className="text-5xl font-bold gradient-text">
              100+
            </div>
            <div className="text-gray-600 text-lg font-medium">Subject Areas</div>
          </div>
        </div>
      </div>
    </section>
  )
}
