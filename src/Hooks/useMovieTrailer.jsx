import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTrailerVideo } from '../utils/moviesSlice';
import { API_OPTIONS } from '../utils/constants';

const useMovieTrailer = (movieId) => {
    // fetch trailer video && updating the store with trailer video data
    const dispatch = useDispatch();
   const trailerVideos = useSelector(store => store.movies.trailerVideos);

    const getMovieVideos = async()=>{


const data = await fetch('https://api.themoviedb.org/3/movie/'+movieId+'/videos?language=en-US', API_OPTIONS);
const json = await data.json();
// console.log(json);

const filterData = json.results.filter(video => video.type == "Trailer");
const trailer = filterData.length ? filterData[0] : json.results[0];

dispatch(addTrailerVideo(trailer))
// console.log(trailer);
}

useEffect(()=>{
    !trailerVideos && getMovieVideos();
},[]);
}

export default useMovieTrailer;
