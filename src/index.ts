import "../templates/logo.png";
import "../templates/star_filled.png";
import "../templates/star_empty.png";
import App from "./js/domain/App";
import MovieCardList from "./js/view/MovieCardList";
import MovieListModel from "./js/domain/MovieListModel";
import SearchBox from "./js/view/SearchBox";
import ShowMoreButton from "./js/view/ShowMoreButton";
import Modal from "./js/view/MovieDetailModal";
import UserMovieRatingForm from "./js/view/UserMovieRatingForm";
import MovieModel from "./js/domain/MovieModel";

const main = () => {
  const app = new App();
  const movieList = new MovieListModel();
  let currentMovie: MovieModel | null = null; // 현재 모달에 표시되는 영화

  addEventListener("DOMContentLoaded", async () => {
    MovieCardList.addSkeleton();

    await app.init(movieList);

    MovieCardList.removeSkeleton();
    MovieCardList.render(movieList.movies);
  });

  MovieCardList.elements.movieCardList?.addEventListener(
    "click",
    (e: Event) => {
      const target = e.target as HTMLDivElement;
      const movieId = target.closest<HTMLDivElement>(".item-card")?.dataset?.id;

      const movie = movieList.getMovieById(Number(movieId));

      if (!movie) {
        return;
      }

      currentMovie = movie;
      Modal.open(currentMovie);
    }
  );

  // 모달 관련 이벤트 리스너
  Modal.elements.modal?.addEventListener("click", Modal.close.bind(Modal));
  Modal.elements.closeBtn?.addEventListener("click", Modal.close.bind(Modal));
  Modal.elements.modalInner?.addEventListener("click", (e: Event) => {
    e.stopPropagation();
  });
  window.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      Modal.close();
    }
  });

  // 별점 폼 이벤트 관련 리스너
  UserMovieRatingForm.elements.userRating.addEventListener(
    "mouseover",
    UserMovieRatingForm.handleHover
  );
  UserMovieRatingForm.elements.userRating.addEventListener("mouseleave", () => {
    UserMovieRatingForm.handleMouseLeave(currentMovie.userRating);
  });
  UserMovieRatingForm.elements.userRating.addEventListener(
    "click",
    async (e: Event) => {
      if (!currentMovie) {
        return;
      }

      await UserMovieRatingForm.handleClick(e, currentMovie);
    }
  );

  // 더보기 버튼 관련 이벤트 리스너
  ShowMoreButton.elements.button?.addEventListener("click", async () => {
    await ShowMoreButton.handleClick(app, movieList);
  });

  // 검색박스 관련 이벤트 리스너
  SearchBox.elements.searchInput?.addEventListener("input", (e: InputEvent) => {
    SearchBox.handleInputSearchQuery(e, app);
  });
  SearchBox.elements.searchButton?.addEventListener("click", () => {
    SearchBox.handleSubmitSearchQuery(app, movieList);
  });
  SearchBox.elements.searchInput?.addEventListener(
    "keypress",
    async (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        await SearchBox.handleSubmitSearchQuery(app, movieList);
      }
    }
  );
};

main();
