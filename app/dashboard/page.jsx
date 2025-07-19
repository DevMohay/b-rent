"use client";
import React from 'react';
import { useSession } from 'next-auth/react';
import SellerDashboard from '../seller/dashboard/page';
import AdminDashboard from '../admin/dashboard/page';

function Dashboard() {
  const { signOut } = require('next-auth/react');
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Please log in to access the dashboard.</div>;
  }

  const { user } = session;

  return (
    <div>
      <h1>Welcome to your Dashboard, {user.email}!</h1>
      <p>Your role: {user.role}</p>
      <button className='cursor-pointer bg-blue-500 text-white px-4 py-2 rounded' onClick={() => signOut()}>Sign Out</button>

      {user.role === 'admin' && (
        <div>
          <h2>Admin Panel</h2>
          <p>As an admin, you can manage all users and ads.</p>
          {/* Admin specific content and links */}
          <AdminDashboard/>
        </div>
      )}

      {user.role === 'seller' && (
        <div>
          <h2>Seller Panel</h2>
          <p>As a seller, you can post, update, and delete your ads.</p>
          {/* Seller specific content and links */}
          <SellerDashboard/>
        </div>
      )}

      {user.role === 'user' && (
        <div>
          <h2>User Dashboard</h2>
          <p>As a user, you can view ads.</p>
          {/* User specific content and links */}
        </div>
      )}
    </div>
  );
}

export default Dashboard;



