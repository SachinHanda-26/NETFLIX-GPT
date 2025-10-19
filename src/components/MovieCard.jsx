import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

const MovieCard = ({posterPath}) => {
  if(!posterPath) return null;
  return (
    <div className='w-30 md:w-48'>
      <img src={IMG_CDN_URL+posterPath}></img>
    </div>
  )
}

export default MovieCard
