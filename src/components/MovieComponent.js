import starFilled from '../assets/star_filled.png';

export class MovieComponent {
  #element = document.createElement('li');
  #skeletonClass = 'skeleton';
  #thumbnail = '';
  #title = '';
  #rating = '';

  constructor() {
    this.showSkeleton();
  }

  get component() {
    return `
      <a href="#">
        <div class="item-card">
          <img class="item-thumbnail ${this.#skeletonClass}" src="${
      this.#thumbnail
    }" loading="lazy" alt="${this.#title}" />
          <p class="item-title ${this.#skeletonClass}">${this.#title}</p>
          <p class="item-score ${this.#skeletonClass}"><img src="${
      this.#thumbnail ? starFilled : ''
    }" alt="별점" /> ${this.#rating}</p>
        </div>
      </a>
    `;
  }

  showSkeleton() {
    this.#element.innerHTML = this.component;
  }

  render(movie) {
    const { title, thumbnail, rating } = movie.getData();
    this.#title = title;
    this.#thumbnail = thumbnail;
    this.#rating = rating;
    this.#skeletonClass = '';
    this.#element.innerHTML = this.component;
  }

  get element() {
    return this.#element;
  }
}
