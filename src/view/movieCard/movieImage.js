class MovieImage {
  #movieImage;
  #title;

  constructor(movieImage, title) {
    this.#movieImage = movieImage;
    this.#title = title;
    this.element = this.render();
  }

  render() {
    const img = document.createElement("img");
    img.classList.add("item-thumbnail");
    img.src = this.#movieImage;
    img.alt = this.#title;
    img.loading = "lazy";

    return img;
  }
}

export default MovieImage;
