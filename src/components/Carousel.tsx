import { Box, Button, Grid2 as Grid, Typography } from "@mui/material"
import Slider from "react-slick"
import jjk from '../assets/images/jjk.jpg';
import spiderverse from '../assets/images/spiderverse.jpg';
import pikachu from '../assets/images/pikachu.jpg';
import { useEffect, useState } from "react";
import { getNowPlayingMovies, MediaItem } from "../api/TmdbApi";
const Carousel = () => {
    const [movies, setMovies] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                // Fetch now playing movies from TMDB
                const data = await getNowPlayingMovies(1);
                setMovies(data.slice(0, 3)); // Get first 6 movies
                setLoading(false);
            } catch (error) {
                console.error("Error fetching movies:", error);
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    const imageBaseUrl = "https://image.tmdb.org/t/p/w780";

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
    const images = [
        jjk,
        spiderverse,
        pikachu,
    ];
    return (
       
       <Box sx={{ width: "100%", height: "100vh", overflow: "hidden" }}>
       <Slider {...settings}>
           {movies.map((src, index) => {
            const imagePath = src.backdrop_path || src.poster_path;
            return (
                <Box key={index} component={"div"} sx={{ 
                    width: "100%",
                     height: "100vh",
                     backgroundImage: `linear-gradient(0deg, rgba(255, 99, 71, 0.63), rgba(0, 0, 0, 0.3)),url(${imageBaseUrl}${imagePath})`,
                     backgroundSize: "cover",
                    backgroundPosition: "center",
                     }}>
                    <Grid container display={"flex"} direction={"column"} justifyContent="center" alignItems="center" sx={{ height: "100%" }}>
                        <Grid>
                            <Typography variant="h3" sx={{ color: "white", fontWeight: 700, letterSpacing: ".3rem", fontSize:{xs: "2rem", md: "4vw"} }}>
                                LATEST ONLINE MOVIES
                            </Typography>
                        </Grid>
                        <Grid>
                            <Button variant="contained" sx={{ mt: 2, color: "white", backgroundColor: "tomato" }}>
                                Watch Trailer
                            </Button>
                        </Grid>
 
                    </Grid>
                </Box>
            )
           } )}
           
       </Slider>
   </Box>
    )
}

export default Carousel;