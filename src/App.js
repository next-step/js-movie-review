import { Header } from "./js/components/header";
import { movieCardsList, skeleton } from "./js/components/main";
import { Main } from "./js/components/main/main";
import { MovieList } from "./js/domain/MovieList";

export default class App {
  movieList;

  constructor() {
    this.movieList = new MovieList({ page: 1 });
  }

  async init() {
    const app = document.getElementById("app");
    const header = Header.render();
    const main = await Main.render();

    app.appendChild(header);
    app.appendChild(main);

    this.loadMovieList();
    this.showMoreMovies();
  }

  async loadMovieList() {
    try {
      skeleton.load();

      const movies = await this.getMovieCards();
      movieCardsList.loadMovieList(movies);
    } catch (error) {
      alert(error.message)
      console.error(error);
    } finally {
      skeleton.remove();
    }
  }

  async getMovieCards() {
    const movieCards = await this.movieList.generateMovies();

    return movieCards;
  }

  async showMoreMovies() {
    const showMoreButton = document.querySelector(".show-more");

    showMoreButton.addEventListener("click", async () => {
      this.movieList.nextPage();
      await this.loadMovieList();
    });
  }
}
