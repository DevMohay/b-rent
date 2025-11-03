'use client'
import SearchComponents from '../components/SearchComponents'
import React from 'react'

import BestDeals from '../components/BestDeals'
import HouseSection from '../components/HouseSection'
import FeaturedAds from '../components/FeaturedAds'
import AllAd from '../components/AllAd'

function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      
      <main className="container mx-auto px:0 md:px:2 lg:px-4 py-4">
        <div className="mb-4 md:mb-6">
          <SearchComponents />
        </div>
        

        
        <div className="my-8 animate-slide-up">
          <FeaturedAds />
        </div>
        
        <div className="my-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
          <BestDeals />
        </div>
        
        <div className="my-8 animate-slide-up" style={{animationDelay: '0.3s'}}>
          <HouseSection />
        </div>
        
        <div className="my-12 animate-slide-up" style={{animationDelay: '0.4s'}}>
          <AllAd />
        </div>
      </main>
    </div>
  )
}

export default Page