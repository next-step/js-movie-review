class Movie {
  #title: string;
  #rating: number;
  #thumbnail: string;

  constructor({
    title,
    rating,
    thumbnail,
  }: {
    title: string;
    rating: number;
    thumbnail: string;
  }) {
    this.#title = title;
    this.#rating = rating;
    this.#thumbnail = thumbnail;
  }

  get title() {
    return this.#title;
  }

  get rating() {
    return this.#rating;
  }

  get thumbnail() {
    return this.#thumbnail;
  }
}

export default Movie;
