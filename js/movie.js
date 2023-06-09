const resultGrid = document.getElementById('result-grid');

async function loadMovieDetails(imdbId) {
    const result = await fetch(`https://www.omdbapi.com/?i=${imdbId}&apikey=e64b8c75`);
    const movieDetails = await result.json();
    // console.log(movieDetails);
    displayMovieDetails(movieDetails);
}

function displayMovieDetails(details) {
    resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "Assets/imagenotfound.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
    </div>
    `;
    document.title = details.Title;
}

function LoadMoviePage() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const imdbId = urlParams.get('id')
    loadMovieDetails(imdbId);
}
LoadMoviePage();