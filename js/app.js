//selectores
const inputSearch = document.querySelector("#search");
const container = document.querySelector(".cards-container");

let timer;

//event listener

function loadEventListenerBtn() {
  const btnShowMore = document.querySelectorAll(".btn-show");
  console.log(btnShowMore);
  btnShowMore.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log(btn);
      const movieID = btn.getAttribute("movie-id");
      console.log(movieID);
    });
  });
}

inputSearch.addEventListener("input", (event) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    getMovies(event.target.value);
  }, 1000);
});

async function getMovies(title) {
  const URL = `https://www.omdbapi.com/?apikey=690d22ef&s=${title}`;
  const response = await fetch(URL);
  const data = await response.json();

  printMovies(data.Search);
}

function printMovies(movies) {
  clearHTML();

  if (!movies) {
    const titleAlert = document.createElement("h2");
    titleAlert.textContent = "¡No se encontraron películas con este nombre!🎬";
    titleAlert.classList.add("alert");
    container.appendChild(titleAlert);
    return;
  }
  movies.forEach((movie) => {
    console.log(movie);
    container.innerHTML += `
            <div class="card">
                <img
                    src="${movie.Poster}"
                    alt="poster"
                />
                    <h2 class="title-card">${movie.Title}</h2>
                    <p>Año <span>${movie.Year}</span></p>
                    <p>tipo <span>${movie.Type}</span></p>
                    <button type="button" class="btn-show" movie-id="${movie.imdbID}">Ver más</button>
            </div>
        
        `;
  });
  loadEventListenerBtn();
}

function clearHTML() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}
