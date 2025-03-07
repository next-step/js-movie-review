import { Button } from '../components/Button';
import { thumbnailStore } from '../domains/movie/stores';
import { searchStore } from '../domains/search/stores';
import { SearchHeader } from './SearchHeader';

export const ThumbnailHeader = () => {
  const { thumbnailTitle, thumbnailSrc, thumbnailVoteAverage } =
    thumbnailStore.get();
  const { hasSearchValue } = searchStore.get();

  const rate = thumbnailVoteAverage.toFixed(1);
  const backgroundImage = hasSearchValue
    ? 'none'
    : thumbnailSrc
      ? `url('https://image.tmdb.org/t/p/w1280${thumbnailSrc}');`
      : '';

  const backgroundContainerClass = `background-container${hasSearchValue ? '__close' : ''}`;
  const topRatedMovieClass = `top-rated-movie${hasSearchValue ? '__close' : ''}`;

  return `
    <header id="header-container">
      <div class="${backgroundContainerClass}">
        <div class="overlay" aria-hidden="true" style="background: no-repeat ${backgroundImage} background-size: cover;">
        </div>

        <div class="top-rated-container">
          ${SearchHeader()}
          
          <div class="${topRatedMovieClass}">
            <div class="rate">
              <img
                src="${import.meta.env.BASE_URL}assets/star_empty.png"
                class="star"
              />
              <span class="rate-value">${rate}</span>
            </div>
            <div class="title">${thumbnailTitle}</div>
            ${Button({ name: 'movie_detail', content: '자세히 보기' })}
          </div>
        </div>
      </div>
    </header>
  `;
};

const render = () => {
  const oldContainer = document.querySelector('#header-container');
  if (!oldContainer) return;

  const newContainer = document.createElement('div');
  newContainer.id = 'header-container';
  newContainer.innerHTML = ThumbnailHeader();

  oldContainer.replaceWith(newContainer);
};

thumbnailStore.subscribe(render);
searchStore.subscribe(render);
