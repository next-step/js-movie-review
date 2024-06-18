import { Header } from "./js/components/header";
import { movieCardsList, skeleton } from "./js/components/main";
import { errorDialog } from "./js/components/main/error/error-dialog";
import { Main } from "./js/components/main/main";
import { MovieList } from "./js/domain/MovieList";

export default class App {
  movieList;
  #app;
  #header;
  #main;

  constructor() {
    this.movieList = new MovieList({ page: 1 });
    this.#app = document.getElementById("app");
    this.#header = Header.render();
    this.#main = Main.render();
  }

  async init() {
    this.#app.appendChild(this.#header);
    this.#app.appendChild(this.#main);

    this.loadMovieList();
    this.showMoreMovies();
  }

  async loadMovieList() {
    try {
      skeleton.load();

      const movies = await this.getMovieCards();
      movieCardsList.load(movies);
    } catch (error) {
      errorDialog.load(error);
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
