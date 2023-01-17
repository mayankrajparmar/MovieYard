//Initial References
let movieNameRef = document.getElementById("title-search-box");
let movieYearRef = document.getElementById("year-search-box");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

//Function to fetch data from API
let getMovie = () => {
  let movieName = movieNameRef.value;
  let yearName = movieYearRef.value;
  let url = `http://www.omdbapi.com/?t=${movieName}&y=${yearName}&apikey=ee4b7d4a`;
  //If input field is empty
  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Please Enter A Movie Name</h3>`;
  }
  //If input field is NOT empty
  else {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        //If movie exists in database
        if (data.Response == "True") {
          result.innerHTML = `
          <div class="info">
                <img src=${data.Poster} class="poster">
                <div>
                  <h2>${data.Title}</h2>
                    <div class="rating">
                        <h4>imdbRating:</h4>
                        <img src="star-icon.svg">
                        <h4>${data.imdbRating}</h4>
                    </div>
                    <div class="details">
                         
                        <span><b>Released Date:</b> ${data.Released}</span>
                        <span><b>Duration:</b> ${data.Runtime}</span>
                    </div>
                    <div class="genre">
                        <div>${data.Genre.split(",").join("</div><div>")}</div>
                    </div>
                </div>
            </div>
            <h3>Language:</h3>
            <p>${data.Language}</p>
            <h3>Actors:</h3>
            <p>${data.Actors}</p> 
            <h3>Writer:</h3>
            <p>${data.Writer}</p>
            <h3>Director:</h3>
            <p>${data.Director}</p>
            <h3>Plot:</h3>
            <p>${data.Plot}</p>
        `;
        }
        //If movie does NOT exists in database
        else {
          result.innerHTML = `<h3 class='msg'>${data.Error}</h3>`;
        }
      })
      //If error occurs
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
      });
  }
};
searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);