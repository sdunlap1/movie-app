//Wait for document to be loaded
$(document).ready(function () {
  //Create empty array
  let movies = [];

  //Initate sorting
  let sortTitleAsc = true;
  let sortRatingAsc = true;

  //Attach an event listener for the form submission
  $("#movieForm").submit(function (evt) {
    //Prevent default behavior
    evt.preventDefault();

    //Retrieve value entered in title input
    const title = $("#titleInput").val();
    //Retrieve value entered in rating input
    const rating = $("#ratingInput").val();

    //Check if fields are empty
    if (!title && !rating) {
      alert("Fill in all fields");
    }
    //Check for min 2 chars in title
    else if (title.length < 2) {
      alert("Title must have a min of 2 characters");
    }
    //Check to make sure rating is between 0 - 10
    else if (rating < 0 || rating > 10 || rating === "") {
      alert("Rating must be between 0 - 10");
    }
    //Store movie data in the array
    else {
      movies.push({ title, rating });
      displayMovies();
    }
  });

  //Function to display movies
  function displayMovies() {
    $("#movieList").empty(); //Clear the movie list before displaying update list
    movies.forEach(function (movie, index) {
      $("#movieList").append(
     `<div class="movie-item d-flex justify-content-between align-items-center mb-2">
        <div class="col-5">
          Title: ${movie.title}
        </div>
        <div class="col-5">
          Rating: ${movie.rating}
        </div>
        <div class="col-2 text-right">
          <button class="btn btn-danger remove-movie" data-index="${index}">Remove</button>
        </div>
      </div>`
      );
    });

    //Event listener to last added remove button
    $(".remove-movie").click(function () {
      const index = $(this).data("index");
      movies.splice(index, 1);
      displayMovies();
    });
  }

  //Attach event listener to sort buttons
  $("#sortByTitle").click(function () {
    if (sortTitleAsc) {
      movies.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      movies.sort((a, b) => b.title.localeCompare(a.title));
    }
    sortTitleAsc = !sortTitleAsc; //Toggles sorting
    displayMovies();
  });

  $("#sortByRating").click(function () {
    if (sortRatingAsc) {
      movies.sort((a, b) => a.rating - b.rating);
    } else {
      movies.sort((a, b) => b.rating - a.rating);
    }
    sortRatingAsc = !sortRatingAsc; //Toggles sorting
    displayMovies();
  });
});
