

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
    arrayOfMovies.forEach(({title , poster_path, id})=>{ 
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
        posterContainer.onclick = () => createModal(id)
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

// Funciones correspondientes al Modal


const createModal = movieId => {
    fetch(`${baseUrl}${movieId}${apiKey}`)
    .then(response => response.json())
    .then(data => {
        // contenedor del modal
        let movieDetails = document.createElement('div')
        movieDetails.classList.add('movie-details')

        // boton para cerrar
        
        let closeWindow = document.createElement('div')
        closeWindow.classList.add('button-close')
        let close = document.createElement('div')
        close.classList.add('close')
        close.innerText = "×"
        close.onclick=()=> {toggleFunction()}
        closeWindow.appendChild('close')
        

        // fondo del modal
        let background = document.createElement('div');
        background.classList.add('background')
        let backgroundImage = document.createElement('img')
        if(data.backdrop_path){ backgroundImage.src=`https://image.tmdb.org/t/p/w1280${data.backdrop_path}`}
        background.appendChild('backgroundImage')

        // poster del modal
        let poster = document.createElement('div')
        poster.classList.add('movie-img')
        let posterImage = document.createElement('img')
        if (data.poster_path) {
            posterImage.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
        } else {posterImage.src= 'images/no-image.png'}
        poster.appendChild('poster-image')

        //contenedor titulo y subtitulo
        // titulo de la pelicula
        let movieTitles = document.createElement('div')
        movieTitles.classList.add('movie-titles')
        let movieTitle = document.createElement('h1')
        movieTitle.classList.add('title')
        movieTitle.innerText = data.title

        //subtitulo de la pelicula
        let subtitle = document.createElement('h4')
        subtitle.classList.add('subtitle')
        subtitle.innerText = data.tagline
        // apenddeo al container del titulo
        movieTitles.appendChild('movieTitle')
        movieTitles.appendChild('subtitle')

        // container descripcion
        let solidBack = document.createElement('div')
        solidBack.classList.add('solid-back')
        // container info 
        let descriptionCont = document.createElement('div')
        descriptionCont.classList.add('description')
        solidBack.appendChild('description')
        // resumen
        let summary = document.createElement('p')
        summary.classList.add('summary')
        summary.innerText = data.overview
        description.appendChild('summary')
        // genero
        let genres = document.createElement('h3')
        genres.innerText = 'GENRES'
        let genre = document.createElement('p')
        genre.classList.add('genre')
        genre.innerHTML = data.genres.map(genre => genre.name)
        description.appendChild('genres')
        description.appendChild('genre')

        // fecha de lanzamiento
        let date = document.createElement('h3')
        date.innerText = 'RELEASE DATE'
        let releaseDate = document.createElement('p')
        releaseDate.classList.add('release-date')
        releaseDate.innerText = data.release_date;
        description.appendChild('date')
        description.appendChild('releaseDate')

        // apendeo todo al modal
        movieDetails.appendChild('closeWindow')
        movieDetails.appendChild('background')
        movieDetails.appendChild('poster')
        movieDetails.appendChild('movieTitles')
        movieDetails.appendChild('solidBack')

    });
}



const toggleFunction = (movieId) => { 
    let modal = document.getElementsById("movie-modal");
    if (modal.style.visibility === "hidden") {
        createModal(movieId) 
        modal.style.visibility = "visible";
    } else {
        modal.style.visibility = "hidden";
    }
}

