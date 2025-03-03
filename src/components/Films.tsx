import { useEffect, useState } from 'react';
import { MediaItem, CastMember, CrewMember, Video } from '../api/TmdbApi';
import { Backdrop, Box, Fade, Grid2 as Grid, Modal, Typography, CircularProgress } from '@mui/material';
import { getNowPlayingMovies, getMovieDetails, getMovieCredits, getMediaVideos } from '../api/TmdbApi';

const Films: React.FC = () => {
    const [movies, setMovies] = useState<MediaItem[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
    const [trailerKey, setTrailerKey] = useState<string>('');
    const [director, setDirector] = useState<string>('');
    const [actors, setActors] = useState<CastMember[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const style = {
        position: 'absolute' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "60vw",
        height: "90%",
        overflowY: "scroll" as const,
        padding: "20px",
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 2,
    };

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data: MediaItem[] = await getNowPlayingMovies(1);
                setMovies(data.slice(0, 5)); // Only show the first 5 movies
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    const handleMediaClick = async (mediaId: number) => {
        setLoading(true);
        setOpen(true);

        try {
            // Fetch media details
            const mediaDetails = await getMovieDetails(mediaId);
            setSelectedMedia(mediaDetails);

            // Fetch credits and find the director
            const credits = await getMovieCredits(mediaId);
            const director = credits.crew.find((member: CrewMember) => member.job === 'Director');
            setDirector(director ? director.name : 'Unknown');

            // Fetch top 5 actors
            setActors(credits.cast.slice(0, 5));

            // Fetch videos and find the trailer
            const videos = await getMediaVideos(mediaId, "movie");
            const trailer = videos.find((video: Video) => video.type === 'Trailer');
            setTrailerKey(trailer ? trailer.key : '');
        } catch (error) {
            console.error('Error fetching media details, credits, or videos:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center" wrap="wrap">
            {movies.map((media) => (
                <Grid size={{xs:6,sm:6,md:3,lg:2}} key={media.id} mt={2} onClick={() => handleMediaClick(media.id)}>
                    <Box
                        sx={{
                            textAlign: "center",
                            borderRadius: 2,
                            overflow: "hidden",
                            bgcolor: "#222",
                            width: "100%",
                            maxWidth: 200,
                            height: "auto",
                            mx: "auto",
                            cursor: "pointer"
                        }}
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
                            alt={media.title}
                            style={{ width: "100%", height: "auto", objectFit: "cover", maxHeight: "300px" }}
                        />
                        <Typography sx={{ color: "white", mt: 1, fontSize: "0.9rem" }}>
                            {media.title}
                        </Typography>
                    </Box>
                </Grid>
            ))}

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
                                    <Typography id="transition-modal-title" variant="h6" fontWeight="700">
                                        {selectedMedia.title}
                                    </Typography>
                                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                        {selectedMedia.overview}
                                    </Typography>
                                    <Typography sx={{ mt: 2 }}><strong>Release Year:</strong> {selectedMedia.release_date ? new Date(selectedMedia.release_date).getFullYear() : 'Unknown'}</Typography>
                                    <Typography sx={{ mt: 2 }}><strong>Director:</strong> {director}</Typography>
                                    <Typography sx={{ mt: 2 }}><strong>Genres:</strong> {selectedMedia.genres?.map((genre) => genre.name).join(', ')}</Typography>
                                    <Typography sx={{ mt: 2 }}><strong>Actors:</strong> {actors.map((actor) => actor.name).join(', ')}</Typography>
                                    {trailerKey ? (
                                        <Box sx={{ mt: 2, width: "100%", height: "55%" }}>
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
        </Grid>
    );
};

export default Films;