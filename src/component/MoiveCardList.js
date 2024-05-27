import { makeDom } from "./util";
import MovieCard from "./MovieCard";
import MovieCardString from "./MovieCardListRefetch";
import cssClass from "../const/css-class";

/**
 * cardDatas : [
 *  {
 *    href : 영화 상세페이지 url
 *    src : 영화 썸네일 url
 *    title : 영화 이름
 *    alt : 영화 썸네일 alt
 *    score : 영화 점수
 *  }
 * ]
 */
export default ({ cardDatas }) => {
  const ul = document.querySelector("ul");
  const { dom } = ul ? { dom: ul } : makeDom("ul");
  ul ? null : dom.classList.add(cssClass["item-list"]);

  cardDatas.map((cardData) => {
    const { href, src, title, alt, score } = cardData;
    const card = MovieCard({ href, src, title, alt, score });

    dom.append(card.dom);
  });

  return { dom };
};
