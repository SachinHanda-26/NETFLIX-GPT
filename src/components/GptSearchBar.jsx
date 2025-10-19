import React, { useRef } from 'react'
import lang from '../utils/LanguageConstants'
import { useDispatch, useSelector } from 'react-redux'
import ai from '../utils/ai'
import { API_OPTIONS } from '../utils/constants'
import { addGenMovieResult } from '../utils/gptSlice'


const GptSearchBar = () => {

  const dispatch = useDispatch();
    const langKey = useSelector(store => store.config.lang)
    const searchText = useRef();

// search movie in TMDB 
    const searchMovieTMDB = async(movie)=>{

const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+ movie+'&include_adult=false&language=en-US&page=1', API_OPTIONS);

const json = await data.json();

  return json.results;
    }

    const handleGptSearchClick = async()=>{
// console.log(searchText.current.value);

// Make an API call to GPT API and get Movie Results

const genQuery = "Act as a Movie Recommendation system and suggest some movies for the query : "+searchText.current.value+"only give me the names of 5 movies, comma separated like the example result given ahead. Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

 const genResults = await ai.models.generateContent({
    // ✅ Use the free, high-limit model
    model: 'gemini-2.0-flash-001',
    contents: genQuery,
  });

  
  // console.log(genResults.text);
  // 3 Idiots, Dangal, Bajrangi Bhaijaan, Dilwale Dulhania Le Jayenge, Lagaan

  const genMovies = genResults.text.split(",");
  // ["3 Idiots", "Dangal", "Bajrangi Bhaijaan", "Dilwale Dulhania Le Jayenge", "Lagaan"]

  // for each movie i will search TMDB Api

  const promiseArray =   genMovies.map(movie => searchMovieTMDB(movie));
  // [Promise, Promise, Promise, Promise, Promise]
  
  const tmdbResults = await Promise.all(promiseArray);

  // console.log(tmdbResults);

  dispatch(addGenMovieResult({movieNames: genMovies, movieResults: tmdbResults}));
    }


  return (
    <div className='pt-[23%] flex justify-center'>
      <form className='mt-[15%] md:mt-0 md:w-1/2 bg-black grid grid-cols-12 w-11/12' onSubmit={(e)=>e.preventDefault()}>
        <input ref={searchText} type='text' className='p-4 m-4 text-white col-span-9 text-sm md:text-lg' placeholder = {lang[langKey].gptSearchPlaceholder} ></input>
        <button className='px-0 md:px-4 m-5 md:m-4 bg-red-700 text-white rounded-lg col-span-3 cursor-pointer' onClick={handleGptSearchClick}>{lang[langKey].search}</button>
      </form>
    </div>
  )
}

export default GptSearchBar
