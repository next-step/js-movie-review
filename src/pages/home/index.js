import { Button } from '../../components/Button';
import { MovieItem } from '../../domains/movie/components/MovieItem';
import { getPopularMovie } from '../../domains/movie/services';
import { thumbnailStore } from '../../domains/movie/stores';
import { searchParams } from '../../libs/search-params';
import { addEvent } from '../../utils';

const MAX_PAGE = 500;
const DEFAULT_POPULAR_MOVIES = { results: [] };

export const Home = (props = { popularMovies: DEFAULT_POPULAR_MOVIES }) => {
  const { popularMovies } = props;
  const currentPage = Number(searchParams.get('page'));

  const isLastPage = currentPage === MAX_PAGE;

  return `
    <main id="home-container">
      <section>
        <h2>지금 인기 있는 영화</h2>

        <ul class="thumbnail-list">
          ${popularMovies.results.map((movie) => MovieItem(movie)).join('')}
        </ul>
      </section>

      ${
        !isLastPage
          ? Button({
              name: 'movie_more_load',
              content: '더 보기',
              size: 'lg',
              fullWidth: true,
            })
          : ''
      }
    </main>
  `;
};

const render = ({ loader }) => {
  const oldContainer = document.querySelector('#home-container');
  if (!oldContainer) return;

  const newContainer = document.createElement('div');
  newContainer.id = 'home-container';
  newContainer.innerHTML = Home({ popularMovies: loader });

  oldContainer.replaceWith(newContainer);
};

const loader = async () => {
  const page = Number(searchParams.get('page')) || 1;

  const data = await getPopularMovie({ page });

  const {
    title: thumbnailTitle,
    vote_average: thumbnailVoteAverage,
    id: thumbnailId,
    backdrop_path: thumbnailSrc,
  } = data.results[0];

  thumbnailStore.set({
    thumbnailId,
    thumbnailTitle,
    thumbnailSrc,
    thumbnailVoteAverage,
  });

  render({ loader: data });
};

addEvent('click', '#movie_more_load', () => {
  const page = Number(searchParams.get('page')) || 1;
  searchParams.set('page', page + 1);

  loader();
});

loader();

// restaurantStore.subscribe(render);
