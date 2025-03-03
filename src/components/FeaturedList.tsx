import { useEffect, useState } from "react";
import { Genre } from "../api/TmdbApi";
import { Box, Divider, Typography, Grid2 as Grid, Button } from "@mui/material";

interface Item {
  id: number;
  title?: string; // For movies
  name?: string; // For TV shows
  poster_path: string;
}

interface Props {
  title: string;
  fetchGenres: () => Promise<Genre[]>;
  fetchItems: (genreId?: number) => Promise<Item[]>;
}

const FeaturedList = ({ title, fetchGenres, fetchItems }: Props) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [displayCount, setDisplayCount] = useState(12);
  const [showAll, setShowAll] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadGenres = async () => {
    try {
      const genres = await fetchGenres();
      setGenres(genres);
    } catch (err) {
      setError("Failed to load genres");
    }
  };

  const loadItems = async (genreId?: number) => {
    try {
      const items = await fetchItems(genreId);
      setItems(items);
    } catch (err) {
      setError("Failed to load items");
    }
  };

  useEffect(() => {
    loadGenres();
  }, []);

  useEffect(() => {
    loadItems(selectedGenre ?? undefined);
  }, [selectedGenre]);

  const handleGenreClick = (id: number) => {
    setSelectedGenre(id);
  };

  const handleToggleItems = () => {
    setShowAll((prev) => !prev);
    setDisplayCount((prev) => (showAll ? 12 : items.length));
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 6 } }}>
      <Grid container display={"flex"} alignItems={"center"} spacing={2}>
        <Divider orientation="vertical" flexItem sx={{ bgcolor: "tomato", width: 10, height:"auto" }} />
        <Typography variant="h6" sx={{ p: 2, fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" } }}>
          {title}
        </Typography>
      </Grid>

      {/* Genre Buttons */}
      <Grid container spacing={1} justifyContent="center" sx={{ mt: 2 }}>
        {genres.map(({ id, name }) => (
          <Button
            key={id}
            sx={{
              bgcolor: selectedGenre === id ? "darkred" : "tomato",
              color: "white",
              fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
              px: { xs: 1, sm: 2 },
              m: 0.5,
            }}
            onClick={() => handleGenreClick(id)}
          >
            {name}
          </Button>
        ))}
      </Grid>

      {/* Display Items */}
      <Grid container spacing={2} justifyContent="center">
        {items.slice(0, displayCount).map(({ id, title, name, poster_path }) => (
          <Grid size={{xs:6, sm:4, md:3, lg:2}} key={id}>
            <Box
              sx={{
                textAlign: "center",
                borderRadius: 2,
                overflow: "hidden",
                bgcolor: "#222",
                width: "100%",
                maxWidth: 200,
                mx: "auto",
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                alt={title || name}
                style={{ width: "100%", height: "auto", objectFit: "cover", maxHeight: "300px" }}
              />
              <Typography sx={{ color: "white", mt: 1, fontSize: "0.9rem" }}>{title || name}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Toggle Button */}
      {items.length > 12 && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button variant="contained" sx={{ bgcolor: "tomato", color: "white", px: 4, py: 1 }} onClick={handleToggleItems}>
            {showAll ? "Show Less" : "Show More"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FeaturedList;