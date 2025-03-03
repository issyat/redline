import FeaturedList from "../components/FeaturedList";
import { getTvGenres, getTvShowsByGenre, getPopularTvShows } from "../api/TmdbApi";

const FeaturedTvSeries = () => {
  return <FeaturedList title="Featured TV Shows" fetchGenres={getTvGenres} fetchItems={(genreId) => (genreId ? getTvShowsByGenre(genreId) : getPopularTvShows())} />;
};

export default FeaturedTvSeries;
