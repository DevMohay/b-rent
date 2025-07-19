import React from "react";

function HeroSection() {
  return (
    <div className="p-4 flex gap-6">
      <div className="w-[34rem] border h-[18rem] p-10 rounded ">
        <h1 className="text-3xl font-bold">Sell Faster &</h1>
        <h1 className="text-3xl font-bold">Find Great Deals</h1>
        <div className="flex justify-between mt-18 ">

        <button className="bg-blue-500 text-white p-2 rounded overflow-hidden w-36 relative text-2xl"> <span className="absolute top-1 px-10 w-[rem] text-sm bg-red-500 overflow-hidden right-[-2rem] rotate-45">Free</span> Sell</button>

        <button className="bg-green-500 text-white p-2 rounded w-36 text-2xl">Find</button>
        </div>
      </div>
      <div className="w-full border h-[18rem] items-center align-center flex justify-center rounded">
        <h1 className="text-2xl font-bold">Ekhane hobe swiper slide poster ad</h1>

      </div>
    </div>
  );
}

export default HeroSection;
