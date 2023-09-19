import starFilled from '../assets/star_filled.png';

export class MovieComponent {
  #element = document.createElement('li');

  constructor() {
    this.#showSkeleton();
  }

  get component() {
    return this.#element;
  }

  render(movie) {
    if (!movie) return this.remove();

    const { title, thumbnail, rating } = movie.getData();

    this.#element.innerHTML = `
      <a href="#">
        <div class="item-card">
          <img class="item-thumbnail" src="${thumbnail}" loading="lazy" alt="${title}" />
          <p class="item-title">${title}</p>
          <p class="item-score"><img src="${
            rating ? starFilled : ''
          }" alt="별점" /> ${rating}</p>
        </div>
      </a>
    `;
  }

  #showSkeleton() {
    this.#element.innerHTML = `
        <a href="#">
          <div class="item-card">
            <div class="item-thumbnail skeleton"></div>
            <p class="item-title skeleton"></p>
            <p class="item-score skeleton"></p>
          </div>
        </a>
    `;
  }

  remove() {
    this.#element.innerHTML = '';
  }
}
