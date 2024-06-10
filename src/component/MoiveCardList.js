import { makeDom } from "./util";
import MovieCard from "./MovieCard";
import cssClass from "../const/css-class";
import List from "./List";

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
const movieCardList = ({ cardDatas }) => {
  const dom = List();

  cardDatas.forEach((cardData) => {
    const { href, src, title, alt, score } = cardData;
    const card = MovieCard({ href, src, title, alt, score });

    dom.append(card);
  });

  return dom;
};
export default movieCardList;
