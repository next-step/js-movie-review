import MovieCard from "./MovieCard";
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
const MovieCardList = ({ cardDatas }) => {
  const dom = List();

  const fragment = new DocumentFragment();
  cardDatas.map(MovieCard).forEach((dom) => fragment.appendChild(dom));
  dom.appendChild(fragment);

  return dom;
};
export default MovieCardList;
