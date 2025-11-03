"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axiosInstance from '../../../utils/axiosInstance';
import Link from 'next/link';
import Image from 'next/image';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { FiMessageCircle } from 'react-icons/fi';

export default function SellerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentAd, setCurrentAd] = useState(null);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchAds();
    } else if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [session, status, router]);

  const fetchAds = async () => {
    try {
      setLoading(true);
      // Fetch ads with message counts
      const [adsResponse, messagesResponse] = await Promise.all([
         axiosInstance.get('/ads?seller=me'),
         axiosInstance.get('/messages')
        ]);
      
      // Extract ads array from response (API now returns {ads, totalPages, currentPage})
      const adsData = adsResponse.data.ads || adsResponse.data;
      
      // Merge ads with message counts
      const adsWithMessages = adsData.map(ad => {
        const messageData = messagesResponse.data.ads?.find(msgAd => msgAd._id === ad._id);
        return {
          ...ad,
          messageCount: messageData?.messageCount || 0,
          unreadCount: messageData?.unreadCount || 0
        };
      });
      
      setAds(adsWithMessages);
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

  const handleEdit = (ad) => {
    router.push(`/post-ad?edit=${ad._id}`);
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
      <div className="flex items-center gap-4 mb-6">
        <Link href='/' className="text-blue-500 hover:underline">
          Home
        </Link>
        <Link href="/post-ad" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          Post a New Ad
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Your Ads</h2>
        {ads.length === 0 ? (
          <p className="text-gray-500">You haven't posted any ads yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 border-b text-left">Image</th>
                  <th className="py-3 px-4 border-b text-left">Title</th>
                  <th className="py-3 px-4 border-b text-left">Category</th>
                  <th className="py-3 px-4 border-b text-left">Price</th>
                  <th className="py-3 px-4 border-b text-left">Status</th>
                  <th className="py-3 px-4 border-b text-left">Messages</th>
                  <th className="py-3 px-4 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {ads.map((ad) => (
                  <tr key={ad._id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">
                      {ad.images && ad.images.length > 0 ? (
                        <div className="w-16 h-16 relative">
                          <Image 
                            src={ad.images[0]} 
                            alt={ad.title}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 border-b font-medium">{ad.title}</td>
                    <td className="py-3 px-4 border-b">{ad.category}</td>
                    <td className="py-3 px-4 border-b">{ad.price}</td>
                    <td className="py-3 px-4 border-b">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        ad.status === 'approved' ? 'bg-green-100 text-green-800' :
                        ad.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {ad.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 border-b">
                      <Link 
                        href={`/messages/${ad._id}`}
                        className="flex items-center space-x-2 text-blue-500 hover:text-blue-700"
                        title="View Messages"
                      >
                        <div className="relative">
                          <FiMessageCircle size={20} />
                          {ad.messageCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                              {ad.messageCount > 99 ? '99+' : ad.messageCount}
                            </span>
                          )}
                        </div>
                      </Link>
                    </td>
                    <td className="py-3 px-4 border-b">
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => handleEdit(ad)} 
                          className="text-blue-500 hover:text-blue-700"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <Link 
                          href={`/ads/${ad._id}`}
                          className="text-green-500 hover:text-green-700"
                          title="View"
                        >
                          <FaEye />
                        </Link>
                        <button 
                          onClick={() => handleDelete(ad._id)} 
                          className="text-red-500 hover:text-red-700"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}