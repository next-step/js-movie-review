import { createComponent } from "../createComponent";
import { MovieList } from "./MovieList";

export async function Main() {
  const movieList = await createComponent(MovieList);

  const bindEvents = () => {
    movieList.bindEvents();
  };

  return {
    element: /* html */ `
        <main>
            <section class="item-view">
                <h2>지금 인기 있는 영화</h2>
                    ${movieList.element}
            </section>
        </main>
    `,
    bindEvents,
  };
}
