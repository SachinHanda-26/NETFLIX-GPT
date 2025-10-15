import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTrailerVideo } from '../utils/moviesSlice';
import { API_OPTIONS } from '../utils/constants';

const useMovieTrailer = (movieId) => {
    // fetch trailer video && updating the store with trailer video data
    const dispatch = useDispatch();
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
getMovieVideos();
},[]);
}

export default useMovieTrailer;
