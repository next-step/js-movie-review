import { MovieComponent } from './MovieComponent';

export class MovieView {
  #element = document.querySelector('.item-list');

  showSkeleton() {
    const components = Array(20)
      .fill(null)
      .map(() => new MovieComponent());

    components.forEach((component) =>
      this.#element.appendChild(component.element)
    );

    return components;
  }

  showMovies(movies) {
    movies.forEach((movie) => {
      const movieComponent = new MovieComponent();
      movieComponent.render(movie);
      this.#element.appendChild(movieComponent.element);

      return movieComponent;
    });
  }
}
