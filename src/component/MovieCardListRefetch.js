import MovieCard from "./MovieCard";

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

  cardDatas.map((cardData) => {
    const { href, src, title, alt, score } = cardData;
    const card = MovieCard({ href, src, title, alt, score });

    ul.append(card.dom);
  });
};
