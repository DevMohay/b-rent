"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axiosInstance from '../../../utils/axiosInstance';
import Link from 'next/link';

export default function SellerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role === 'seller') {
      fetchAds();
    } else if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (status === 'authenticated' && session?.user?.role !== 'seller') {
        router.push('/unauthorized');
    }
  }, [session, status, router]);

  const fetchAds = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/ads?seller=me');
      setAds(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch ads.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this ad?')) {
      try {
        await axiosInstance.delete(`/ads/${id}`);
        setAds(ads.filter((ad) => ad._id !== id));
      } catch (err) {
        setError('Failed to delete ad.');
      }
    }
  };

  if (loading || status === 'loading') {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Seller Dashboard</h1>
      <Link href='/'>Home</Link>
      <Link href="/seller/post-ad" className="bg-blue-500 text-white py-2 px-4 rounded mb-4 inline-block">
        Post a New Ad
      </Link>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-black">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr key={ad._id}>
                <td className="py-2 px-4 border-b">{ad.title}</td>
                <td className="py-2 px-4 border-b">{ad.category}</td>
                <td className="py-2 px-4 border-b">{ad.price}</td>
                <td className="py-2 px-4 border-b">{ad.status}</td>
                <td className="py-2 px-4 border-b">
                  
                  <button onClick={() => handleDelete(ad._id)} className="text-red-500">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}