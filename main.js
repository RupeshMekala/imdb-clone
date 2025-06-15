

const favBtn= document.getElementById('fav')
if(favBtn){
    favBtn.addEventListener('click',function(){
    window.location.href = 'favourites.html';
  })
}


const imdbIcon = document.getElementById('logo')
if(imdbIcon){
    imdbIcon.addEventListener('click', function(){
    window.location.href = 'index.html';
  })
}



