import React from 'react'
import Header from './landing/Header'
import HeroSection from './landing/HeroSection'
import HowItWorks from './landing/HotItWorks'
import PricingSection from './landing/PricingSection'
import FooterSection from './landing/FooterSection'

const LandingPage = () => {
  return (
    <div>
      <Header/>
      <HeroSection/>
      <HowItWorks/>
      <PricingSection/>
      <FooterSection/>
    </div>
  )
}

export default LandingPage