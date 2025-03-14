import { getMovie } from "./api/MovieApiCall.js";
import { initMovieRender, addMovieRender } from "./component/Movie.js";
import MovieApiQuery from "./api/MovieApiQuery.js";

class Main {
  #page;
  #movieApiQuery;

  async init() {
    addEventListener("load", async () => {
      this.#enrollClickEvent();

      this.#movieApiQuery = new MovieApiQuery({
        includeAdult: false,
        includeVideo: false,
        page: 1,
        sortBy: "popularity.desc",
      });

      const movieListInstance = await getMovie(this.#movieApiQuery);
      this.#page = movieListInstance.page;
      initMovieRender(movieListInstance, "지금 인기있는 영화 ");
    });
  }

  #enrollClickEvent() {
    this.#clickMoreButton();
  }

  #clickMoreButton() {
    document.querySelector(".more-btn").addEventListener("click", async () => {
      this.#movieApiQuery.nextPage();

      const movieListInstance = await getMovie(this.#movieApiQuery);
      this.#page = movieListInstance.page;
      addMovieRender(movieListInstance);

      if (movieListInstance.isLastPage()) {
        document.querySelector(".more-btn").classList.add("none");
      }
    });
  }
}

const main = new Main();
main.init();
