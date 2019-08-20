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

// Categoria Popular

const popular = () => {
    fetch(urlPopular)
    .then(response => response.json())
    .then(res => console.log(res)) // 1
}

popular()


// Fetch para cada categoria simplificado en una funcion (no es para la home)

const fetchPerCategory = (category) => {
    
}