import axios from "axios";
import API_KEY from "../constants/API_KEY";
import BASE_URL from "../constants/BASE_URL";

// Interface principale pour les films et séries
export interface MediaItem {
    id: number;
    title?: string; // Pour les films
    name?: string; // Pour les séries
    poster_path: string;
    release_date?: string;
    backdrop_path?: string;
    first_air_date?: string;
    overview?: string;
    genres?: { id: number; name: string }[];
    type: "movie" | "tv"; // Permet de distinguer les types
}

// Types complémentaires
export type CastMember = { name: string };
export type CrewMember = { job: string; name: string };
export type Video = { type: string; key: string };
export type Genre = { id: number; name: string };

// Instance Axios réutilisable
const api = axios.create({
    baseURL: BASE_URL,
    params: { api_key: API_KEY, language: "en-US" },
});

// Fonction générique pour récupérer les données
const fetchData = async <T>(endpoint: string, extraParams = {}): Promise<T> => {
    try {
        const { data } = await api.get(endpoint, { params: extraParams });
        return data;
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        throw error;
    }
};

// Fonction générique pour récupérer des listes paginées
const fetchPaginatedList = async <T>(endpoint: string, extraParams = {}): Promise<T[]> => {
    return fetchData<{ results: T[] }>(endpoint, extraParams).then(res => res.results);
};

// Fonction générique pour récupérer les détails d'un média (film ou série)
const getMediaDetails = async (id: number, type: "movie" | "tv") => {
    const data = await fetchData<MediaItem>(`/${type}/${id}`);
    return { ...data, type };
};

// Fonction générique pour récupérer les crédits d'un média
const getMediaCredits = (id: number, type: "movie" | "tv") =>
    fetchData<{ cast: CastMember[]; crew: CrewMember[] }>(`/${type}/${id}/credits`);

// Fonction générique pour récupérer les vidéos d'un média
export const getMediaVideos = (id: number, type: "movie" | "tv") =>
    fetchData<{ results: Video[] }>(`/${type}/${id}/videos`).then(res => res.results);

// Fonction générique pour récupérer les genres d'un type de média
const getGenres = (type: "movie" | "tv") =>
    fetchData<{ genres: Genre[] }>(`/genre/${type}/list`).then(res => res.genres);

// Fonction générique pour récupérer les médias par genre
const getMediaByGenre = (genreId: number, type: "movie" | "tv") =>
    fetchPaginatedList<MediaItem>(`/discover/${type}`, { with_genres: genreId });

// Fonction générique pour récupérer les médias populaires ou maintenant diffusés
const getMediaList = (category: "now_playing" | "popular", type: "movie" | "tv", page = 1) =>
    fetchPaginatedList<MediaItem>(`/${type}/${category}`, { page }).then(res =>
        res.map(item => ({ ...item, type }))
    );

// Fonctions spécifiques pour les films
export const getNowPlayingMovies = (page = 1) => getMediaList("now_playing", "movie", page);
export const getPopularMovies = (page = 1) => getMediaList("popular", "movie", page);
export const getMovieDetails = (id: number) => getMediaDetails(id, "movie");
export const getMovieCredits = (id: number) => getMediaCredits(id, "movie");
export const getMovieVideos = (id: number) => getMediaVideos(id, "movie");
export const getMovieGenres = () => getGenres("movie");
export const getMoviesByGenre = (genreId: number) => getMediaByGenre(genreId, "movie");

// Fonctions spécifiques pour les séries TV
export const getPopularTvShows = (page = 1) => getMediaList("popular", "tv", page);
export const getTvShowDetails = (id: number) => getMediaDetails(id, "tv");
export const getTvShowCredits = (id: number) => getMediaCredits(id, "tv");
export const getTvShowVideos = (id: number) => getMediaVideos(id, "tv");
export const getTvGenres = () => getGenres("tv");
export const getTvShowsByGenre = (genreId: number) => getMediaByGenre(genreId, "tv");