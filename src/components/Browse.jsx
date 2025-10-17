
import useNowPlayingMovies from '../Hooks/useNowPlayingMovies'
import usePopularMovies from '../Hooks/usePopularMovies';
import useTopRatedMovies from '../Hooks/useTopRatedMovies';
import useUpcomingMovies from '../Hooks/useUpcomingMovies';
import Header from './Header'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import GptSearchComponent from './GptSearchComponent';
import { useSelector } from 'react-redux';


const Browse = () => {

  const showGptSearch = useSelector(store => store.gpt.showGptSearch);

  useNowPlayingMovies();
  useTopRatedMovies();
  usePopularMovies();
  useUpcomingMovies();

  return (
    <div>
      <Header/>
      {

      showGptSearch ? <GptSearchComponent/> : <><MainContainer/>
<SecondaryContainer/></>
      }

{
  /*
  MainContainer
    - VideoBackground
    - VideoTitle
  SecondaryContainer
    - MovieList * n
    - cards * n
  */
}


    </div>
  )
}

export default Browse
