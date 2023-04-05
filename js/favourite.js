const searchList = document.getElementById('search-list');
let favMovieList = [];
let movieList = [];
let noResult = document.getElementById('no-result');

function displayMovieList() {
    if (movieList && movieList.length >0) {
        searchList.innerHTML = '';
        noResult.innerHTML ='';
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
    }else{
        searchList.innerHTML = '';
        noResult.innerHTML = '<h4>No favourites added</h4>';
    }


}

function addToFav(imdbID) {
    if (!favMovieList.includes(imdbID, 0)) {
        favMovieList.push(imdbID);
        localStorage.setItem('favMovieList', JSON.stringify(favMovieList));
        loadfavMovies();
    }
}

function removeFromfav(imdbID) {
    if (favMovieList.includes(imdbID, 0)) {
        const newfavMovieList = favMovieList.filter(function (Id) {
            return Id !== imdbID;
        });
        favMovieList = newfavMovieList;
        localStorage.setItem('favMovieList', JSON.stringify(favMovieList));
        loadfavMovies();
    }
}

async function loadfavMovies() {
    movieList = [];
    for (let index = 0; index < favMovieList.length; index++) {
        const result = await fetch(`https://www.omdbapi.com/?i=${favMovieList[index]}&apikey=e64b8c75`);
        const movieDetails = await result.json();
        movieList.push(movieDetails);
    }
    displayMovieList();
}

function movieDetails(imdbID) {
    movieSearchBox.value = "";
    window.location.href = `Movie.html?id=${imdbID}`;
}

function InitialiseFavouritePage() {
    if (localStorage.getItem("favMovieList") === null) {
        localStorage.setItem('favMovieList', JSON.stringify(favMovieList));
    } else {
        favMovieList = JSON.parse(localStorage.getItem('favMovieList'));
    }
    loadfavMovies();
}
InitialiseFavouritePage();