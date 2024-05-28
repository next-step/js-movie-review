const MovieCard = {
  generateMovieCard(movie) {
    const card = document.createElement("li");
    card.innerHTML = /* html */ `
    <a href="#">
    <div class="item-card">
      <img
        class="item-thumbnail"
        src=${movie.thumbnail}
        loading="lazy"
        alt=${movie.title}
      />
      <p class="item-title">${movie.title}</p>
      <p class="item-score"><img src="./star_filled.png" alt="별점" /> ${movie.rating}</p>
    </div>
  </a>
    `;
    return card;
  },
};
export default MovieCard;
