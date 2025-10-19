import MovieCard from './MovieCard'

const MovieList = ({title, movies}) => {
    console.log(movies);
  return (
  movies && (
    <div className='px-6'>

        <h1 className='text-xl md:text-3xl py-4 text-white'>{title}</h1>
    <div className='flex overflow-x-scroll scrollbar-hide space-x-4'>

        <div className='flex gap-3'>

           { movies.map(movie => <MovieCard key={movie.id} posterPath = {movie.poster_path}/>)}

      {/* <MovieCard posterPath = {movies[0]?.poster_path}/> */}
        </div>
    </div>

    </div>
  )
)
}

export default MovieList
