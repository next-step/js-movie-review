import starImage from "./../../images/star_empty.png";

const THUMBNAIL_URL_PATH =
  "https://media.themoviedb.org/t/p/w440_and_h660_face/";

export const createMovieItem = (item) => {
  const listItem = document.createElement("li");

  const itemContainer = createItemContainer({
    thumbnailPath: item.poster_path,
    voteAverage: item.vote_average,
    title: item.title,
  });

  listItem.appendChild(itemContainer);

  return listItem;
};

const createItemContainer = ({ thumbnailPath, voteAverage, title }) => {
  const itemContainer = document.createElement("div");
  itemContainer.className = "item";

  const thumbnail = document.createElement("img");
  thumbnail.className = "thumbnail";
  thumbnail.src = `${THUMBNAIL_URL_PATH}${thumbnailPath}`;

  const infoContainer = createInfoItem({
    voteAverage: voteAverage,
    title: title,
  });

  itemContainer.append(thumbnail, infoContainer);

  return itemContainer;
};

const createInfoItem = ({ voteAverage, title: movieTitle }) => {
  const container = document.createElement("div");
  container.className = "item-desc";

  const rate = createRateItem(voteAverage);

  const title = document.createElement("strong");
  title.textContent = movieTitle;

  container.append(rate, title);

  return container;
};

const createRateItem = (voteAverage) => {
  const paragraph = document.createElement("p");
  paragraph.className = "rate";
  const starIcon = document.createElement("img");
  starIcon.className = "star";
  starIcon.src = starImage;
  const rateSpan = document.createElement("span");
  rateSpan.textContent = voteAverage;

  paragraph.append(starIcon, rateSpan);

  return paragraph;
};
