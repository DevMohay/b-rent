"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import Image from "next/image";
import { FiHome, FiInfo, FiPhone, FiMenu, FiX, FiLogOut, FiUser, FiHeart } from "react-icons/fi";

function Navbar() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const user = session?.user;

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo with Animation */}
        <Link href="/">
          <span className="font-extrabold text-3xl text-white cursor-pointer hover:scale-105 transition-transform duration-300 drop-shadow-lg flex items-center gap-2">
            <span className="bg-white text-blue-600 px-2 py-1 rounded-lg">B</span>
            <span>Rent</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-white font-medium hover:text-yellow-300 transition-all duration-300 hover:scale-110"
          >
            <FiHome className="text-xl" /> 
            <span>Home</span>
          </Link>
          <Link 
            href="/about" 
            className="flex items-center gap-2 text-white font-medium hover:text-yellow-300 transition-all duration-300 hover:scale-110"
          >
            <FiInfo className="text-xl" /> 
            <span>About</span>
          </Link>
          <Link 
            href="/contact" 
            className="flex items-center gap-2 text-white font-medium hover:text-yellow-300 transition-all duration-300 hover:scale-110"
          >
            <FiPhone className="text-xl" /> 
            <span>Contact</span>
          </Link>
          <Link 
            href="/wishlists" 
            className="flex items-center gap-2 text-white font-medium hover:text-yellow-300 transition-all duration-300 hover:scale-110"
          >
            <FiHeart className="text-xl" /> 
            <span>Wishlists</span>
          </Link>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex gap-4 items-center">
          {status === "authenticated" && user ? (
            <>
              <Link href="/dashboard" className="hover:scale-105 transition-transform duration-300">
                
                  <Image
                     src={user.profilePicture || user.image || "/favicon.ico"}
                    alt="Profile Picture"
                    width={45}
                    height={45}
                    className="rounded-full cursor-pointer  shadow-lg  transition-all"
                  />
                
                
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/auth/login" })}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <FiLogOut />
                Logout
              </button>
            </>
          ) : (
            <Link href="/auth/login">
              <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
                <FiUser />
                Login / Signup
              </button>
            </Link>
          )}

          <Link href="/post-ad">
            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-6 py-2.5 rounded-lg font-bold shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 animate-pulse">
               Post Ad Free 
               <span className="text-2xl ">📢</span>
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl text-white hover:text-yellow-300 transition-colors duration-300"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown with Smooth Animation */}
      {menuOpen && (
        <div className="md:hidden bg-gradient-to-b from-blue-700 to-indigo-800 border-t border-blue-500 px-6 py-6 space-y-4 animate-slideDown shadow-xl">
          <Link
            href="/"
            className="flex items-center gap-3 text-white font-medium hover:text-yellow-300 transition-all duration-300 py-2 px-3 rounded-lg hover:bg-blue-600"
            onClick={() => setMenuOpen(false)}
          >
            <FiHome className="text-xl" /> Home
          </Link>
          <Link
            href="/about"
            className="flex items-center gap-3 text-white font-medium hover:text-yellow-300 transition-all duration-300 py-2 px-3 rounded-lg hover:bg-blue-600"
            onClick={() => setMenuOpen(false)}
          >
            <FiInfo className="text-xl" /> About
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-3 text-white font-medium hover:text-yellow-300 transition-all duration-300 py-2 px-3 rounded-lg hover:bg-blue-600"
            onClick={() => setMenuOpen(false)}
          >
            <FiPhone className="text-xl" /> Contact
          </Link>
          <Link
            href="/wishlists"
            className="flex items-center gap-3 text-white font-medium hover:text-yellow-300 transition-all duration-300 py-2 px-3 rounded-lg hover:bg-blue-600"
            onClick={() => setMenuOpen(false)}
          >
            <FiHeart className="text-xl" /> Wishlists
          </Link>

          <div className="flex flex-col gap-3 mt-6 pt-4 border-t border-blue-500">
            {status === "authenticated" ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 text-white font-medium bg-blue-600 hover:bg-blue-500 py-3 px-4 rounded-lg transition-all duration-300"
                >
                  <FiUser className="text-xl" /> Dashboard
                </Link>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    signOut({ callbackUrl: "/auth/login" });
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-semibold shadow-md transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FiLogOut />
                  Logout
                </button>
              </>
            ) : (
              <Link href="/auth/login" onClick={() => setMenuOpen(false)}>
                <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-3 rounded-lg w-full font-semibold shadow-md transition-all duration-300 flex items-center justify-center gap-2">
                  <FiUser />
                  Login / Signup
                </button>
              </Link>
            )}

            <Link href="/post-ad" onClick={() => setMenuOpen(false)}>
              <button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-4 py-3 rounded-lg w-full font-bold shadow-md transition-all duration-300">
                📢 Post Ad Free
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;