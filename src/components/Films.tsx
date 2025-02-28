import axios from "axios";
import { useEffect, useState } from "react";
import API_KEY from "../constants/API_KEY";

const MOVIE_ID = "500"; // Exemple : Fight Club

interface Movie {
  title: string;
  releaseYear: string;
  genres: string;
  poster: string;
  overview: string;
  director: string | undefined;
  actors: string;
  trailerUrl: string | null;
}

const Films = () => {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${MOVIE_ID}`,
          {
            params: {
              api_key: API_KEY,
              append_to_response: "videos,credits",
            },
          }
        );

        const data = response.data;
        const director = data.credits.crew.find((p:any) => p.job === "Director")?.name;
        const trailer = data.videos.results.find((v:any) => v.type === "Trailer")?.key;

        setMovie({
          title: data.title,
          releaseYear: data.release_date.split("-")[0],
          genres: data.genres.map((g:any) => g.name).join(", "),
          poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
          overview: data.overview,
          director,
          actors: data.credits.cast.slice(0, 5).map((a:any) => a.name).join(", "),
          trailerUrl: trailer ? `https://www.youtube.com/watch?v=${trailer}` : null,
        });
      } catch (error) {
        console.error("Erreur lors de la récupération du film :", error);
      }
    };

    fetchMovie();
  }, []);

  if (!movie) return <p>Chargement...</p>;

  return (
    <div>
      <h2>{movie.title} ({movie.releaseYear})</h2>
      <p><strong>Genre :</strong> {movie.genres}</p>
      <p><strong>Réalisateur :</strong> {movie.director}</p>
      <p><strong>Acteurs :</strong> {movie.actors}</p>
      <p>{movie.overview}</p>
      <img src={movie.poster} alt={movie.title} width="300" />

      {movie.trailerUrl && (
        <div>
          <h3>Trailer</h3>
          <iframe
            width="560"
            height="315"
            src={movie.trailerUrl.replace("watch?v=", "embed/")}
            title="YouTube video player"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Films;
