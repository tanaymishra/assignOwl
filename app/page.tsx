import React from 'react'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import AdditionalFeaturesSection from './components/AdditionalFeaturesSection'
import StatsSection from './components/StatsSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <AdditionalFeaturesSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  )
}