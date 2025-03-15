import { getMovie } from "./api/MovieApiCall.js";
import { initMovieRender, addMovieRender } from "./component/Movie.js";
import MoviePopularApiQuery from "./api/MoviePopularApiQuery.js";
import { initHeader } from "./component/Header.js";
import { initTab } from "./component/Nav.js";
import { initFooter } from "./component/Footer.js";
import MovieSearchApiQuery from "./api/MovieSearchApiQuery.js";

const NEXTPAGE_NUM = 1;
const FIRST_PAGE = 1;
class Main {
  #page;
  #movieApiQuery;

  async init() {
    addEventListener("load", async () => {
      this.#initPage();
      this.#movieApiQuery = new MoviePopularApiQuery({
        includeAdult: false,
        includeVideo: false,
        page: this.#page,
        sortBy: "popularity.desc",
      });

      const movieListInstance = await getMovie(this.#movieApiQuery);
      this.#page = movieListInstance.page;
      initHeader(movieListInstance.firstMovie);
      initTab();
      initMovieRender(movieListInstance, "지금 인기있는 영화 ");
      initFooter();

      this.#enrollClickEvent();
    });
  }

  #enrollClickEvent() {
    this.#clickMoreButton();
    this.#clickSearchButton();
  }

  #clickMoreButton() {
    document.querySelector(".more-btn").addEventListener("click", async () => {
      this.#nextPage();
      this.#movieApiQuery.updatePage(this.#page);

      const movieListInstance = await getMovie(this.#movieApiQuery);
      this.#page = movieListInstance.page;
      addMovieRender(movieListInstance);

      if (movieListInstance.isLastPage()) {
        document.querySelector(".more-btn").classList.add("none");
      }
    });
  }

  #clickSearchButton() {
    const searchInput = document.querySelector(".search-input");

    searchInput.addEventListener("click", async () => {
      this.#initPage();
      await this.#searchMovie(searchInput.value);
    });

    searchInput.addEventListener("keydown", async (event) => {
      if (event.key === "Enter") {
        this.#initPage();
        await this.#searchMovie(searchInput.value);
      }
    });
  }

  async #searchMovie(inputValue) {
    this.#movieApiQuery = new MovieSearchApiQuery({
      includeAdult: false,
      keyword: inputValue,
      page: this.#page,
    });
    const movieListInstance = await getMovie(this.#movieApiQuery);
    initMovieRender(movieListInstance, inputValue + " 검색결과");
  }

  #nextPage() {
    this.#page += NEXTPAGE_NUM;
  }

  #initPage() {
    this.#page = FIRST_PAGE;
  }
}

const main = new Main();
main.init();
