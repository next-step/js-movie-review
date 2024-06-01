import MovieCard from "./MovieCard.js";

const MovieCardList = {
  elements: {
    movieCardList: document.querySelector(".item-list"),
  },
  render: (movies) => {
    const movieCards = movies.map((movie) =>
      MovieCard.generateMovieCard(movie)
    );

    MovieCardList.elements.movieCardList.append(...movieCards);
  },
};

export default MovieCardList;
