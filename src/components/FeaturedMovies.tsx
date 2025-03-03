  import FeaturedList from "../components/FeaturedList";
  import { getMovieGenres, getMoviesByGenre, getPopularMovies } from "../api/TmdbApi";

  const FeaturedMovies = () => {
    return <FeaturedList title="Featured Movies" fetchGenres={getMovieGenres} fetchItems={(genreId) => (genreId ? getMoviesByGenre(genreId) : getPopularMovies())} />;
  };

  export default FeaturedMovies;
