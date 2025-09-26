import starImage from "./../../images/star_empty.png";

const THUMBNAIL_URL_PATH = "https://image.tmdb.org/t/p/w200";

export const createMovieItem = (item) => {
  const list = document.createElement("li");

  const itemDivision = document.createElement("div");
  itemDivision.classList.add("item");

  const thumbnail = document.createElement("img");
  thumbnail.className = "thumbnail";
  thumbnail.src = `${THUMBNAIL_URL_PATH}${item.poster_path}`;

  const rateDivision = document.createElement("div");
  rateDivision.classList.add("item-desc");
  const paragraph = document.createElement("p");
  paragraph.classList.add("rate");
  const starIcon = document.createElement("img");
  starIcon.classList.add("star");
  starIcon.src = starImage;
  const rateSpan = document.createElement("span");
  rateSpan.textContent = `${item.vote_average}`;
  const title = document.createElement("strong");
  title.textContent = `${item.title}`;

  paragraph.append(starIcon, rateSpan);
  rateDivision.append(paragraph, title);
  itemDivision.append(thumbnail, rateDivision);
  list.appendChild(itemDivision);

  return list;
};
