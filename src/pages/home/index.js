import { Button } from '../../components/Button';
import { MovieItem } from '../../domains/movie/components/MovieItem';

export const Home = () => {
  return `
    <main>
      <section>
        <h2>지금 인기 있는 영화</h2>

        <ul class="thumbnail-list">
          ${Array.from(
            { length: 6 },
            () => `<li>
            ${MovieItem()}
          </li>`,
          ).join('')}
        </ul>
      </section>

      ${Button({
        name: 'movie_more_load',
        content: '더 보기',
        size: 'lg',
        fullWidth: true,
      })}
    </main>
  `;
};

// const render = () => {
//   const oldContainer = document.querySelector('#home-container');
//   if (!oldContainer) return;

//   const newContainer = document.createElement('div');
//   newContainer.id = 'home-container';
//   newContainer.innerHTML = Home();

//   oldContainer.replaceWith(newContainer);
// };

// restaurantStore.subscribe(render);
