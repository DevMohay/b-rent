"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "../../utils/axiosInstance";

export default function WishlistsPage() {
  const { status } = useSession();
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
      return;
    }
    const fetchWishlist = async () => {
      try {
        const res = await axios.get("/wishlist");
        setItems(res.data || []);
      } catch (e) {
        setError("Failed to load wishlist.");
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [status, router]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Wishlists</h1>
      {items.length === 0 ? (
        <p className="text-gray-600">No items in wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((ad) => (
            <div key={ad._id} className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
              <Link href={`/ads/${ad._id}`}>
                <div className="relative w-full h-48">
                  <Image
                    src={ad.images?.[0] || "/favicon.ico"}
                    alt={ad.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>
              <div className="p-4">
                <Link href={`/ads/${ad._id}`} className="block">
                  <h2 className="text-lg font-semibold mb-2 line-clamp-2">{ad.title}</h2>
                </Link>
                <p className="text-gray-800 font-bold">৳{ad.price?.toLocaleString() || ad.price}</p>
                <p className="text-sm text-gray-500 capitalize">{ad.category} • {ad.rentOrSale}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}