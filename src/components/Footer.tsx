import { Button, Grid2 as Grid, TextField, Typography } from "@mui/material";
import { Genre, getMovieGenres, getNowPlayingMovies, MediaItem } from "../api/TmdbApi";
import { useEffect, useState } from "react";

const Footer = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [movies, setMovies] = useState<MediaItem[]>([]);

    const loadGenres = async () => {
        try {
            const genres = await getMovieGenres();
            setGenres(genres);
        } catch (err) {
            console.error("Failed to load genres");
        }
    };

    useEffect(() => {
        loadGenres();
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data: MediaItem[] = await getNowPlayingMovies(1);
                setMovies(data.slice(0, 6)); // Only show the first 5 movies
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                // Fetch now playing movies from TMDB
                const data = await getNowPlayingMovies(1);
                setMovies(data.slice(0, 3)); // Get first 6 movies
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <Grid component={"footer"} sx={{ bgcolor: "black" }}>
            <Grid display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <Typography component={"h1"} mt={3} variant="h4" color={"tomato"}>
                    Subscribe to US
                </Typography>
            </Grid>
            <Grid display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{ gap: 2 }}>
                <TextField sx={{ bgcolor: "white", width: "25rem" }} placeholder="Enter your email" />
                <Button sx={{ bgcolor: "tomato", color: "white" }}>Subscribe</Button>
            </Grid>

            <Grid container>

                <Grid size={{ xs: 12, md: 2 }}>
                    <Typography variant="h6" sx={{ p: 2, fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem", color: "whitesmoke" } }}>
                        Release
                    </Typography>
                 
                    {
                        Array.from(new Array(8), (val, index) => (
                            <Typography key={index} variant="body2" sx={{ pl: 2, pt: 2, fontSize: { xs: "1rem", sm: "1.25rem", md: "1rem", color: "whitesmoke" } }}>
                                {2025 - index}
                            </Typography>
                        ))
                    }
                </Grid>

                <Grid size={{ xs: 12, md: 2 }}>
                    <Typography variant="h6" sx={{ p: 2, fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem", color: "whitesmoke" } }}>
                        Movies
                    </Typography>
                    
                    {
                        genres.map((genre) => (
                            <Typography key={genre.id} variant="body2" sx={{ pl: 2, pt: 2, fontSize: { xs: "1rem", sm: "1.25rem", md: "1rem", color: "whitesmoke" } }}>
                                {genre.name}
                            </Typography>
                        )).slice(0, 8)
                    }
                </Grid>

                <Grid size={{ xs: 12, md: 2 }}>
                    <Typography variant="h6" sx={{ p: 2, fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem", color: "whitesmoke" } }}>
                        Review Movies
                    </Typography>
                  
                    {
                        genres.map((genre) => (
                            <Button key={genre.id} sx={{ fontSize: { xs: "0.6rem", sm: "0.8rem", md: "1rem", color: "whitesmoke" }, bgcolor: "tomato", m: 0.2 }}>
                                {genre.name}
                            </Button>
                        )).slice(0, 12)
                    }
                </Grid>

                <Grid size={{ xs: 12, md: 2 }}>
                    <Typography variant="h6" sx={{ p: 2, fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem", color: "whitesmoke" } }}>
                        Latest Movies
                    </Typography>
                    

                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="h1"
                        sx={{
                            p: 2.4,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'tomato',
                            textDecoration: 'none',
                        }}
                    >
                        ALLEZ
                        <Typography
                            variant="h6"
                            noWrap
                            component="h1"
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'white',
                                textDecoration: 'none',
                            }}
                        >
                            CINE!
                        </Typography>
                    </Typography>
                    <Grid container mt={2}>
                        {movies.map((media) => (
                            <Grid size={{ xs: 6, sm: 6, md: 3.5,}} key={media.id}>
                                
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
                                        alt={media.title}
                                        style={{ width: "100%", height: "auto", objectFit: "cover", maxHeight: "300px" }}
                                    />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Footer;