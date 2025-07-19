


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
        setAds(response.data);
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
    return <div className="flex justify-center items-center h-40 ">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  if (ads.length === 0) {
    return null;
  }

  return (
     <section className="w-full px-4 py-8 bg-white ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold ">Featured Ads</h2>
        <Link href="/ads?featured=true" className="text-green-600 hover:underline">SEE ALL</Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {ads.map((ad) => (
          <Link key={ad._id} href={`/ads/${ad._id}`}>
            <div className="border rounded shadow hover:shadow-lg transition cursor-pointer">
              <img src={ad.images[0]} alt={ad.title} className="w-full h-32 object-cover" />
              <div className="p-2">
                <h3 className="text-sm font-semibold truncate">{ad.title}</h3>
                <p className="text-gray-400 text-xs">{ad.category}</p>
                <p className="text-green-600 font-bold">৳{ad.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
