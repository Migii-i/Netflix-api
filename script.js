let posterDiv = document.querySelector("#poster");
let netflixOriginalsDiv = document.querySelector("#netflixOriginals");

let Display = async() => {
    let posterFetch = await fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=0ed23b5b9572af150b129da57bec9cc1&with_genres=10749"
    );
    let netflixOriginalFetch = await fetch(
        "https://api.themoviedb.org/3/discover/tv?api_key=0ed23b5b9572af150b129da57bec9cc1"
        
    );
    let finalPosterFetch = await posterFetch.json();
    let randomIndex = Math.floor(Math.random()*finalPosterFetch.results.length);
    let result = finalPosterFetch.results[randomIndex];

    let posterPath = result.backdrop_path
     ?`https://image.tmdb.org/t/p/original${result.backdrop_path}`
     :"path_to_placeholder_image";

    posterDiv.innerHTML = `
        <div class="posterContainer">
            <img src="${posterPath}" alt="${result.title}">
            <div class="bottomfade"></div>
            <div class="posterDetails">
                <h1>${result.title || result.name}</h1>
                <div class="buttons">
                    <button class="play">Play</button>
                    <button class="more-info">Read more</button>
                </div>
            <p>${result.overview}</p>
        </div>
      </div>`
    let finalNetflixOriginalFetch = await netflixOriginalFetch.json();
    netflixOriginalsDiv.innerHTML = ``;

    let validNetflixResults = finalNetflixOriginalFetch.results.filter(
        (result) => result.poster_path
    );
    if( validNetflixResults.length=== 0){
        throw new Error("No valid Netflix Originals Found");
    }
    validNetflixResults.forEach((result) => {
        let netflixOriginalPath = `https://image.tmdb.org/t/p/w500${result.poster_path}`;

        netflixOriginalsDiv.innerHTML +=
        `<div class="netflixOriginalContainer">
          <img src="${netflixOriginalPath}" alt="${
      result.title || result.name
    }">
            </div>`;
        
    });
};

Display();
