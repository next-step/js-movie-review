import { IMAGE_BASE_URLS } from "../constants/image.constants.js";

export const updateBanner = (item) => {
  const backgroundContainer = document.querySelector("header .background-container");
  backgroundContainer.style.backgroundImage = `url('${IMAGE_BASE_URLS.BANNER}${item.poster_path}')`;

  const rate = document.querySelector("header .rate > span");
  rate.textContent = `${item.vote_average}`;

  const title = document.querySelector("header .top-rated-movie .title");
  title.textContent = `${item.title}`;
};
