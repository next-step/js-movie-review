import StarImage from "../../assets/star_filled.png";

class MovieScore {
  #score;

  constructor(score) {
    this.#score = score;
    this.element = this.render();
  }

  render() {
    const p = document.createElement("p");
    const img = document.createElement("img");
    const span = document.createElement("span");
    img.src = StarImage;
    img.alt = "별점";
    p.classList.add("item-score");
    p.textContent = this.#score.toFixed(1);
    p.appendChild(img);
    p.appendChild(span);

    return p;
  }
}

export default MovieScore;
