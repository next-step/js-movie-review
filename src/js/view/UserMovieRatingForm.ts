import { $ } from "../../utils/dom";
import MovieModel from "../domain/MovieModel";

const UserMovieRatingForm = {
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
        <div class="user-rating">
          <span class="user-rating-title">내 별점</span>
          <div class="rating-stars">
            ${UserMovieRatingForm.ratingScoreOptions
              .map((ratingScoreOption) => {
                const isFilled = ratingScoreOption <= movie.userRating;
                return /* html */ `
                <img
                  src="./images/star_${isFilled ? "filled" : "empty"}.png"
                  alt=${"RatingScore:" + ratingScoreOption}
                  data-rating=${ratingScoreOption}
                />
              `;
              })
              .join("")}
          </div>
          ${movie.userRating ? `<span>${movie.userRating}</span>` : ""}
        </div>
        `;
  },

  addSkeleton() {
    UserMovieRatingForm.elements.userRating.classList.add("skeleton");
  },

  removeSkeleton() {
    UserMovieRatingForm.elements.userRating.classList.remove("skeleton");
  },
};

export default UserMovieRatingForm;
