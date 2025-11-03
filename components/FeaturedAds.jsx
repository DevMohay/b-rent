


// components/FeaturedAds.jsx
"use client";
import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import Link from "next/link";

export default function FeaturedAds() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedAds = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/ads?featured=true");
        // Extract ads array from response (API now returns {ads, totalPages, currentPage})
        setAds(response.data.ads || response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch featured ads.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedAds();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10 p-4 bg-red-50 rounded-lg">{error}</div>;
  }

  if (ads.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-12 bg-gradient-to-r from-gray-50 to-white rounded-xl shadow-sm my-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              <span className="border-b-4 border-green-500 pb-1">Featured</span> Properties
            </h2>
            <p className="text-gray-600 mt-2">Exclusive properties handpicked for you</p>
          </div>
          <Link 
            href="/ads?featured=true" 
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
          >
            View All
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>

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
                  <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 m-2 rounded-lg text-sm font-medium">
                    Featured
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{ad.title}</h3>
                  </div>
                  <div className="flex items-center mt-2 text-gray-500">
                    <span className="capitalize bg-gray-100 rounded-full px-3 py-1 text-xs">{ad.category}</span>
                    <span className="mx-2">•</span>
                    <span className="text-xs">{ad.rentOrSale === 'rent' ? 'For Rent' : 'For Sale'}</span>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-green-600 font-bold text-xl">৳{ad.price.toLocaleString()}</p>
                    <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs">View Details</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
