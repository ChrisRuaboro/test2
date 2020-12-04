document.getElementById("search_bar").addEventListener("submit", function (event) {
    event.preventDefault();
    console.log('submitted');
    let search = event.target.search.value;
    // create the container for the cards
    const newCard = document.createElement("div");
    newCard.classList = "keyword_card";
    newCard.id = "card";
    // Create all elements inside the keyword card
    const title = document.createElement("h5");
    title.id = search;
    title.innerHTML = search;
    const newMoviesBtn = document.createElement("button");
    newMoviesBtn.innerHTML = "Movies";
    newMoviesBtn.id = "newMoviesBtn";
    const newGifsBtn = document.createElement("button");
    newGifsBtn.innerHTML = "Gifs";
    newGifsBtn.id = "newGifsBtn";
    // add everything to the card
    newCard.appendChild(title);
    newCard.appendChild(newMoviesBtn);
    newCard.appendChild(newGifsBtn);
    document.getElementById("search_container").appendChild(newCard);
    // Functionality to the buttons
    document.getElementById("newMoviesBtn").addEventListener("click", function (e) {
        let keyword = search;
        getUserMovies(keyword);
    });
    document.getElementById("newGifsBtn").addEventListener("click", function (e) {
        let keyword = search;
        getUserGifs(keyword);
    });

});




function getUserMovies(inputSearch) {
    let search = inputSearch;
    axios
        .get(`http://www.omdbapi.com/?apikey=${process.env.API_KEY}s=${search}&limit=12`)
        .then(function (res) {
            const movies = res.data["Search"];
            console.dir(movies);
            movies.map(movie => {
                const moviePoster = movie.Poster;
                const photo = document.createElement("img");
                photo.src = moviePoster;

                const title = document.createElement("p");
                title.innerHTML = movie.Title;
                document.querySelector("#movie_container").appendChild(title);
                document.querySelector("#movie_container").appendChild(photo);
            })
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getUserGifs(inputSearch) {
    let search = inputSearch;
    axios
        .get(`http://api.giphy.com/v1/gifs/search?api_key=GCe4r0Mc6442gBhHLKn0BVl4wIndcOJu&q=${search}&limit=12`)
        .then(function (res) {
            const gifs = res.data.data;
            //console.log(gifs[0]);
            gifs.map(gif => {
                const url = gif.images.downsized.url;

                const photo = document.createElement("img");
                photo.src = url;

                const title = document.createElement("p");
                title.innerHTML = gif.title;
                document.querySelector("#gifs_container").appendChild(title);
                document.querySelector("#gifs_container").appendChild(photo);
            })
        })
        .catch(function (error) {
            console.log(error);
        });

}