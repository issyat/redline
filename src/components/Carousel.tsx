import { Box, Button, CircularProgress, Fade, Grid2 as Grid, Modal, Typography, Backdrop } from "@mui/material"
import Slider from "react-slick"
import jjk from '../assets/images/jjk.jpg';
import spiderverse from '../assets/images/spiderverse.jpg';
import pikachu from '../assets/images/pikachu.jpg';
import { useEffect, useState } from "react";
import { CrewMember, getMediaVideos, getMovieCredits, getMovieDetails, getMoviesByGenre, getNowPlayingMovies, MediaItem, Video } from "../api/TmdbApi";

// Define the style object for the modal
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: 800,
    height: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto'
};

const Carousel = () => {
    const [movies, setMovies] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
    const [trailerKey, setTrailerKey] = useState<string | null>(null);
    const [director, setDirector] = useState('N/A');
    const [actors, setActors] = useState<{name: string}[]>([]);
    
    const imageBaseUrl = "https://image.tmdb.org/t/p/w780";
    
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                // Fetch now playing movies from TMDB
                const data = await getMoviesByGenre(16);
                setMovies(data.slice(0, 3)); // Get first 3 movies
                setLoading(false);
            } catch (error) {
                console.error("Error fetching movies:", error);
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    // Function to handle opening the modal with the selected movie
    const handleOpenModal = async (movie: MediaItem) => {
        setSelectedMedia(movie);
        setOpen(true);
         try {
                    // Fetch videos and find the trailer
                    const videos = await getMediaVideos(movie.id, "movie");
                    const trailer = videos.find((video: Video) => video.type === 'Trailer');
                    setTrailerKey(trailer ? trailer.key : '');
                } catch (error) {
                    console.error('Error fetching media details, credits, or videos:', error);
                } finally {
                    setLoading(false);
                }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false
    };
    
    // Loading state
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ width: "100%", height: "100vh", overflow: "hidden" }}>
            <Slider {...settings}>
                {movies.map((movie, index) => {
                    const imagePath = movie.backdrop_path || movie.poster_path;
                    return (
                        <Box key={movie.id || index} component={"div"} sx={{ 
                            width: "100%",
                            height: "100vh",
                            backgroundImage: `linear-gradient(0deg, rgba(255, 99, 71, 0.63), rgba(0, 0, 0, 0.3)),url(${imageBaseUrl}${imagePath})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}>
                            <Grid container display={"flex"} direction={"column"} justifyContent="center" alignItems="center" sx={{ height: "100%" }}>
                                <Grid>
                                    <Typography variant="h3" sx={{ color: "white", fontWeight: 700, letterSpacing: ".3rem", fontSize:{xs: "2rem", md: "4vw"} }}>
                                        {movie.title || 'LATEST ONLINE MOVIES'}
                                    </Typography>
                                </Grid>
                                <Grid>
                                    <Button 
                                        variant="contained" 
                                        sx={{ mt: 2, color: "white", backgroundColor: "tomato" }}
                                        onClick={() => handleOpenModal(movie)}
                                    >
                                        Watch Trailer
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    );
                })}
            </Slider>
            
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={() => setOpen(false)}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        {loading ? (
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <CircularProgress />
                            </Box>
                        ) : (
                            selectedMedia && (
                                <>
                                    {trailerKey ? (
                                        <Box sx={{ mt: 2, width: "100%",height:"90%" }}>
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                src={`https://www.youtube.com/embed/${trailerKey}`}
                                                title="YouTube video player"
                                                frameBorder="0"
                                                allowFullScreen
                                            ></iframe>
                                        </Box>
                                    ) : <Typography sx={{ mt: 2 }}>No trailer available.</Typography>}
                                </>
                            )
                        )}
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
};

export default Carousel;