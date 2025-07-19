"use client";

import { useState, useEffect } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaLinkedin,
} from "react-icons/fa";
import { FiCopy } from "react-icons/fi";

export default function Share({ ad }) {
  const [currentUrl, setCurrentUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const shareText = `Check out this ${ad.category} for ${ad.rentOrSale}!`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  if (!currentUrl) {
    return null; // Don't render anything on the server or before url is ready
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mt-4">
      <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-gray-800">
        Share this Ad
      </h2>
      <div className="flex items-center justify-around gap-4">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            currentUrl
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 transition-colors"
          aria-label="Share on Facebook"
        >
          <FaFacebook size={32} />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
            currentUrl
          )}&text=${encodeURIComponent(shareText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-600 transition-colors"
          aria-label="Share on Twitter"
        >
          <FaTwitter size={32} />
        </a>
        <a
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
            `${shareText} ${currentUrl}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-500 hover:text-green-700 transition-colors"
          aria-label="Share on WhatsApp"
        >
          <FaWhatsapp size={32} />
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
            currentUrl
          )}&title=${encodeURIComponent(shareText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:text-blue-900 transition-colors"
          aria-label="Share on LinkedIn"
        >
          <FaLinkedin size={32} />
        </a>
        <button
          onClick={copyToClipboard}
          className="text-gray-600 hover:text-gray-900 transition-colors relative"
          aria-label="Copy link"
        >
          <FiCopy size={30} />
          {copied && (
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
              Copied!
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
