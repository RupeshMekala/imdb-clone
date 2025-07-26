function favDisplay(){
  const arr = JSON.parse(localStorage.getItem('favArr')) || [];

  let size = arr.length;

  let parent = document.getElementById('horizontal-scrollbar');
  parent.innerHTML = '';

  if(size === 0){
    const msg = document.createElement('div');
    msg.innerText = 'No Favourites yet!!!!!!';
    msg.style.fontSize = '200%';
    msg.style.color = 'black';
    msg.style.margin = 'auto';
    parent.appendChild(msg);
    return;
  }


  for(let i = 0; i < arr.length; i++){
    // made a displaycard with unique id, className and will append poster and details into it

    let favBtn = document.createElement('i');
    favBtn.classList.add('my-fav-btn', 'fa-solid', 'fa-heart');
    favBtn.id = `btn${i}`;
    let displayCard = document.createElement('div');
    let details = document.createElement('div');
    displayCard.id = `${i}`;
    displayCard.className = 'displayCard';
    
    let year = document.createElement('div');
    year.className = 'element';
    year.innerHTML = `Year: ${arr[i].Year}`;
    let cast = document.createElement('div');
    cast.className = 'element';
    cast.innerHTML = `Cast: ${arr[i].Actors}`;
    let director = document.createElement('div');
    director.className = 'element';
    director.innerHTML = `Director: ${arr[i].Director}`;
    let plot = document.createElement('div');
    plot.className = 'element';
    plot.innerHTML = arr[i].Plot;
    details.appendChild(plot)
    details.appendChild(cast)
    details.appendChild(director)
    details.appendChild(year)

    details.id = `details${i}`;
    details.className = 'details';
    // details div is made
    // now making poster div
    let image = document.createElement('img');
    image.src = arr[i].Poster;
    image.className = 'image';
    // poster div is made
    // now putting details and poster into displayCard
    displayCard.appendChild(favBtn);
    displayCard.appendChild(image);
    displayCard.appendChild(details);
    parent.appendChild(displayCard);

    favBtn.addEventListener('click', function () {
      const updatedArr = JSON.parse(localStorage.getItem('favArr')) || [];
      updatedArr.splice(i, 1);
      favBtn.classList.add('fa-regular');
      favBtn.classList.remove('fa-solid');
      localStorage.setItem('favArr', JSON.stringify(updatedArr));
      favDisplay();
    })
  }
  parent.scrollLeft = 0;

  let bar = document.getElementById('horizontal-scrollbar');
  bar.style.width = `${(size * 300)}px`;

}


favDisplay();












