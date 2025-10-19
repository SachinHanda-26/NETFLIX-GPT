import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const movies = useSelector(store => store.movies);
  return (
  movies.nowPlayingMovies && (
    <div className='bg-black'>

<div className='md:-mt-37 relative z-20'>
      <MovieList title = {"Now Playing"} movies = {movies?.nowPlayingMovies}/>
      <MovieList title = {"Top Rated"} movies = {movies?.topRatedMovies}/>
      <MovieList title = {"Popular"} movies = {movies?.popularMovies}/>
      <MovieList title = {"Upcoming Movies"} movies = {movies?.upcomingMovies}/>
      {/* 
      MovieList - Popular
        MovieCard*n
      MovieList - Now Playing
      MovieList - Trending
      MovieList - Horror
      */}
      </div>
    </div>
  )
)
}

export default SecondaryContainer
