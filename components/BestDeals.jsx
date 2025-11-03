"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

function BestDeals() {
  const [ads, setAds] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const selectedCategory = searchParams.get("category") || "house";

  useEffect(() => {
    const fetchAds = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/ads?featured=true");
        // Extract ads array from response (API now returns {ads, totalPages, currentPage})
        setAds(response.data.ads || response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching featured ads:", error);
        setLoading(false);
      }
    };
    fetchAds();
  }, []);

  useEffect(() => {
    const filtered = ads.filter((ad) => ad.category === selectedCategory);
    setFilteredAds(filtered);
  }, [ads, selectedCategory]);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    router.push(`${pathname}?category=${category}`, { scroll: false });
  };

  // Category options with icons
  const categoryOptions = [
    { value: "house", label: "Houses", icon: "🏠" },
    { value: "mess", label: "Messes", icon: "🏘️" },
    { value: "shop", label: "Shops", icon: "🏪" },
    { value: "resturant", label: "Restaurants", icon: "🍽️" },
    { value: "land", label: "Lands", icon: "🏞️" },
    { value: "office", label: "Offices", icon: "🏢" }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <section className="w-full py-12 bg-gradient-to-r from-gray-50 to-white rounded-xl shadow-sm my-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              <span className="border-b-4 border-red-500 pb-1">Best Deals</span> on {categoryOptions.find(cat => cat.value === selectedCategory)?.label}
            </h2>
            <p className="text-gray-600 mt-2">Discover the most attractive offers in our marketplace</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <div className="relative inline-block">
              <select
                onChange={handleCategoryChange}
                value={selectedCategory}
                className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                {categoryOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.icon} {option.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {filteredAds.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No deals available for this category at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAds.map((ad) => (
              <Link key={ad._id} href={`/ads/${ad._id}`}>
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full">
                  <div className="relative">
                    <img 
                      src={ad.images[0] || '/demo.jpeg'} 
                      alt={ad.title} 
                      className="w-full h-48 object-cover" 
                      onError={(e) => {e.target.src = '/demo.jpeg'}}
                    />
                    <div className="absolute top-0 left-0 bg-red-500 text-white px-3 py-1 m-2 rounded-lg text-sm font-medium">
                      Best Deal
                    </div>
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

export default BestDeals;
