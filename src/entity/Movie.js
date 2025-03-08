class Movie {
  title;

  posterPath;

  voteAverage;

  constructor({ title, posterPath, voteAverage }) {
    this.title = title;
    this.posterPath = posterPath;
    this.voteAverage = voteAverage;
  }

  get getTitle() {
    return this.title;
  }

  get getPosterPath() {
    return this.posterPath;
  }

  get getVoteAverage() {
    return this.voteAverage;
  }

  render() {
    return `<li>
              <div class="item">
                <img
                  class="thumbnail"
                  src="
https://media.themoviedb.org/t/p/w440_and_h660_face${this.posterPath}"
                  alt="인사이드 아웃 2"
                />
                <div class="item-desc">
                  <p class="rate">
                    <img src="star_empty.png" class="star" />
                    <span>${this.voteAverage}</span>
                  </p>
                  <strong>${this.title}</strong>
                </div>
              </div>
            </li>`;
  }
}
export default Movie;
