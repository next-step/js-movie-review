import { Button } from '../../components/Button';
import { EmptyMovie } from '../../domains/movie/components/EmptyMovie';
import ErrorMovie from '../../domains/movie/components/ErrorMovie';
import { MovieItem } from '../../domains/movie/components/MovieItem';
import {
  getPopularMovie,
  getSearchedMovies,
} from '../../domains/movie/services';
import { updateMovieThumbnail } from '../../domains/movie/utils';
import { searchStore } from '../../domains/search/stores';
import { searchParams } from '../../libs/search-params';
import { addEvent } from '../../utils';

const MAX_PAGE = 500;
const DEFAULT_POPULAR_MOVIES = { results: [] };

export const Home = (props = { popularMovies: DEFAULT_POPULAR_MOVIES }) => {
  const { popularMovies, isError, error } = props;
  const currentPage = Number(searchParams.get('page'));

  const isLastPage = currentPage === MAX_PAGE;
  const isEmpty = popularMovies?.results.length === 0;

  if (isError) {
    return ErrorMovie({ message: error });
  }

  return `
    <main id="home-container">
      <section>
        <h2>지금 인기 있는 영화</h2>

        ${
          isEmpty
            ? EmptyMovie()
            : `<ul class="thumbnail-list">
          ${popularMovies.results?.map((movie) => `<li>${MovieItem(movie)}</li>`).join('')}
        </ul>`
        }
      </section>

      ${
        !isLastPage && !isEmpty
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

const render = ({ loader, isError, error }) => {
  const oldContainer = document.querySelector('#home-container');
  if (!oldContainer) return;

  const newContainer = document.createElement('div');
  newContainer.id = 'home-container';
  newContainer.innerHTML = Home({ popularMovies: loader, isError, error });

  oldContainer.replaceWith(newContainer);
};

const loader = async () => {
  const page = Number(searchParams.get('page')) || 1;
  const { hasSearchValue, searchValue } = searchStore.get();

  if (hasSearchValue) {
    const searchedMovies = await getSearchedMovies({
      page,
      query: searchValue,
    });

    render({ isError: false, loader: searchedMovies });
    return;
  }

  try {
    const data = await getPopularMovie({ page });

    updateMovieThumbnail(data);

    render({ isError: false, loader: data });
  } catch (error) {
    render({ isError: true, error: error.message });
  }
};

searchStore.subscribe(loader);

addEvent('click', '#movie_more_load', () => {
  const page = Number(searchParams.get('page')) || 1;
  searchParams.set('page', page + 1);

  loader();
});

loader();
