import starFilled from '../../assets/star_filled.png';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export class Cinema {
    #movies = [];
    page = 1;
    #moviesWrapper = document.querySelector('.item-list');
    #skeletonWrapper = document.querySelector('.skeleton-list');

    setMovies(movies) {
        this.#movies = movies;
    }

    showMovies() {
        const newItemsHTML = this.#movies
            .map((movieInfo) => {
                return `
              <li>
                <a href="#">
                  <div class="item-card">
                    <img
                      class="item-thumbnail"
                      src="${IMAGE_BASE_URL}${movieInfo.getPosterPath()}"
                      loading="lazy"
                      alt="${movieInfo.title}"
                    />
                    <p class="item-title">${movieInfo.getTitle()}</p>
                    <p class="item-score">
                    ${movieInfo.getVoteAverage()} <img src="${starFilled}" alt="별점" /> 
                    </p>
                  </div>
                </a>
              </li>
            `;
            })
            .join('');
        this.#moviesWrapper.innerHTML += newItemsHTML;
    }

    resetMovies() {
        this.#moviesWrapper.innerHTML = '';
    }

    showSkeleton(flag) {
        if (flag === true) {
            const skeletonHTML = Array(20)
                .fill(
                    `            
          <li>
            <a href="#">
              <div class="item-card">
                <div class="item-thumbnail skeleton"></div>
                <div class="item-title skeleton"></div>
                <div class="item-score skeleton"></div>
              </div>
            </a>
          </li>`
                )
                .join(''); // 배열을 문자열로 변환

            this.#skeletonWrapper.innerHTML = skeletonHTML;
        } else {
            this.#skeletonWrapper.innerHTML = '';
        }
    }
}
