"use client";
import React, { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import Link from "next/link";

function AllAd() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/ads");
        // Extract ads array from response (API now returns {ads, totalPages, currentPage})
        const adsArray = response.data.ads || response.data;
        // Sort ads by creation date, newest first
        const sortedAds = adsArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setAds(sortedAds);
      } catch (error) {
        console.error("Error fetching ads:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <section className="w-full py-12 bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-sm my-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              <span className="border-b-4 border-red-500 pb-1">Latest Properties</span>
            </h2>
            <p className="text-gray-600 mt-2">Browse our most recent listings across all categories</p>
          </div>
          
          <Link href="/ads">
            <button className="mt-4 md:mt-0 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-medium py-2 px-4 rounded-lg transition-colors duration-300 inline-flex items-center">
              View All
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </Link>
        </div>

        {ads.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No properties available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ads.map((ad) => (
              <Link key={ad._id} href={`/ads/${ad._id}`}>
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full">
                  <div className="relative">
                    <img 
                      src={ad.images[0] || '/demo.jpeg'} 
                      alt={ad.title} 
                      className="w-full h-48 object-cover" 
                      onError={(e) => {e.target.src = '/demo.jpeg'}}
                    />
                    {ad.rentOrSale && (
                      <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white px-3 py-1 m-2 rounded-lg text-xs">
                        For {ad.rentOrSale === 'rent' ? 'Rent' : 'Sale'}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{ad.title}</h3>
                    <div className="flex items-center mt-2 text-gray-500">
                      <span className="capitalize bg-gray-100 rounded-full px-3 py-1 text-xs">{ad.category}</span>
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
      </div>
    </section>
  );
}

export default AllAd;
