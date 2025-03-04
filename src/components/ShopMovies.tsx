import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid2 as Grid,
  Typography,
  CircularProgress,
  Button,
  Divider
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { getPopularMovies, getMovieDetails, getMovieCredits, getMediaVideos, CastMember, CrewMember, Video, MediaItem } from '../api/TmdbApi';

const ShopMovies: React.FC = () => {
  const [movies, setMovies] = useState<MediaItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<MediaItem | null>(null);
  const [trailerKey, setTrailerKey] = useState<string>('');
  const [director, setDirector] = useState<string>('Unknown');
  const [actors, setActors] = useState<CastMember[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getPopularMovies(currentPage);
        setMovies(data.slice(0, 8));
        handleMovieClick(data[0].id);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleMovieClick = async (movieId: number) => {
    setLoading(true);
    setSelectedMovieId(movieId);

    try {
      // Fetch movie details
      const movieDetails = await getMovieDetails(movieId);
      setSelectedMovie(movieDetails);

      // Fetch credits and find the director
      const credits = await getMovieCredits(movieId);
      const directorInfo = credits.crew.find((member: CrewMember) => member.job === 'Director');
      setDirector(directorInfo ? directorInfo.name : 'Unknown');

      // Fetch top 5 actors
      setActors(credits.cast.slice(0, 5));

      // Fetch videos and find the trailer
      const videos = await getMediaVideos(movieId, "movie");
      const trailer = videos.find((video: Video) => video.type === 'Trailer');
      setTrailerKey(trailer ? trailer.key : '');
    } catch (error) {
      console.error('Error fetching movie details:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 6 } }}>

      <Grid container display={"flex"} alignItems={"center"} spacing={2}>
        <Divider orientation="vertical" flexItem sx={{ bgcolor: "tomato", width: 10, height: "auto" }} />
        <Typography variant="h6" sx={{ p: 2, fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" } }}>
          Shop Movies
        </Typography>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button onClick={handlePrevPage} sx={{color:"tomato"}} disabled={currentPage === 1} startIcon={<ArrowBackIosIcon />}>
          Previous
        </Button>
        <Button onClick={handleNextPage} sx={{color:"tomato"}} endIcon={<ArrowForwardIosIcon />}>
          Next
        </Button>
      </Box>

      <Grid container spacing={4}>
        {/* Left Section: Movie List (2 rows × 4 movies) */}
        <Grid size={{ xs: 12, md: 6 }} >
          <Grid container spacing={2}>
            {movies.map((movie) => (
              <Grid size={{ xs: 6, sm: 3 }} key={movie.id} onClick={() => handleMovieClick(movie.id)}>
                <Box
                  sx={{
                    textAlign: "center",
                    borderRadius: 2,
                    overflow: "hidden",
                    bgcolor: "#222",
                    width: "100%",
                    height: "auto",
                    cursor: "pointer",
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.05)' },
                    border: selectedMovieId === movie.id ? '2px solid #1976d2' : 'none'
                  }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    style={{ width: "100%", height: "auto", objectFit: "cover", maxHeight: "300px" }}
                  />
                  <Typography sx={{ color: "white", mt: 1, fontSize: "0.9rem", p: 1 }}>
                    {movie.title}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right Section: Movie Details */}
        <Grid size={{ xs: 12, md: 6 }}>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <CircularProgress />
            </Box>
          ) : (
            selectedMovie && (
              <Box sx={{ p: 2 }}>
                <Typography variant="h4" fontWeight="700" gutterBottom>
                  {selectedMovie.title}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {selectedMovie.overview}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                  <strong>Release Year:</strong> {selectedMovie.release_date ? new Date(selectedMovie.release_date).getFullYear() : 'Unknown'}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                  <strong>Director:</strong> {director}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                  <strong>Genres:</strong> {selectedMovie.genres?.map((genre) => genre.name).join(', ')}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                  <strong>Actors:</strong> {actors.map((actor) => actor.name).join(', ')}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                  <strong>Price:</strong> {Math.floor(Math.random() * 20) + 1}€
                </Typography>
                {trailerKey ? (
                  <Box sx={{ mt: 2, width: "100%", height: "400px" }}>
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${trailerKey}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </Box>
                ) : (
                  <Typography sx={{ mt: 2 }}>No trailer available.</Typography>
                )}
              </Box>
            )
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShopMovies;