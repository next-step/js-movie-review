import MovieImage from "./movieImage";
import MovieScore from "./movieScore";
import MovieTitle from "./movieTitle";

class MovieCard {
  constructor(movie) {
    const { title, poster_path: movieImage, vote_average: score } = movie;
    this.movieImage = new MovieImage(movieImage, title).element;
    this.movieTitle = new MovieTitle(title).element;
    this.movieScore = new MovieScore(score).element;
    this.element = this.element();
  }

  element() {
    const li = document.createElement("li");
    const card = document.createElement("div");
    card.classList.add("item-card");
    card.appendChild(this.movieImage);
    card.appendChild(this.movieTitle);
    card.appendChild(this.movieScore);
    li.appendChild(card);

    return li;
  }
}

export default MovieCard;
