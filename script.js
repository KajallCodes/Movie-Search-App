const movieName = document.getElementById("movieName");
const movieContainer = document.getElementById("movieContainer");


let timer;
let currentSearch="";

movieName.addEventListener("input",(event)=>{
    const value=event.target.value.trim();
    clearTimeout(timer);
    timer=setTimeout(()=>{
        userInput(value);
    },500);
});


function userInput(value){
const input = value.trim();
const url = `API-KEY${value}`;
currentSearch = value;
if (!input){
    movieContainer.innerHTML = "";
   return; 
} 
else{
movieContainer.innerHTML="Loading...";
fetch(url)
.then(res=>res.json())
.then(data=>{
    movieContainer.innerHTML="";
    if(data.Response==="False"){
        movieContainer.innerHTML = data.Error;
        return;
    }
    data.Search.forEach(movie=>{
        const div = document.createElement("div");
        const title = document.createElement("h3");
        const img = document.createElement("img");
        title.innerText = movie.Title;
        movieContainer.appendChild(div);
        div.appendChild(img);
        div.appendChild(title);
        img.src=movie.Poster;
        div.classList.add("movie-card");
        img.classList.add("movie-poster");
        div.addEventListener("click",()=>{
            fetchMovieDetails(movie.imdbID)
        });
         
          
    })
})
.catch(error=>console.log("Error"))
}
}

function fetchMovieDetails(id){
    const imdbID = `API-KEY&i=${id}`;
    fetch(imdbID)
    .then(res=>res.json())
    .then(data=>{
        movieContainer.innerHTML = "";
        const div = document.createElement("div");
        div.innerHTML=`<img src="${data.Poster}">
                        <h2>${data.Title}</h2>
                        <p>Actors:${data.Actors}</p>
                        <p>Country:${data.Country}</p>
                        <p>Director:${data.Director}</p>
                        <p>Genre:${data.Genre}</p>
                        <p>Plot:${data.Plot}</p>
                        <p>Year:${data.Year}</p>
                        <p>imdbRating:${data.imdbRating}</p>
                        <button>Back</button>`
    const button = div.querySelector("button");
    button.addEventListener("click",()=>{
        userInput(currentSearch);
    })
       movieContainer.appendChild(div);                 
    })
}


