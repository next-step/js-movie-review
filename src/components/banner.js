const BANNER_URL_PATH = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/";

export const updateBanner = (item) => {
  const backgroundContainer = document.querySelector("header .background-container");
  backgroundContainer.style.backgroundImage = `url('${BANNER_URL_PATH}${item.poster_path}')`;

  const rate = document.querySelector("header .rate > span");
  rate.textContent = `${item.vote_average}`;

  const title = document.querySelector("header .top-rated-movie .title");
  title.textContent = `${item.title}`;
};
