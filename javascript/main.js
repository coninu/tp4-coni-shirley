// API 

const apiKey = '?api_key=280b6cef62614967a758507e49de17c9';
const baseUrl = 'https://api.themoviedb.org/3/movie/';

// Funcion que llama a la home

const loadHome = () => {
    document.getElementById("resultsPerCategoryOrSearch").style.display="none"
    document.getElementById("batman-banner").style.display=""
    document.getElementById("home-results").style.display=""
    // eso podria mejorar
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
    arrayOfMovies.forEach(({title , poster_path, id})=>{ // acordate de agregar el id para el modal
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

// Funciones para el menu de navegacion

const selectCategory = (category) => {
    setTimeout(() => { // para probar - transiciones a explorar
        document.getElementById("resultsPerCategoryOrSearch").style.transition = '0.5s';
    fetch (`${baseUrl}${category}${apiKey}`)
        .then(res=>res.json())
        .then(res=> printResults(res.results,category,res.total_results))},500)
}

const printResults = (movies,query,totalResults) => {
    document.getElementById("batman-banner").style.display="none"
    document.getElementById("home-results").style.display="none"
    const resultsContainer = document.getElementById("resultsPerCategoryOrSearch")
    resultsContainer.innerHTML=""
    resultsContainer.style.display=""
    resultsContainer.appendChild(createCategoryHeader(query,totalResults))
    const results = document.createElement("div")
    results.classList.add("movies")
    results.id="results"
    createMovies(movies,results)
    resultsContainer.appendChild(results)    
    createLoadMoreButton(results,query) // REVISAR 
}

// Creamos elementos para las categorias : 1) el header

const createCategoryHeader = (category,totalResults) => {
    const header = document.createElement("div")
    header.classList.add("category-header")
    const title = document.createElement("h2")
    title.classList.add("category-name")
    switch (category) {
        case "popular":
            title.innerText="Popular Movies";
        break;
        case "top_rated":
            title.innerText="Top Rated";
        break;
        case "upcoming":
            title.innerText="Upcoming"
        break;
        case "now_playing":
            title.innerText="Now Playing"
        break;
        default: 
            title.innerText="Results"
    }
    const categoryResults = document.createElement("h5")
    categoryResults.innerText=`${totalResults} resultados`
    categoryResults.classList.add("num-results")
    header.appendChild(title)
    header.appendChild(categoryResults)
    return header
}

// 2) creamos el boton de load more
const createLoadMoreButton = (container,category) => {
    let currentPage = 2
    const loadMoreButton = document.createElement("button")
    loadMoreButton.innerText="LOAD MORE"
    loadMoreButton.classList.add('load-more-button')
    loadMoreButton.onclick=()=>{
        loadMore(category,currentPage)
        currentPage++
        return currentPage
    }
    container.appendChild(loadMoreButton)
}

// Esta funcion carga mas peliculas en la pantalla en base al boton

const loadMore = (query,currentPage) => {
    const container = document.getElementById("resultsPerCategoryOrSearch")
    container.classList.add('movies')
    let url
    query === "popular"||query==="top_rated"||query==="upcoming"||query==="now_playing"
        ?url=`${baseUrl}${query}${apiKey}&page=${currentPage}`
        :url=`${baseUrl}search/movie${apiKey}&query=${query}&page=${currentPage}`
    fetch(url)
        .then(response => response.json())
        .then(res => createMovies(res.results,container))
}
