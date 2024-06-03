import { Header } from "../components/header/header";
import { movieCardsList, skeleton } from "../components/main";
import { Main } from "../components/main/main";
import { MovieList } from "../domain/MovieList";

export class Controller {
  #currentPage = 1;
  movieList;

  constructor() {
    this.movieList = new MovieList();
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

      const movies = await this.getMovieCards({ page: this.#currentPage });
      movieCardsList.loadMovieList(movies);

      skeleton.remove();
    } catch (error) {
      console.error(error);
      skeleton.remove();
    }
  }

  async getMovieCards({ page = 1 }) {
    const movieCards = await this.movieList.generateMovies({ page });

    return movieCards;
  }

  async showMoreMovies() {
    const showMoreButton = document.querySelector(".show-more");

    showMoreButton.addEventListener("click", async () => {
      this.#currentPage += 1;
      await this.loadMovieList();
    });
  }
}
