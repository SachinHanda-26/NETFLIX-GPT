import React from 'react'
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';
import { BG_URL } from '../utils/constants';

const GptSearchComponent = () => {
  return (
    <div>
         <div className='fixed -z-10'>
            <img className='h-screen md:h-full object-cover' src= {BG_URL} alt='background img'></img>
        </div>
<GptSearchBar/>
<GptMovieSuggestions/>
    </div>
  )
}

export default GptSearchComponent;
