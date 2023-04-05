const searchList = document.getElementById('search-list');
const noResult = document.getElementById('no-result');
let favMovieList = [];
let movieList = [];

//Function to show th miovie list on UI
function displayMovieList() {
    if (movieList && movieList.length > 0) {
        searchList.innerHTML = '';
        noResult.innerHTML = '';
        for (var idx in movieList) {
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
        noResult.innerHTML = '<h4>No favourites added</h4>';
    }


}

//Function to add movie to favourite movie list
function addToFav(imdbID) {
    if (!favMovieList.includes(imdbID, 0)) {
        //Add id to favMovieList list
        favMovieList.push(imdbID);
        //Update the list in local storage
        localStorage.setItem('favMovieList', JSON.stringify(favMovieList));
        loadfavMovies();
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
        loadfavMovies();
    }
}

//Function used to load the movies from favourite movie list
async function loadfavMovies() {
    movieList = [];
    //Iterate throught the list and show the list
    for (let index = 0; index < favMovieList.length; index++) {
        const result = await fetch(`https://www.omdbapi.com/?i=${favMovieList[index]}&apikey=e64b8c75`);
        const movieDetails = await result.json();
        movieList.push(movieDetails);
    }
    displayMovieList();
}

function movieDetails(imdbID) {
    window.location.href = `Movie.html?id=${imdbID}`;
}
//Function used to initialise the favourite page
function InitialiseFavouritePage() {
    //Get local storage for favourite movie list
    if (localStorage.getItem("favMovieList") === null) {
        //If list is not created create a list
        localStorage.setItem('favMovieList', JSON.stringify(favMovieList));
    } else {
        //Read list from local storage
        favMovieList = JSON.parse(localStorage.getItem('favMovieList'));
    }
    loadfavMovies();
}
InitialiseFavouritePage();