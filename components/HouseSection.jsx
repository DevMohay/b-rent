'use client'
import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import Link from 'next/link';

function HouseSection() {
  const [houseAds, setHouseAds] = useState([]);

  useEffect(() => {
    const fetchHouseSaleAds = async () => {
      try {
        const response = await axios.get('/ads?category=house');
        const houseForSaleAds = response.data.filter((ad) => ad.rentOrSale === 'rent');
        setHouseAds(houseForSaleAds);
      } catch (error) {
        console.error('Error fetching house for sale ads:', error);
      }
    };
    fetchHouseSaleAds();
  }, []);

  return (
    <section className="w-full px-4 py-8 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold">Houses for Sale</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {houseAds.map((ad) => (
          <Link key={ad._id} href={`/ads/${ad._id}`}>
            <div className="border rounded shadow hover:shadow-lg transition  cursor-pointer">
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

export default HouseSection;