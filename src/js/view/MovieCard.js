import starFilled from "../../assets/star_filled.png";

export const MovieCard = {
  generateMovieItem(movie) {
    const item = document.createElement("li");
    item.innerHTML = /*html*/ `
      <a href="#">
        <div class="item-card">
          <img
            class="item-thumbnail"
            src="${movie.thumbnail}"
            loading="lazy"
            alt="${movie.title}"
          />
          <p class="item-title">${movie.title}</p>
          <p class="item-score"><img src="${starFilled}" alt="별점" />${movie.rating}</p>
        </div>
      </a>`;
    return item;
  },
};
