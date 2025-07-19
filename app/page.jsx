'use client'
import SearchComponents from '../components/SearchComponents'
import Navbar from '../components/Navbar'
import React, { use } from 'react'
import HeroSection from '../components/HeroSection'
import Categories from '../components/Categories'
import BestDeals from '../components/BestDeals'
import HouseSection from '../components/HouseSection'
import LoginPage from './auth/login/page'
import FeaturedAds from '../components/FeaturedAds'
import AllAd from '../components/AllAd'

function page() {
  return (
    
    <div className='p-4'>
      <Navbar/>
      <SearchComponents/>
      <HeroSection/> 
      <Categories/>
      <FeaturedAds />
      <BestDeals/>
      <HouseSection/>
      <AllAd/>
    </div>
  )
}

export default page