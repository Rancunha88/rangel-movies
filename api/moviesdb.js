import axios from 'axios';

const movieBaseURL = 'https://api.themoviedb.org/3';
const api_key = '52ca91db198ed2b0f1c02c437f93fd23';

export const image500 = path => path ? `https://image.tmdb.org/t/p/w500/${path}` : null;
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342/${path}` : null;
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185/${path}` : null;

// Function to fetch trending movies
export const getTrendingVideos = () => 
  axios.get(`${movieBaseURL}/trending/all/day?api_key=${api_key}`);

// Function to fetch movies by genre
export const getMovieByGenre = (id) => 
  axios.get(`${movieBaseURL}/discover/movie?api_key=${api_key}&with_genres=${id}`);

// Function to fetch upcoming movies
export const getUpcomingMovies = () => 
  axios.get(`${movieBaseURL}/movie/upcoming?api_key=${api_key}`);

// Function to fetch top-rated movies
export const getTopRatedMovies = () => 
  axios.get(`${movieBaseURL}/movie/top_rated?api_key=${api_key}`);

// Function to fetch movie details
export const getMovieDetails = (id) => 
  axios.get(`${movieBaseURL}/movie/${id}?api_key=${api_key}&language=en-US`);

// Function to fetch movie credits
export const getMovieCredits = (id) => 
  axios.get(`${movieBaseURL}/movie/${id}/credits?api_key=${api_key}&language=en-US`);

// Function to fetch similar movies
export const getSimilarMovies = (id) => 
  axios.get(`${movieBaseURL}/movie/${id}/similar?api_key=${api_key}&language=en-US` );

// Function to search for movies
export const getPersonDetails = (id) =>
  axios.get(`${movieBaseURL}/person/${id}?api_key=${api_key}&language=en-US`);

// Function to fetch movies by a person
export const getPersonMovies = (id) =>
  axios.get(`${movieBaseURL}/person/${id}/movie_credits?api_key=${api_key}&language=en-US`);

// Function to search for movies
export const searchMovies = (title) => {
  return axios.get(`${movieBaseURL}/search/movie?include_adult=true&query=${title}&api_key=${api_key}`)
}