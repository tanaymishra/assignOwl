'use client';

import React from 'react'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import AssignmentInputSection from './components/AssignmentInputSection'
import FeaturesSection from './components/FeaturesSection'
import AdditionalFeaturesSection from './components/AdditionalFeaturesSection'
import StatsSection from './components/StatsSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <AssignmentInputSection />
      <FeaturesSection />
      <AdditionalFeaturesSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  )
}