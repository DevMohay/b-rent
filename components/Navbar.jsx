"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

function Navbar() {
  const { data: session, status } = useSession();

  return (
    <div className="flex justify-between items-center p-2">
      <Link href="/">
        <span className="font-bold text-xl cursor-pointer">Logo</span>
      </Link>

      <div className="flex gap-4">
        <Link href="/">
          <span className="cursor-pointer">Home</span>
        </Link>
        <Link href="/about">
          <span className="cursor-pointer">About</span>
        </Link>
        <Link href="/contact">
          <span className="cursor-pointer">Contact</span>
        </Link>
      </div>

      <div className="flex gap-2 items-center">
        {status === "authenticated" ? (
          <>
            {session.user?.image ? (
              <Link href="/dashboard">
                <Image
                  src={session.user.image}
                  alt="Profile Picture"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </Link>
            ) : (
              <Link href="/dashboard">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold cursor-pointer">
                  {session.user?.email?.[0]?.toUpperCase() ?? "U"}
                </div>
              </Link>
            )}
            <button
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
            ></button>
          </>
        ) : (
          <Link href="/auth/login">
            <button className="bg-green-500 text-white px-4 py-2 rounded">
              Signup
            </button>
          </Link>
        )}
        <Link href="/seller/post-ad">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Post Ad Free
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
