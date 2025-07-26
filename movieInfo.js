
const movieInfo = JSON.parse(localStorage.getItem('movieInfo'));
document.title = movieInfo.Title;

const apiKey = '4574d603';
const movie = movieInfo.Title;
const Movieyear = movieInfo.Year;

let movieDetails;

async function fetchMovieDetails(movie, Movieyear) {
  const url = `http://www.omdbapi.com/?t=${encodeURIComponent(movie)}&y=${Movieyear}&apikey=${apiKey}`;

  const data = await fetch(url);
  const finalData = await data.json();
  return finalData;
}


async function displayDetails(){
  movieDetails = await fetchMovieDetails(movie, Movieyear);
  if(movieDetails.Poster){
    document.getElementById('poster').src = movieDetails.Poster;
  }
  document.getElementById('title').innerHTML = movie; 
  document.getElementById('type').innerHTML = `Type: ${movieDetails.Type}`; 
  document.getElementById('genre').innerHTML = `Genre: ${movieDetails.Genre}`;
  document.getElementById('year').innerHTML = `Year: ${Movieyear}`;
  document.getElementById('cast').innerHTML = `Cast: ${movieDetails.Actors}`; 
  document.getElementById('director').innerHTML = `Director: ${movieDetails.Director}`; 
  document.getElementById('plot').innerHTML = `Plot: ${movieDetails.Plot}`;
  console.log(movieDetails);
  document.getElementById('imdb-rating').innerHTML = `IMdB rating: ${movieDetails.Ratings[0].Value}`
  if(movieDetails.Ratings[1]){
    document.getElementById('rottentomatoes-rating').innerHTML = `Rotten tomatoes Rating: ${movieDetails.Ratings[1].Value}`
  }
  else{
    document.getElementById('rottentomatoes-rating').innerHTML = "Rotten tomatoes Rating: N/A"
  }
  if(movieDetails.Ratings[2]){
    document.getElementById('metacritic-rating').innerHTML = `Metacritic Rating: ${movieDetails.Ratings[2].Value}`;
  }
}

const heartIcon = document.querySelector('.fav-btn');

let favArr = [];

heartIcon.addEventListener('click', function(){
  if(heartIcon.classList.contains("fa-regular")){
    if(localStorage.getItem('favArr')){
      favArr = JSON.parse(localStorage.getItem('favArr'));
      movieDetails.isFavourite = true;
      favArr.push(movieDetails);
      localStorage.setItem('favArr', JSON.stringify(favArr));
    }
    else{
      favArr.push(movieDetails)
      movieDetails.isFavourite = true;
      localStorage.setItem('favArr', JSON.stringify(favArr));
    }
    heartIcon.classList.remove("fa-regular");
    heartIcon.classList.add("fa-solid")
  }
  else if(heartIcon.classList.contains("fa-solid")){
    heartIcon.classList.remove("fa-solid");
    heartIcon.classList.add("fa-regular")
    favArr = JSON.parse(localStorage.getItem('favArr'))
    updatedArr = favArr.filter(obj => !(obj.Title === movie && obj.Year === Movieyear))
    localStorage.setItem('favArr', JSON.stringify(updatedArr));
  }
})

function btnStatusCheck(){
  const favArr = JSON.parse(localStorage.getItem('favArr'))
  if(favArr){
    const includes = favArr.some(obj => obj.Title === movie && obj.Year === Movieyear);
    if(includes){
      heartIcon.classList.remove("fa-regular");
      heartIcon.classList.add("fa-solid");
    }
  }
}

displayDetails();
btnStatusCheck();















