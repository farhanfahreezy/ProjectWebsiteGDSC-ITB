const main = document.getElementById("main");
const bagianPopup = document.getElementById("bagianPopup");
const form = document.getElementById("form");
const search = document.getElementById("search");

const API_KEY = "api_key=ff68deee8aaa8382419578eab66a3551";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const SEARCH_URL = BASE_URL + "/search/movie?" + API_KEY;

let results;
getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let hasil = data.results;
      console.log(hasil);
      showMovies(hasil);
    });
}

function showMovies(data) {
  main.innerHTML = ``;

  data.forEach((movie) => {
    const { id, poster_path, title, vote_average, overview, release_date } =
      movie;
    var tahunKeluar = release_date.substr(0, 4);
    const movieEl = document.createElement("div");
    movieEl.classList.add("movieEl");
    movieEl.innerHTML = `
            <div class="movie">
                <img onclick="bukaPopup(${id})" class="posterFilm" src="${
      poster_path
        ? IMG_URL + poster_path
        : "http://via.placeholder.com/1080x1580"
    }" alt="${title}">
                <div class="movie-info">
                    <h3>${title} (${tahunKeluar})</h3>
                    <span class="rating">${vote_average}</span>
                </div>
            </div>
            `;

    main.appendChild(movieEl);
    const moviePopup = document.createElement("div");
    moviePopup.classList.add("popupnya");
    moviePopup.innerHTML = `
            <aside class="popup" id="${id}" >
                <img class="posterFilmPopup" src="${
                  poster_path
                    ? IMG_URL + poster_path
                    : "http://via.placeholder.com/1080x1580"
                }">
                <button class="close-button" onclick="tutupPopup(${id})" >&times;</button>
                <article class="overview">
                    <h2 class="judulPopup">${title}</h2>
                    <h3>Description</h3>
                    <p class="deskripsiFilm">${overview}</p>
                    <a class="linkYutup" href="https://www.youtube.com/results?search_query=${title} trailer" target="_blank">Watch Trailer</a>
                </article>
            </aside>`;
    body.appendChild(moviePopup);
  });
}

function bukaPopup(tujuanBuka) {
  var bukain = document.getElementById(tujuanBuka);
  bukain.classList.add("active");
  var overlay = document.getElementById("overlay");
  overlay.classList.add("active");
}

function tutupPopup(tujuanTutup) {
  var tutupin = document.getElementById(tujuanTutup);
  tutupin.classList.remove("active");
  var overlay = document.getElementById("overlay");
  overlay.classList.remove("active");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(SEARCH_URL + "&query=" + searchTerm);
  }
});
