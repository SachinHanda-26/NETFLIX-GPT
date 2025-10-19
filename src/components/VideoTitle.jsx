import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='pt-[13%] px-12 absolute text-white bg-gradient-to-r from-black w-screen aspect-video'>
      <h1 className='text-3xl md:text-6xl font-bold mt-10 md:mt-0 -ml-4 md:-ml-0'>{title}</h1>
      <p className='hidden md:block py-6 text-lg w-1/4'>{overview}</p>

      <div className='flex gap-2 items-center'>
        <button className='bg-gray-500/50 text-white py-1 md:py-4 px-4 md:px-12 text-xl rounded-lg -ml-4 md:-ml-0 mt-3 md:mt-0'>Play</button>
        <button className='hidden md:block bg-gray-500/50 text-white p-4 px-12 text-xl rounded-lg'>More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle
