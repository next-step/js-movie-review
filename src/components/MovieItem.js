const MovieItem = (props) => {
  const { title, poster_path, vote_average } = props;

  const rate = vote_average.toFixed(1);

  return /*html*/ `
    <li>
        <div class="item">
            <img
                class="thumbnail"
                src="https://media.themoviedb.org/t/p/w440_and_h660_face${poster_path}"
                alt="${title}"
            />
            <div class="item-desc">
                <p class="rate">
                    <img src="./images/star_empty.png" class="star" />
                    <span>${rate}</span>
                </p>
                <strong>${title}</strong>
            </div>
        </div>
    </li>`;
};

export const renderMovieItems = (movies) => {
  return movies.map((movie) => MovieItem(movie)).join("");
};
