// API 

const apiKey = '?api_key=280b6cef62614967a758507e49de17c9';
const baseUrl = 'https://api.themoviedb.org/3/movie/';
const categoryPopular = 'popular';
const categoryTopRated = 'top_rated';
const categoryUpcoming = 'upcoming';
const categoryNowPlaying = 'now_playing';
let currentPage = 1;

// categorias de cada seccion

const urlPopular = `${baseUrl}${categoryPopular}${apiKey}&page=${currentPage}`;
const urlTopRated = `${baseUrl}${categoryTopRated}${apiKey}&page=${currentPage}`;
const urlUpcoming = `${baseUrl}${categoryUpcoming}${apiKey}&page=${currentPage}`;
const urlNowPlaying = `${baseUrl}${categoryNowPlaying}${apiKey}&page=${currentPage}`;

// Elementos del HTML 
// 1) Home y header de categorias

let homeBanner = document.getElementsByClassName('banner');
let resultsContainer = document.getElementsByClassName('results');
let textsInCategory = document.getElementsByClassName('category-header');
let categoryTitle = document.getElementsByClassName('category-name');
let viewAllButton = document.getElementsByClassName('button-view-all');

// 2) Para las peliculas

let moviesContainer = document.getElementsByClassName('movies');
let movieModel = document.getElementsByClassName('movie');
let moviePosterDiv = document.getElementsByClassName('movie-poster');
let moviePosterImg = document.getElementsByClassName('poster-image');
let movieTitle = document.getElementsByClassName('movie-title');



// Fetch para cada categoria simplificado en una funcion (no es para la home)


