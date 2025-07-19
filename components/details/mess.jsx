import React from "react";

const MessDetails = ({ ad }) => {
  return (
    <div className=" mt-4 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-gray-800">
        Mess Details
      </h2>
      <div className="">
        <div className="min-w-full  border-gray-300 mb-4">
          <div className="">
            {ad.title}
            <h1 className="font-bold">3 Bedder Room Price: {ad.price}TK</h1>
            <p>{ad.rentOrSale === "rent" ? <p>Per Month</p> : ""}</p>
            <h1 className="font-bold">
              2 Bedder Room Price: {ad.doubleRoomPrice}TK
            </h1>
            <p>{ad.rentOrSale === "rent" ? <p>Per Month</p> : ""}</p>
            <h1 className="font-bold">
              Single Room Price: {ad.singleRoomPrice}TK
            </h1>
            <p>{ad.rentOrSale === "rent" ? <p>Per Month</p> : ""}</p>
            <h1 className="font-bold capitalize">Floor Type: {ad.floorType}</h1>
            Ceiling Type: {ad.roofType === "saad" ? <p>ছাদ</p> : <p>টিনশেড</p>}
            {/* {ad.roofType === 'saad' &&(
                           
                                    Total Floor: {ad.floorNumbers}
                               
                        )} */}
            Seat Available: {ad.seatCount}
            Seat Available: {ad.total}
            {ad.kitchen === true ? (
              <p>Kitchen Available</p>
            ) : (
              <p>Kitchen Not Available</p>
            )}
            {ad.baranda === true ? (
              <p>Baranda Available</p>
            ) : (
              <p>Baranda Not Available</p>
            )}
            {ad.balcony === true ? (
              <p>Balcony Available</p>
            ) : (
              <p>Balcony Not Available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessDetails;
