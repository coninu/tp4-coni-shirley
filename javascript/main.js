// API 

const apiKey = '280b6cef62614967a758507e49de17c9';
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
let textSectionModel = document.getElementsByClassName('category-header');
let categoryTitle = document.getElementsByClassName('category-name');
let viewAllButton = document.getElementsByClassName('button-view-all');
let contentContainer = document.getElementsByClassName('movie-container')

// 2) Para las peliculas

let moviesContainer = document.getElementsByClassName('movies');
let movieModel = document.getElementsByClassName('movie');
let moviePosterDiv = document.getElementsByClassName('movie-poster');
let moviePosterImg = document.getElementsByClassName('poster-image');
let movieTitle = document.getElementsByClassName('movie-title');
//let contentContainer = document.getElementsByClassName('movie-container')




// Creamos los elementos generales para el header de la home y peliculas

const createTextSection = currentCategory => {
    let textSectionModel = document.getElementsByClassName('category-header');
    let categoryTitle = document.getElementsByClassName('category-name');
    textSectionModel.innerHTML = '';
    categoryTitle.innerHTML = currentCategory;
    textSectionModel.appendChild(categoryTitle);
    return textSectionModel
}

const createViewAllButton = container => {
    let viewAllButton = document.getElementsByClassName('button-view-all')
    container.appendChild(viewAllButton);
    return viewAllButton
}

const createResultsNumberInfo = movies => {
    let numberOfResults = document.createElement('h6');
    numberOfResults.innerHTML = `${movies.total_results} results`;
    return numberOfResults
}


// carga elementos de cada pelicula

const loadMovieInfo = (movie, moviesContainer) => {
    let movieModel = document.getElementsByClassName('movie');
    let moviePosterDiv = document.getElementsByClassName('movie-poster');
    if (movie.poster_path) {
        moviePosterDiv.innerHTML = "<img class='poster-image' src= `https://image.tmdb.org/t/p/w500${movie.poster_path}";
    } else {
        moviePosterDiv.innerHTML = "<img class='poster-image' src='images/no-image.png'"
    } 
    
    let movieTitle = document.getElementsByClassName('movie-title');
    movieTitle.innerHTML = movie.title
    // para el modal: newMovie.onclick = () => {moreInfo(movie.id)};
    moviePosterDiv.appendChild(movieModel)
    movieTitle.appendChild(movieModel)

    moviesContainer.appendChild(movieModel);
}


// carga peliculas

const homeMovies = (currentCategory, apiUrl) => {
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        let movies = data.results.slice(0,5);
        let resultsContainer = document.getElementsByClassName('results');
        let textSectionModel = createTextSection(currentCategory);
        createViewAllButton(textSection).onclick = () => {
            changeMoviesInfo(currentCategory, apiUrl)
        };
        let moviesContainer = document.getElementsByClassName('movies');
        resultsContainer.innerHTML = '';
        moviesContainer.innerHTML = '';
        resultsContainer.appendChild(textSectionModel);
        for (let movie of movies){
            loadBasicInfo(movie, moviesContainer)
        }
        resultsContainer.appendChild(moviesContainer);
        contentContainer.appendChild(resultsContainer);
    });
}

homeMovies('Popular Movies', `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);


