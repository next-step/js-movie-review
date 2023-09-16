import FILLED_STAR from "../assets/images/star_filled.png";
import EMPTY_START from "../assets/images/star_empty.png";

export default function MovieItem({ $target }, movieData) {
  const $li = document.createElement("li");

  $li.innerHTML = `
    <a href="#">
      <div class="item-card">
        <img 
          class="item-thumbnail skeleton"
          src="${process.env.TMDB_IMAGE_BASE_URL}/${movieData.poster_path}"
          loading="lazy"
          alt="포스터"
        />
        <div class="item-title skeleton">
          ${movieData.title}
        </div>
        <div class="item-score skeleton">
          ${
            movieData.vote_average > 0
              ? `<img src=${FILLED_STAR} alt="별점" />`
              : `<img src=${EMPTY_START} alt="별점" />`
          }
          ${movieData.vote_average}
        </div>
      </div>
    </a>
  `;

  const $thumbnail = $li.querySelector(".item-thumbnail");
  $thumbnail.addEventListener("load", () => {
    $thumbnail.classList.remove("skeleton");
  });

  const $title = $li.querySelector(".item-title");
  $title.classList.remove("skeleton");

  const $score = $li.querySelector(".item-score");
  $score.classList.remove("skeleton");

  $target.append($li);
}
