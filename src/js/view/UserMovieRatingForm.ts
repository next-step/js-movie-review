import { $, $all } from "../../utils/dom";
import MovieModel from "../domain/MovieModel";

const UserMovieRatingForm = {
  PATH_STAR_FILLED: "./images/star_filled.png",
  PATH_STAR_EMPTY: "./images/star_empty.png",
  elements: {
    userRating: $(".user-rating"),
  },
  ratingScoreOptions: [2, 4, 6, 8, 10],

  render(movie: MovieModel) {
    UserMovieRatingForm.elements.userRating.innerHTML =
      UserMovieRatingForm.generateTemplate(movie);
  },

  reset() {
    UserMovieRatingForm.elements.userRating.innerHTML = "";
  },

  generateTemplate(movie: MovieModel) {
    return /* html */ `
          <span class="user-rating-title">내 별점</span>
          <div class="rating-stars">
            ${UserMovieRatingForm.ratingScoreOptions
              .map((ratingScoreOption) => {
                const isFilled = ratingScoreOption <= movie.userRating;
                return /* html */ `
                <img
                  class="rating-star"
                  src=${
                    isFilled
                      ? UserMovieRatingForm.PATH_STAR_FILLED
                      : UserMovieRatingForm.PATH_STAR_EMPTY
                  }
                  alt=${"RatingScore:" + ratingScoreOption}
                  data-rating=${ratingScoreOption}
                />
              `;
              })
              .join("")}
          </div>
          ${movie.userRating ? `<span>${movie.userRating}</span>` : ""}
        `;
  },

  addSkeleton() {
    UserMovieRatingForm.elements.userRating.classList.add("skeleton");
  },

  removeSkeleton() {
    UserMovieRatingForm.elements.userRating.classList.remove("skeleton");
  },

  handleHover(e: Event) {
    const target = e.target as HTMLImageElement;
    if (target.tagName === "IMG" && target.dataset.rating) {
      const rating = Number(target.dataset.rating);
      UserMovieRatingForm.fillStars(rating);
    }
  },

  fillStars(rating: number) {
    const stars = $all(".rating-star") as HTMLImageElement[];
    stars.forEach((star) => {
      const starRating = Number(star.dataset.rating);
      if (starRating <= rating) {
        star.src = UserMovieRatingForm.PATH_STAR_FILLED;
      } else {
        star.src = UserMovieRatingForm.PATH_STAR_EMPTY;
      }
    });
  },

  resetStars(userRating: number) {
    const stars = $all(".rating-star") as HTMLImageElement[];
    stars.forEach((star) => {
      const starRating = Number(star.dataset.rating);
      if (starRating <= userRating) {
        star.src = UserMovieRatingForm.PATH_STAR_FILLED;
      } else {
        star.src = UserMovieRatingForm.PATH_STAR_EMPTY;
      }
    });
  },
};

export default UserMovieRatingForm;
