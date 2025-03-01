import { Button } from '../components/Button';
import { SearchHeader } from './SearchHeader';

export const ThumbnailHeader = () => {
  return `
    <header>
      <div class="background-container">
        <div class="overlay" aria-hidden="true"></div>
        <div class="top-rated-container">
          ${SearchHeader()}
          
          <div class="top-rated-movie">
            <div class="rate">
              <img
                src="${import.meta.env.BASE_URL}assets/star_empty.png"
                class="star"
              />
              <span class="rate-value">9.5</span>
            </div>
            <div class="title">인사이드 아웃2</div>
            ${Button({ name: 'movie_detail', content: '자세히 보기' })}
          </div>
        </div>
      </div>
    </header>
  `;
};
