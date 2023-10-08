let counterTickets = 0;

function loadFirstMovie() {
    const ulItem = document.querySelector("#list-item");
    const imgContainer = document.querySelector("div#image-container");

    fetch("http://localhost:3000/films/1")
        .then(resp => resp.json())
        .then(data => {
            const posterImg = document.createElement("img");
            posterImg.src = data.poster;
            posterImg.alt = data.title;
            const filmTitle = document.createElement("li");
            filmTitle.textContent = "Film Title: " + data.title;
            const filmRunTime = document.createElement("li");
            filmRunTime.textContent = "RunTime:  " + data.runtime;
            const filmShowTime = document.createElement("li");
            filmShowTime.textContent = "ShowTime: " + data.showtime;
            const numberofTicketsAvailable = document.createElement("li");
            numberofTicketsAvailable.textContent = "Available Tickets:" + (data.capacity - data.tickets_sold);

            imgContainer.innerHTML = ""; 
            imgContainer.appendChild(posterImg);
            ulItem.innerHTML = ""; 
            ulItem.appendChild(filmTitle);
            ulItem.appendChild(filmRunTime);
            ulItem.appendChild(filmShowTime);
            ulItem.appendChild(numberofTicketsAvailable);

        })
}

function loadAllMovies() {
    const movieList = document.querySelector("ul#films");
    fetch("http://localhost:3000/films")
        .then(resp => resp.json())
        .then(data => {
            data.forEach(item => {
                const movieName = document.createElement("li");
                movieName.textContent = item.title;
                movieName.addEventListener("click", () => {
                    movieClickEvent(item.id);
                });
                movieList.appendChild(movieName);
            });
        });
}

function movieClickEvent(id) {
    const listHolder = document.querySelector("#list-item");
    const imgContainer = document.querySelector("div#image-container");

    fetch(`http://localhost:3000/films/${id}`)
        .then(resp => resp.json())
        .then(data => {
            const clickedFilmPoster=document.createElement("img");
            clickedFilmPoster.src=data.poster;
            clickedFilmPoster.alt=data.title;
            const clickedFilmTitle = document.createElement("li");
            clickedFilmTitle.textContent = "Film Title: " + data.title;
            const clickedMovieRunTime = document.createElement("li")
            clickedMovieRunTime.textContent = "RunTime:  " + data.runtime;
            const clickedFilmShowTime = document.createElement("li");
            clickedFilmShowTime.textContent = "ShowTime: " + data.showtime;
            const numberofTicketsAvailable = document.createElement("li");
            numberofTicketsAvailable.textContent = "Available Tickets:" + (data.capacity - data.tickets_sold);

            imgContainer.innerHTML = ""; 
            imgContainer.appendChild(clickedFilmPoster);
            listHolder.innerHTML = ""; // 
            listHolder.appendChild(clickedFilmTitle);
            listHolder.appendChild(clickedMovieRunTime);
            listHolder.appendChild(clickedFilmShowTime);
            listHolder.appendChild(numberofTicketsAvailable);

            purchaseTicket(id, numberofTicketsAvailable);
        });
}

function purchaseTicket(id, ticketsAvailable) {
    const purchaseButton = document.querySelector("button");
    purchaseButton.addEventListener("click", () => {
        if (ticketsAvailable.textContent > 0) {
            ticketsAvailable.textContent = ticketsAvailable.textContent - 1;
            counterTickets++;
           
        } else {
            alert("No more tickets available!");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadFirstMovie();
    loadAllMovies();
});
