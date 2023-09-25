import starFilled from '../assets/star_filled.png';

export class MovieComponent {
  #element = document.createElement('li');

  get component() {
    return this.#element;
  }

  showSkeleton() {
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

  render(movie) {
    if (!movie) return this.remove();

    const { title, thumbnail, rating } = movie;

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

  remove() {
    this.#element.innerHTML = '';
  }
}
