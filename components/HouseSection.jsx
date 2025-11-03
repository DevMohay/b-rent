'use client'
import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import Link from 'next/link';

function HouseSection() {
  const [houseAds, setHouseAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHouseSaleAds = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/ads?category=house');
        // Extract ads array from response (API now returns {ads, totalPages, currentPage})
        const data = response.data.ads || response.data;
        const houseForSaleAds = data.filter((ad) => ad.rentOrSale === 'rent');
        setHouseAds(houseForSaleAds);
      } catch (error) {
        console.error('Error fetching house for sale ads:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHouseSaleAds();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <section className="w-full py-12 bg-white rounded-xl shadow-sm my-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
            <span className="border-b-4 border-red-500 pb-1">Premium Houses</span>
            <span className="ml-2 bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">For Rent</span>
          </h2>
          <p className="text-gray-600 mt-2">Discover comfortable and luxurious houses for your next home</p>
        </div>

        {houseAds.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No houses available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {houseAds.map((ad) => (
              <Link key={ad._id} href={`/ads/${ad._id}`}>
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full border border-gray-100">
                  <div className="relative">
                    <img 
                      src={ad.images[0] || '/demo.jpeg'} 
                      alt={ad.title} 
                      className="w-full h-48 object-cover" 
                      onError={(e) => {e.target.src = '/demo.jpeg'}}
                    />
                    <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 m-2 rounded-lg text-sm font-medium">
                      For Rent
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{ad.title}</h3>
                    <div className="flex items-center mt-2 text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-xs">House</span>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <p className="text-red-600 font-bold text-xl">৳{ad.price?.toLocaleString() || 'N/A'}</p>
                      <span className="bg-red-50 text-red-700 px-2 py-1 rounded text-xs">View Details</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        <div className="mt-8 text-center">
          <Link href="/ads?category=house&rentOrSale=rent">
            <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 inline-flex items-center">
              View All Houses
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HouseSection;