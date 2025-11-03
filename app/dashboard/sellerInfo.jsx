"use client";

import { useSession } from "next-auth/react";
import { FaWhatsapp } from "react-icons/fa";
import { RiFacebookCircleLine } from "react-icons/ri";

export default function SellerInfo({ user: seller, adUrl }) {
  const { data: session, status } = useSession();
  const user = seller || session?.user;

  if (status === "loading" && !seller) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to view your information.</div>;
  }
  
  const whatsappNumber = user?.whatsapp || user?.phone || "";
  const imoNumber = user?.imo || user?.phone || "";
  const messageText = `Hi, I'm interested in your property. Here is the ad link: ${adUrl || ''}`;
  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageText)}`
    : undefined;
  // Note: IMO deep link is not officially documented. Fallback to SMS scheme.
  const imoHref = imoNumber
    ? `sms:${imoNumber}?&body=${encodeURIComponent(messageText)}`
    : undefined;

  return (
    <div className=" w-full ">
      <div className="flex items-center gap-4  w-full">
        <img
          src={user?.profilePicture || "/demo.jpeg"}
          alt={user.name || "User avatar"}
          className="w-16 rounded-full border-black border-2 h-16"
        />
        <div className="w-full">
          <h3 className="text-xl font-semibold">{user.name || "Anonymous"}</h3>
          <p className="text-gray-600">{user.email || "No email provided"}</p>
          <p className="text-gray-600">Phone: {user?.phone || "N/A"}</p>
          {user?.whatsapp && <p className="text-gray-600">WhatsApp: {user.whatsapp}</p>}
          {user?.imo && <p className="text-gray-600">IMO: {user.imo}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2 w-full mt-4">
        {whatsappHref && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className=" items-center w-full flex gap-2 bg-green-500 text-white px-4 py-2 rounded-md justify-center"
          >
            <FaWhatsapp className="inline  items-center " />
            <span>WhatsApp</span>
          </a>
        )}
        {imoHref && (
          <a
            href={imoHref}
            target="_blank"
            rel="noopener noreferrer"
            className=" items-center w-full flex gap-2 bg-blue-500 text-white px-4 py-2 rounded-md justify-center"
          >
            <span>IMO</span>
          </a>
        )}
      </div>
    </div>
  );
}
