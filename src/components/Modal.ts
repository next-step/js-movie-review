import { RATING_MAP } from "../constants";
import { MovieModel } from "../types/type";
import { getUserRating, setUserRating } from "./../services/userRating";

export function Modal() {
  let modalElement: HTMLElement | null = null;
  let starsContainer: HTMLElement | null = null;
  let ratingText: HTMLElement | null = null;

  const createModalTemplate = () => {
    const template = document.createElement("div");
    template.innerHTML = `
      <div class="modal-background">
        <div class="modal">
          <button class="close-modal">&times;</button>
          <div class="modal-container">
            <div class="modal-image">
              <img src="" alt="Movie Poster">
            </div>
            <div class="modal-description">
              <h2 class="movie-title"></h2>
              <p class="category"></p>
              <p class="rate"><strong>평점:</strong> <span class="average-rating"></span></p>
              <div class="user-rating">
                <p><strong>내 별점</strong></p>
                <div class="stars"></div>
                <p class="user-rating-text"></p>
              </div>
              <hr>
              <p class="detail"></p>
            </div>
          </div>
        </div>
      </div>
    `;
    return template.firstElementChild as HTMLElement;
  };

  const render = () => {
    if (modalElement) {
      return;
    }

    modalElement = createModalTemplate();
    document.body.appendChild(modalElement);

    starsContainer = modalElement.querySelector(".stars");
    ratingText = modalElement.querySelector(".user-rating-text");

    modalElement
      .querySelector(".close-modal")
      ?.addEventListener("click", close);
    modalElement.addEventListener("click", (e) => {
      if (e.target === modalElement) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });

    starsContainer?.addEventListener("mouseover", hoverStarRating);
    starsContainer?.addEventListener("mouseleave", resetStarRating);
    starsContainer?.addEventListener("click", setUserRatingClick);
  };

  const open = (movie: MovieModel) => {
    if (!modalElement) return;

    modalElement.dataset.movieId = movie.id.toString();
    modalElement.querySelector(".movie-title")!.textContent = movie.title;
    const categoryElement = modalElement.querySelector(".category");
    if (categoryElement) {
      categoryElement.textContent = `${movie.getYear()} · ${movie.getGenres()}`;
    }

    modalElement.querySelector(".average-rating")!.textContent =
      movie.getFormattedVote();
    (modalElement.querySelector(".modal-image img") as HTMLImageElement).src =
      movie.getThumbnailUrl();
    const detailElement = modalElement.querySelector(".detail");
    if (detailElement) {
      detailElement.textContent = movie.getOverview();
    }

    updateUserRatingUI(movie.id);

    modalElement.classList.add("active");
    document.body.classList.add("modal-open");
  };

  const close = () => {
    modalElement?.classList.remove("active");
    document.body.classList.remove("modal-open");
  };

  const updateUserRatingUI = (movieId: number) => {
    const userRating = getUserRating(movieId);
    const score = userRating ? userRating.score : 0;
    updateStarDisplay(score);
  };

  const updateStarDisplay = (score: number) => {
    if (!starsContainer) return;

    const fragment = document.createDocumentFragment();

    for (let i = 2; i <= 10; i += 2) {
      const star = document.createElement("span");
      star.dataset.score = i.toString();
      star.className = "star";
      star.style.cursor = "pointer";
      star.textContent = i <= score ? "⭐" : "☆";
      fragment.appendChild(star);
    }

    starsContainer.innerHTML = "";
    starsContainer.appendChild(fragment);

    if (ratingText) {
      ratingText.textContent = RATING_MAP[score]
        ? `${RATING_MAP[score]} (${score}/10)`
        : "아직 평가하지 않았어요";
    }
  };

  const setUserRatingClick = (event: Event) => {
    const starElement = (event.target as HTMLElement).closest(".star");
    if (!starElement) return;

    const score = Number(starElement.dataset.score);
    const movieId = Number(modalElement?.dataset.movieId);

    if (!score || !movieId) {
      return;
    }

    setUserRating(movieId, score);
    updateUserRatingUI(movieId);
  };

  const hoverStarRating = (event: Event) => {
    const target = event.target as HTMLElement;
    const score = Number(target.dataset.score);
    if (score) updateStarDisplay(score);
  };

  const resetStarRating = () => {
    const movieId = Number(modalElement?.dataset.movieId);
    if (movieId) updateUserRatingUI(movieId);
  };

  return { render, open, close };
}
