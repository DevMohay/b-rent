import React from 'react'

function Categories() {
  return (
    <div className='m-4 gap-8 p-4 h-[18rem] shadow-md shadow-black '>
        <div>
            <h1 className='text-4xl font-bold'>B-Rent Bogura's Largest Marketplace</h1>
            <p>Find the best deals on houses, messes, shops, restaurants, and lands in Bogura.</p>
        </div>
        <div className='flex gap-8 mt-6 '>
            <div className="card w-[8rem] h-[8rem] cursor-pointer justify-center items-center  border">
                <img src="https://icons.iconarchive.com/icons/artdesigner/urban-stories/128/House-icon.png" width="128" height="128" />
                <span className='text-lg font-semibold'>Houses</span>
            </div>
            <div className="card w-[8rem] h-[8rem] cursor-pointer justify-center items-center  border">
                <img src="https://icons.iconarchive.com/icons/aha-soft/standard-city/128/school-icon.png" width="128" height="128" />
                <span className='text-lg font-semibold'>Messes</span>
            </div>
            <div className="card w-[8rem] h-[8rem] cursor-pointer justify-center items-center  border">
                <img src="https://icons.iconarchive.com/icons/icons-land/buildings/128/Shop-Bakery-icon.png" width="128" height="128" />
                <span className='text-lg font-semibold'>Shops</span>
            </div>
            <div className="card w-[8rem] h-[8rem] cursor-pointer justify-center items-center  border">
                <img src="https://icons.iconarchive.com/icons/iconarchive/essential-buildings/128/Cafe-Small-icon.png" width="128" height="128" />
                <span className='text-lg font-semibold'>Restaurants</span>
            </div>
            <div className="card w-[8rem] h-[8rem] cursor-pointer justify-center items-center  border">
                <img src="https://icons.iconarchive.com/icons/vectorizeimages/iconpack/128/map-icon.png" width="128" height="128" />
                <span className='text-lg font-semibold'>Lands</span>
            </div>
        </div>
    </div>
  )
}

export default Categories