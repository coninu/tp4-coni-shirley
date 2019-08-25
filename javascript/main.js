// API 

const apiKey = '?api_key=280b6cef62614967a758507e49de17c9';
const baseUrl = 'https://api.themoviedb.org/3/movie/';
const categoryPopular = 'popular';
const categoryTopRated = 'top_rated';
const categoryUpcoming = 'upcoming';
const categoryNowPlaying = 'now_playing';
let currentPage = 1;
const mainBanner = document.getElement('container-vertical');
const scrollScreen = document.getElementById('banner');

const getFetch = category => {
    scrollScreen.classList.remove('hidden');
    mainBanner.innerHTML += `<div class="wrapper">
                                <header class="movies_header">
                                    <h2 class="movies_title" id="movies_title_${category}"></h2>
                                    <div class="movies_link" id="movies_link_${category}">
                                    View All<div class="movies_link_icon"></div></div>
                                </header>
                                <ul class="movies_list" id="${'movies_list_'}${category}"></ul>
                            </div>`;
const movieTitle = document.getElementById(`movies_title_${category}`);
    movieTitle.innerText = `${category}${' Movies'}`.replace('_', ' ');
fetch(`${baseUrl}${category}${apiKey}`)
    .then(res => res.json())
    .then(movies => {
        const fiveMovies = movies.results.slice(0,5);
        const moviesList = document.getElementById(`movies_list_${category}`);
        console.log(moviesList)
        moviesList.innerHTML += fiveMovies.map(movie => `
                <li class="movies_item" id="${movie.id}">
                    <div class="movies_item_poster">
                        <img src="https://image.tmdb.org/t/p/original${movie.poster_path}">
                    </div>
                    <div class="movies_item_content">
                        <p class="movies_item_title">${movie.title}</p>
                    </div>
                </li>`)
        .join('');

    });

};

getHome = () =>{
    mainBanner.innerHTML = ' ';
    getFetch('popular');
    getFetch('top_rated');
    getFetch('upcoming');
    getFetch('now_playing');
};

getHome();

const fetchCategory = category => {
    scrollScreen.classList.add('hidden');
    mainBanner.innerHTML += `<div class="wrapper">
                                <header class="movies_header">
                                    <h2 class="movies_title"></h2>
                                    <div class="movies_link">
                                        <div class="movies_link_icon"></div>
                                    </div>
                                </header>
                                <ul class="movies_list" id="${'movies_list_'}${category}"></ul>
                                <div class="button"><button id="${category}" class="load_more">LOAD MORE</button></div>
                            </div>`;
    const movieTitle = document.querySelector('h2');
    movieTitle.innerText = `${category}${' Movies'}`.replace('_', ' ');
    fetch(`${baseUrl}${category}${apiKey}&page=${currentPage}`)
    .then(res => res.json())
    .then(movies => {
        const allMovies = movies.results;
        console.log(allMovies);
        document.getElementById(`movies_list_${category}`)
        .innerHTML = allMovies.map(movie => `<li class="movies_item" id="${movie.id}">
                                                <div class="movies_item_poster">
                                                    <img src="https://image.tmdb.org/t/p/original${movie.poster_path}">
                                                </div>
                                                <div class="movies_item_content">
                                                    <p class="movies_item_title">${movie.title}</p>
                                                </div>
                                            </li>`)
    .join('');

    document.querySelector('.movies_link')
    .innerText = `${movies.total_results}${' results'}`
    });
    document.querySelector('button').onclick = function () {
        paginaActual += 1;
        fetchCategory(`${this.id}`);
    };
};

getCategory = (category) => {
    paginaActual = 1;
    fetchCategory(category);
};


