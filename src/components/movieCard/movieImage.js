class MovieImage {
  #movieImage;
  #title;

  constructor(movieImage, title) {
    this.#movieImage = movieImage;
    this.#title = title;
    this.element = this.element();
  }

  element() {
    const img = document.createElement("img");
    img.classList.add("item-thumbnail");
    img.src = process.env.IMAGE_API_URL + this.#movieImage;
    img.alt = this.#title;
    img.loading = "lazy";

    return img;
  }
}

export default MovieImage;
