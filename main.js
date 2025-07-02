// const imdbIcon = document.getElementById('logo')
// if(imdbIcon){
//     imdbIcon.addEventListener('click', function(){
//     window.location.href = 'index.html';
//   }) 
// }

const apiKey = '6d04f0b5';
const searchInput = document.getElementById('movie-searchbox');
const suggestionList = document.getElementById("search-list");

searchInput.addEventListener('input', function () {
  const searchTerm = this.value.trim();

  if (searchTerm === '') {
    suggestionList.innerHTML = '';
    suggestionList.style.display = 'none';
    return;
  }

  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchTerm)}`)
    .then(response => response.json())
    .then(data => {
      if (data.Response === 'True') {
        suggestionsDisplay(data.Search);
        suggestionList.style.display = 'block';
       } else {
        suggestionList.innerHTML = '';
      }
    })
    .catch(error => console.error('Error fetching search results:', error));

});

function suggestionsDisplay(suggestions) {
  const maxSuggestions = 5;

  if (suggestions.length === 0) {
    suggestionList.textContent = "No result found";
  }

  suggestionList.innerHTML = '';

  for (let i = 0; i < Math.min(suggestions.length, maxSuggestions); i++) {
    const suggestion = suggestions[i];
    const suggestionLink = document.createElement('div');
    suggestionLink.classList.add('suggestionLink', 'suggestionLinkDisplay');

    const posterImg = document.createElement('img');
    posterImg.src = suggestion.Poster !== 'N/A' ? suggestion.Poster : 'src/samplePoster.jpg';
    posterImg.alt = suggestion.Title;
    posterImg.classList.add('poster-img');
    suggestionLink.appendChild(posterImg);

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info');

    const titleSpan = document.createElement('div');
    titleSpan.textContent = suggestion.Title;
    titleSpan.style.paddingTop = '2vh';
    infoDiv.appendChild(titleSpan);

    const yearOfRelease = document.createElement('div');
    yearOfRelease.textContent = "Year of release: " + suggestion.Year;
    infoDiv.appendChild(yearOfRelease);

    suggestionLink.appendChild(infoDiv);
    
    

    suggestionLink.addEventListener('click', function () {
      suggestionList.innerHTML = '';
      localStorage.setItem('movieInfo', JSON.stringify(suggestion));
      window.location.href = 'movieInfo.html';
    });

    suggestionList.appendChild(suggestionLink);
  }
  console.log(suggestionList)
}






