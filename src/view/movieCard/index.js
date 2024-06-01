import MovieImage from "./movieImage";
import MovieScore from "./movieScore";
import MovieTitle from "./movieTitle";

class MovieCard {
  constructor(movieImage, title, score) {
    this.movieImage = new MovieImage(movieImage, title).element;
    this.movieTitle = new MovieTitle(title).element;
    this.movieScore = new MovieScore(score).element;
    this.element = this.render();
  }

  render() {
    const a = document.createElement("a");
    const card = document.createElement("div");
    card.classList.add("item-card");
    card.appendChild(this.movieImage);
    card.appendChild(this.movieTitle);
    card.appendChild(this.movieScore);
    a.appendChild(card);

    return a;
  }
}

export default MovieCard;
