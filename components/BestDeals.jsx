"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

function BestDeals() {
  const [ads, setAds] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const selectedCategory = searchParams.get("category") || "house";

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get("/api/ads");
        setAds(response.data);
      } catch (error) {
        console.error("Error fetching ads:", error);
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

  return (
    <section className="w-full px-4 py-8  ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold">Best Deals on</h2>
        <select
          onChange={handleCategoryChange}
          value={selectedCategory}
          className=" border  px-3 py-1 rounded bg-gray-100"
        >
          <option value="house">Houses</option>
          <option value="mess">Messes</option>
          <option value="shop">Shops</option>
          <option value="resturant">Restaurants</option>
          <option value="land">Lands</option>
          <option value="office">Office</option>
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredAds.map((ad) => (
          <Link key={ad._id} href={`/ads/${ad._id}`}>
            <div className="border rounded shadow hover:shadow-lg transition cursor-pointer">
              <img src={ad.images[0]} alt={ad.title} className="w-full h-32 object-cover" />
              <div className="p-2">
                <h3 className="text-sm font-semibold truncate">{ad.title}</h3>
                <p className="text-red-600 text-sm font-bold">৳{ad.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default BestDeals;
