const movieInfo = JSON.parse(localStorage.getItem('movieInfo'));
document.title = movieInfo.Title + "Year"+movieInfo.Year;

const movie = movieInfo.Title;
const Movieyear = movieInfo.Year;


async function fetchMovieDetails(movie, Movieyear) {
  const url = `http://www.omdbapi.com/?t=${encodeURIComponent(movie)}&y=${Movieyear}&apikey=${apiKey}`;
}

