import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='pt-[19%] px-12 absolute text-white bg-gradient-to-r from-black w-screen aspect-video'>
      <h1 className='text-6xl font-bold'>{title}</h1>
      <p className='py-6 text-lg w-1/4'>{overview}</p>

      <div className='flex gap-2 items-center'>
        <button className='bg-gray-500/50 text-white p-4 px-12 text-xl rounded-lg'>Play</button>
        <button className='bg-gray-500/50 text-white p-4 px-12 text-xl rounded-lg'>More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle
