import { getMovie } from "./api/MovieApiCall.js";
import { initMovieRender, addMovieRender } from "./component/Movie.js";
import MoviePopularApiQuery from "./api/MoviePopularApiQuery.js";
import { initHeader } from "./component/Header.js";
import { initNav } from "./component/Nav.js";
import { initFooter } from "./component/Footer.js";
import MovieSearchApiQuery from "./api/MovieSearchApiQuery.js";
import { openModal } from "./component/Modal.js";
import {
  hideLoadingIndicator,
  initIndicator,
  showLoadingIndicator,
} from "./component/Indicator.js";

const NEXTPAGE_NUM = 1;
const FIRST_PAGE = 1;
class Main {
  #page;
  #movieApiQuery;
  #movieList;

  async init() {
    this.#movieList = [];
    addEventListener("load", async () => {
      this.#initPage();
      this.#movieApiQuery = new MoviePopularApiQuery({
        includeAdult: false,
        includeVideo: false,
        page: this.#page,
        sortBy: "popularity.desc",
      });

      const movieListInstance = await getMovie(this.#movieApiQuery);
      this.#movieList = movieListInstance.movieModels;
      this.#page = movieListInstance.page;
      initHeader(movieListInstance.firstMovie);
      initNav();
      initMovieRender(movieListInstance, "지금 인기있는 영화 ");
      initIndicator();
      initFooter();

      this.#enrollClickEvent();
    });
  }

  #enrollClickEvent() {
    this.#scrollEvent();
    this.#clickSearchButton();
    this.#movieInfolick();
  }

  #scrollEvent() {
    window.addEventListener("scroll", this.#handleScroll.bind(this));
  }

  #handleScroll() {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight
    ) {
      this.#getMovieNextPage();
    }
  }

  async #getMovieNextPage() {
    this.#nextPage();
    this.#movieApiQuery.updatePage(this.#page);

    showLoadingIndicator();
    const movieListInstance = await getMovie(this.#movieApiQuery);
    hideLoadingIndicator();

    this.#movieList.push(...movieListInstance.movieModels);
    this.#page = movieListInstance.page;
    addMovieRender(movieListInstance);
    this.#movieInfolick();

    if (movieListInstance.isLastPage()) {
      window.removeEventListener("scroll", this.#handleScroll.bind(this));
    }
  }

  #clickSearchButton() {
    const searchInput = document.querySelector(".search-input");

    document
      .querySelector(".search-icon")
      .addEventListener("click", async () => {
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

  #movieInfolick() {
    const movieInfo = document.querySelectorAll(".item");

    movieInfo.forEach((info) => {
      if (!info.dataset.hasClickHandler) {
        info.addEventListener("click", () => {
          const movieItem = info.closest(".movie");
          const id = movieItem.querySelector("#movie-id").value;
          openModal(this.#getMovieById(id));
        });
        info.dataset.hasClickHandler = true;
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

    this.#enrollClickEvent();
  }

  #nextPage() {
    this.#page += NEXTPAGE_NUM;
  }

  #initPage() {
    this.#page = FIRST_PAGE;
  }

  #getMovieById(id) {
    return this.#movieList.find((movie) => {
      return movie.id === parseInt(id);
    });
  }
}

const main = new Main();
main.init();
