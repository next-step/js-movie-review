import { makeDom } from "./util";
import star_filled from "../../templates/star_filled.png";

/**
 * href : 영화 상세페이지 url
 * src : 영화 썸네일 url
 * title : 영화 이름
 * alt : 영화 썸네일 alt
 * score : 영화 점수
 */
const MovieCard = ({ href, src, title, alt, score }) => {
  const image_base_url = "http://image.tmdb.org/t/p/w220_and_h330_face";
  return makeDom(
    `<li>
      <a href="${href}">
        <div class="item-card">
          <img
            class="item-thumbnail"
            src="${image_base_url}${src}"
            loading="lazy"
            alt="${alt}"
          />
          <p class="item-title">${title}</p>
          <p class="item-score"><img src="${star_filled}" alt="별점" /> ${score}</p>
        </div>
      </a>
    </li>`
  );
};

export default MovieCard;
