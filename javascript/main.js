// API 

const apiKey = '?api_key=280b6cef62614967a758507e49de17c9';
const baseUrl = 'https://api.themoviedb.org/3/movie/';
let currentPage = 1;


const homePage = () => {
    //clearAll()
    //document.getElementById("container-vertical")
    fetchPerCategoryAndFill ("popular")
    fetchPerCategoryAndFill ("top_rated")
    fetchPerCategoryAndFill ("upcoming")
    fetchPerCategoryAndFill ("now_playing")
    
}

// Hacemos un fetch por cada categoria e imprimimos las peliculas en su container correspondiente

const fetchPerCategoryAndFill = (category) => {
    const container = document.getElementById(category)
    container.classList.add('movies')
    container.innerHTML=""
    fetch(`${baseUrl}${category}${apiKey}`)
        .then(response => response.json())
        .then(res =>createMovies(res.results.slice(0,5),container))
}

// Creamos los elementos necesarios para cada pelicula

const createMovies = (arrayOfMovies,container) =>{
    arrayOfMovies.forEach(({title , poster_path })=>{ // acordate de agregar el id para el modal
        const movieContainer = document.createElement("div")
        movieContainer.classList.add("movie")
        const posterContainer = document.createElement("div")
        posterContainer.classList.add("movie-poster")
        const moviePoster = document.createElement('img')
        moviePoster.classList.add('poster-image')
        if (poster_path)
        {moviePoster.src=`https://image.tmdb.org/t/p/w500/${poster_path}`} 
        else{moviePoster.src="images/no-image.png"} 
        const movieTitle = document.createElement('h3')
        movieTitle.innerText = title
        movieTitle.classList.add('movie-title')
        posterContainer.appendChild(moviePoster)
        movieContainer.appendChild(posterContainer)
        movieContainer.appendChild(movieTitle)
        container.appendChild(movieContainer)
        //posterContainer.onclick = () =>toggleFunction(id) // para el modal
    })
}  

