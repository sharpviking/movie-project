const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'
const main=document.getElementById('main')
const form=document.getElementById('form')
const search=document.getElementById('search')
getMovies(API_URL)
async function getMovies(url){
    const r= await fetch(url)
    const data= await r.json()
 
    showMovies(data.results)
}
function showMovies(movies){
    main.innerHTML=''
    movies.forEach((movie) =>{
        const{title,poster,vote,overview} = movie
        const melements= document.createElement('div')
        melements.classList.add('movie')
        melements.innerHTML=`<IMG SRC="${IMG_PATH+poster}" alt="${title}">
        <div class="movie-info">
        <h4>${title}</h4>
        <span class="${rating(vote)}">${vote}</span>
        </div>
        <div class='overview'>
        <h4> overview</h4>
        ${overview}
        </div>`
        main.appendChild(melements)
    })
}
 function rating(v)  {
    if(v >=8){
      return 'pink'
    }else if(v>=5){
        return 'green'
    }else{
        return 'red'
    }
 } 
 form.addEventListener('submit',(a)=>{
    //a.preventDefault()
    const searching= search.value;
    if(searching && searching!=''){
        getMovies(SEARCH_API+ searching)
        search.value=''
    }else{
        window.location.reload()
    }
    
 })
