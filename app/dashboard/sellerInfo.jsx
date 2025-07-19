"use client";

import { useSession } from "next-auth/react";
import { FaWhatsapp } from "react-icons/fa";
import { RiFacebookCircleLine } from "react-icons/ri";

export default function SellerInfo({ user: seller }) {
  const { data: session, status } = useSession();
  const user = seller || session?.user;

  if (status === "loading" && !seller) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to view your information.</div>;
  }
  

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
        </div>
      </div>
      <div className="flex items-center gap-2 w-full mt-4">
        <a
          href={`https://wa.me/${
            user.phone 
          }`}
          target="_blank"
          rel="noopener noreferrer"
          className=" items-center w-full flex gap-2 bg-green-500 text-white px-4 py-2 rounded-md justify-center"
        >
          <FaWhatsapp className="inline  items-center " />
          <span>{user?.phone || "N/A"}</span>
        </a>
            
          </div>
    </div>
  );
}
