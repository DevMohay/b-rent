"use client";
import React from "react";
import Link from "next/link";
import { FaFacebook,  FaSquareXTwitter, FaSquarePhone, FaYoutube } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { IoIosMailUnread } from "react-icons/io";
import { HiMiniMapPin } from "react-icons/hi2";
import { FiHome, FiInfo, FiPhone, FiSearch, FiHeart } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/", icon: <FiHome /> },
    { name: "About Us", href: "/about", icon: <FiInfo /> },
    { name: "Browse Ads", href: "/ads", icon: <FiSearch /> },
    { name: "Contact", href: "/contact", icon: <FiPhone /> },
  ];



  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-20 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 opacity-5 rounded-full blur-3xl -ml-48 -mt-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600 opacity-5 rounded-full blur-3xl -mr-48 -mb-48"></div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-black text-white">B</span>
                </div>
                <h2 className="text-3xl font-black text-white">B-Rent</h2>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Your trusted platform to find, rent, and manage properties in Bogura city. Making property search easier and faster.
              </p>
              
              {/* Newsletter */}
              <div className="mt-6">
                <h4 className="text-white font-semibold mb-3">📬 Subscribe to Newsletter</h4>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg">
                    Send
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-3 text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 group"
                    >
                      <span className="text-blue-500 group-hover:scale-110 transition-transform">
                        {link.icon}
                      </span>
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

           

            {/* Contact & Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-green-600 rounded-full"></span>
                Get In Touch
              </h3>
              
              {/* Contact Info */}
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 group">
                  <div className="mt-1 text-green-500 group-hover:scale-110 transition-transform">
                    <HiMiniMapPin size={20} />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Location</p>
                    <p className="text-sm text-gray-400">Bogura, Bangladesh</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="mt-1 text-blue-500 group-hover:scale-110 transition-transform">
                    <FaSquarePhone size={20} />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Phone</p>
                    <p className="text-sm text-gray-400">+880 1723993310</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="mt-1 text-purple-500 group-hover:scale-110 transition-transform">
                    <IoIosMailUnread size={20} />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Email</p>
                    <p className="text-sm text-gray-400">support@brent.com</p>
                  </div>
                </li>
              </ul>

              {/* Social Media */}
              <div>
                <h4 className="text-white font-semibold mb-4">Follow Us</h4>
                <div className="flex gap-3">
                  <motion.a
                    whileHover={{ scale: 1.1, y: -5 }}
                    href="#"
                    className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center text-white transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
                  >
                    <FaFacebook size={20} />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1, y: -5 }}
                    href="#"
                    className="w-12 h-12 bg-sky-500 hover:bg-sky-600 rounded-xl flex items-center justify-center text-white transition-all duration-300 shadow-lg hover:shadow-sky-500/50"
                  >
                    <FaSquareXTwitter size={20} />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1, y: -5 }}
                    href="#"
                    className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl flex items-center justify-center text-white transition-all duration-300 shadow-lg hover:shadow-pink-500/50"
                  >
                    <FaInstagramSquare />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1, y: -5 }}
                    href="#"
                    className="w-12 h-12 bg-red-600 hover:bg-red-700 rounded-xl flex items-center justify-center text-white transition-all duration-300 shadow-lg hover:shadow-red-500/50"
                  >
                    <FaYoutube size={20} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-400">
                © {currentYear} <span className="text-white font-semibold">B-Rent</span>. All rights reserved. Made with{" "}
                <FiHeart className="inline text-red-500" /> in MTBD STUDIO LTD.
              </p>
              <div className="flex items-center gap-6 text-sm">
                <Link href="/sitemap" className="text-gray-400 hover:text-white transition-colors">
                  Sitemap
                </Link>
                <Link href="/help" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </Link>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}