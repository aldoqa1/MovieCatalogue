const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=cedd2ca16619835ce1845c6654b0d36d"
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie?api_key=cedd2ca16619835ce1845c6654b0d36d&query='";
const main = document.querySelector("main");
const search = document.querySelector(".search");
const form = document.querySelector(".form");


getMovies(API_URL);

search.addEventListener("keyup", e =>{
    main.innerText="";
    getMovies(SEARCH_URL+search.value);

});

async function getMovies(url){
    const res = await fetch(url);
    const resJson = await res.json();
    console.log(resJson);
    if(resJson.total_results>0){
        showResults(resJson.results);
    }else{
        main.innerHTML = "<h2>No resultados</h2>";
        if(search.value==""){
            getMovies(API_URL);
        }
    }


}

function showResults(results){
    main.innerHTML="";
    results.forEach(result => {
        const {title, vote_average, poster_path, overview} = result;
        divMovie = document.createElement("div");
        divMovie.classList.add("movie");
        divMovie.innerHTML = `
        <img src="${IMG_PATH+poster_path}" alt="pelicula">

        <div class="titulo">
            <h2>${title}</h2>
            <h2 class="${voteColor(vote_average)}">${vote_average}</h2>
        </div>

        <div class="oculto">
            <h2>Overview</h2>
            <p>${overview}</p>
        </div>`;

        main.appendChild(divMovie);

    });

}

function voteColor(vote){
    if(vote>8.5){
        return "green";
    }else{
        if(vote>6.5){
            return "yellow";
        }else{
            return "red";
        }
    }
}
