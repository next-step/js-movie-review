import { formatMovieRate } from "../domain/formatMovieRate";
import { getImageUrl } from "../domain/getImageUrl";

export function createMovieCard({ title, imageFileName, rate }) {
  const li = document.createElement("li");
  const div = document.createElement("div");
  div.classList.add("item");

  div.innerHTML = /* HTML */ `
    <img class="thumbnail" src=${getImageUrl(imageFileName)} alt=${title} />
    <div class="item-desc">
      <p class="rate">
        <img src="./images/star_empty.png" class="star" /><span
          >${formatMovieRate(rate)}</span
        >
      </p>
      <strong>${title}</strong>
    </div>
  `;

  li.append(div);

  return li;
}

export function createMovieCardSkeleton() {
  const li = document.createElement("li");
  li.classList.add("card-skeleton");

  const div = document.createElement("div");
  div.classList.add("item");

  div.innerHTML = /* HTML */ `
    <div class="thumbnail-skeleton"></div>
    <div class="rate-skeleton"></div>
    <div class="title-skeleton"></div>
  `;

  li.append(div);

  return li;
}
