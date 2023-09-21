import { $createElement } from "../utils/dom";

import star_filled from "../../images/star_filled.png";

/**
 * @type {MovieItem}
 */
export const MovieItem = item => {
  if (!item) return;

  const {
    backdrop_path = "/8pjWz2lt29KyVGoq1mXYu6Br7dE.jpg",
    id,
    title,
    vote_average,
  } = item;

  const $movieContainerLi = $createElement(
    "li",
    ` <a href="#" id=${id}>
            <div class="item-card">
            <img
                class="item-thumbnail"
                src=https://image.tmdb.org/t/p/w220_and_h330_face${backdrop_path}
                loading="lazy"
                alt=${title} />
            <p class="item-title">${title}</p>
            <p class="item-score">
                <img src=${star_filled} alt="별점" /> ${vote_average}
            </p>
            </div>
      </a>
    `
  );

  return $movieContainerLi;
};
