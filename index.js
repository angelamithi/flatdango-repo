let counterTickets=0;
function loadFirstMovie(){
    const ulItem=document.querySelector("#list-item");
    const imgContainer=document.querySelector("div#image-container")
   
    fetch("http://localhost:3000/films/1")
    .then(resp=>resp.json())
    .then(data=>{
        
       const posterImg=document.createElement("img");
        posterImg.src=data.poster;
        posterImg.alt=data.title;
        const filmTitle=document.createElement("li");
        filmTitle.textContent="Film Title: "+ data.title;
        const filmRunTime=document.createElement("li")
        filmRunTime.textContent="RunTime:  " + data.runtime;
        const filmShowTime=document.createElement("li");
        filmShowTime.textContent="ShowTime: "+ data.showtime;
        const numberofTicketsAvailable=document.createElement("li");
        numberofTicketsAvailable.textContent="Available Tickets:"+(data.capacity-data.tickets_sold);
        
       

        imgContainer.appendChild(posterImg);
        ulItem.appendChild(filmTitle);
        ulItem.appendChild(filmRunTime);
        ulItem.appendChild(filmShowTime);
        ulItem.appendChild(numberofTicketsAvailable);
        
        
           
                
    })
    
}

function loadAllMovies(){
    const movieList=document.querySelector("ul#films");
   // const buttonHolder=document.querySelector("div#buttonbtn");
    fetch("http://localhost:3000/films")
    .then(resp=>resp.json())
    .then(data=>{
        data.forEach(item=>{
            const movieName=document.createElement("li");
            movieName.textContent=item.title;
            movieName.setAttribute("data-id",item.id)
            movieList.appendChild(movieName);
            
        })
    })
}

document.addEventListener("DOMContentLoaded",()=>{
 loadFirstMovie();
 loadAllMovies();
 

const purchaseTicket=document.querySelector("#button button");
purchaseTicket.addEventListener("click",()=>{
    const selectedMovieId=document.querySelector("li.selected").getAttribute("data-id");
    fetch(`http://localhost:3000/films/${selectedMovieId}`)
    .then(resp=>resp.json())
    .then(data=>{
        if(data.tickets_sold<data.capacity){
            const prompt=document.querySelector("p");
            prompt.textContent="Available Tickets:" + (data.capacity-data.tickets_sold);
        } else{
            prompt.textContent="No Tickets Available!!";
        }
        
    })
         
            
    })

    document.querySelector("ul#films").addEventListener("click", event => {
        if (event.target.tagName === "LI") {
            const selectedMovie = event.target;
            document.querySelectorAll("li").forEach(item => {
                item.classList.remove("selected");
            });
            selectedMovie.classList.add("selected");
        }
    });
    
            






})