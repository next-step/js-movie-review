import starFilled from '../../assets/star_filled.png';
import { IMAGE_BASE_URL } from '../../constants/api';
import { MovieCard } from './MovieCard';

export class Cinema {
    page = 1;
    #element = {
        movieList: document.querySelector('.item-list'),
        skeletonList: document.querySelector('.skeleton-list')
    };

    showMovies(movies) {
        console.log('movies', movies);
        movies.forEach((movie) => {
            const movieCard = MovieCard({
                title: movie.title,
                src: `${IMAGE_BASE_URL}${movie.poster_path}`,
                voteAvg: movie.vote_average,
                starSrc: starFilled
            });

            this.#element.movieList.appendChild(movieCard);
        });
    }

    resetMovies() {
        this.#element.movieList.innerHTML = '';
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
                <div class="item-title skeleton skeleton-text"></div>
                <div class="item-score skeleton skeleton-score"></div>
              </div>
            </a>
          </li>`
                )
                .join(''); // 배열을 문자열로 변환

            this.#element.skeletonList.innerHTML = skeletonHTML;
        } else {
            this.#element.skeletonList.innerHTML = '';
        }
    }
}
