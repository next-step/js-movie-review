import renderMovieCard from "./renderMovieCard";

const renderMovieList = (element, movieList) => {
  const inner = movieList.map((movie, idx) => renderMovieCard(movie));

  element.append(...inner);
};

export default renderMovieList;
