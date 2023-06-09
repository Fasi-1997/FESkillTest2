const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
let favMovieList = [];
let movieList = {};
let noResult = document.getElementById('no-result');

//Function called when input changes for search input
function findMovies() {
    let searchTerm = (movieSearchBox.value).trim();
    if (searchTerm.length > 0) {
        loadMovies(searchTerm);
    } else {
        searchList.innerHTML = '';
    }
}
//Function to load movies from API
async function loadMovies(searchTerm) {
    const URL = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=e64b8c75`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    movieList = data.Search;
    displayMovieList();
}
//Function to show movies on UI
function displayMovieList() {
    if (movieList && movieList.length > 0) {
        searchList.innerHTML = '';
        noResult.innerHTML = '';
        for (let idx = 0; idx < movieList.length; idx++) {
            let movieListItem = document.createElement('li');
            if (movieList[idx].Poster != "N/A")
                moviePoster = movieList[idx].Poster;
            else
                moviePoster = "Assets/imagenotfound.png";
            let favItem = document.createElement('div');

            if (favMovieList.indexOf(movieList[idx].imdbID) !== -1) {
                favItem.innerHTML = `<div class="fav-container"> 
                <img src="Assets/favourite.png" alt="" title="Favourite" onclick="removeFromfav('${movieList[idx].imdbID}')">
                </div>`;
            } else {
                favItem.innerHTML = `<div class="fav-container"> 
                <img src="Assets/addFav.png" alt="Add to favourites" title="Add to favourites" onclick="addToFav('${movieList[idx].imdbID}')">
                </div>`;
            }

            movieListItem.innerHTML = `
            <div data-id="${movieList[idx].imdbID}" class="search-list-item" >
            <div class="search-list-item-content" onclick="movieDetails('${movieList[idx].imdbID}')">
            <div class = "search-item-thumbnail" >
                <img src = "${moviePoster}">
            </div>
            <div class = "search-item-info">
                <h3>${movieList[idx].Title}</h3>
                <p>${movieList[idx].Year}</p>
            </div>
            </div>
            ${favItem.innerHTML}
            </div>`;
            searchList.appendChild(movieListItem);
        }
    } else {
        searchList.innerHTML = '';
        noResult.innerHTML = '<h4>No matching results found</h4>';
    }


}
//Function to show movie details
function movieDetails(imdbID) {
    movieSearchBox.value = "";
    window.location.href = `Movie.html?id=${imdbID}`;
}
//Function to add movie to favourite movie list
function addToFav(imdbID) {
    if (!favMovieList.includes(imdbID, 0)) {
        //Add id to favMovieList list
        favMovieList.push(imdbID);
        //Update the list in local storage
        localStorage.setItem('favMovieList', JSON.stringify(favMovieList));
        displayMovieList();
    }
}
//Function to remove movie from favourite movie list
function removeFromfav(imdbID) {
    if (favMovieList.includes(imdbID, 0)) {
        //Remove id from favMovieList list
        const newfavMovieList = favMovieList.filter(function (Id) {
            return Id !== imdbID;
        });
        favMovieList = newfavMovieList;
        //Update the list in local storage
        localStorage.setItem('favMovieList', JSON.stringify(favMovieList));
        displayMovieList();
    }
}
//Function to initialise the home page
function InitialiseHomePage() {

    if (localStorage.getItem("favMovieList") === null) {
        localStorage.setItem('favMovieList', JSON.stringify(favMovieList));
    } else {
        favMovieList = JSON.parse(localStorage.getItem('favMovieList'));
    }
}
InitialiseHomePage();