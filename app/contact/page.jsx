"use client";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full bg-white shadow-xl rounded-2xl p-8 md:p-12 grid md:grid-cols-2 gap-10">
        
        {/* Left Section - Contact Info */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-indigo-600">Get in Touch</h2>
          <p className="text-gray-600">
            Have questions or need help? Feel free to reach out anytime. 
            Our team will get back to you as soon as possible.
          </p>

          <div className="space-y-4 text-gray-700">
            <p className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-indigo-500 text-xl" /> Bogura, Bangladesh
            </p>
            <p className="flex items-center gap-3">
              <FaPhoneAlt className="text-indigo-500 text-xl" /> +880 1234 567 890
            </p>
            <p className="flex items-center gap-3">
              <FaEnvelope className="text-indigo-500 text-xl" /> support@brent.com
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mt-6">
            <a href="#" className="p-3 bg-indigo-100 rounded-full hover:bg-indigo-500 hover:text-white transition">
              <FaFacebook />
            </a>
            <a href="#" className="p-3 bg-indigo-100 rounded-full hover:bg-pink-500 hover:text-white transition">
              <FaInstagram />
            </a>
            <a href="#" className="p-3 bg-indigo-100 rounded-full hover:bg-blue-400 hover:text-white transition">
              <FaTwitter />
            </a>
          </div>
        </motion.div>

        {/* Right Section - Contact Form */}
        <motion.form
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <h3 className="text-2xl font-semibold text-gray-700">Send us a Message</h3>

          <div>
            <label className="block text-sm font-medium text-gray-600">Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Message</label>
            <textarea
              rows="4"
              placeholder="Write your message..."
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            ></textarea>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-indigo-600 text-white font-medium py-3 rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}
