"use client";
import React, { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import Link from "next/link";

function AllAd() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get("/ads");
        // Sort ads by creation date, newest first
        const sortedAds = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setAds(sortedAds);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };
    fetchAds();
  }, []);

  return (
    <section className="w-full px-4 py-8 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold dark:text-white">All Ads</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {ads.map((ad) => (
          <Link key={ad._id} href={`/ads/${ad._id}`}>
            <div className="border rounded shadow hover:shadow-lg transition cursor-pointer">
              <img src={ad.images[0]} alt={ad.title} className="w-full h-32 object-cover" />
              <div className="p-2">
                <h3 className="text-sm font-semibold truncate text-white">{ad.title}</h3>
                <p className="text-red-600 text-sm font-bold">৳{ad.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default AllAd;
