import starFilled from "../assets/star_filled.png";

export class MovieView {
  constructor(movieInstance) {
    this.movieInstance = movieInstance;
    this.itemList = document.querySelector(".item-list");
    this.loadMoreButton = document.querySelector(".load-more");

    this.loadMoreButton.addEventListener("click", async () => {
      await this.loadMore();
    });

    this.loadMore();
  }

  showSkeleton() {
    for (let i = 0; i < 20; i++) {
      const skeletonItem = document.createElement("li");
      skeletonItem.classList.add("skeleton-item");
      skeletonItem.innerHTML = /*html */ `
            <div class="item-card">
                <div class="item-thumbnail skeleton"></div>
                <div class="item-title skeleton"></div>
                <div class="item-score skeleton"></div>
            </div>
        `;
      this.itemList.appendChild(skeletonItem);
    }
  }

  hideSkeleton() {
    this.itemList.querySelectorAll(".skeleton-item").forEach((skeleton) => {
      skeleton.remove();
    });
  }

  async loadMore() {
    try {
      this.showSkeleton();
      const movies = await this.movieInstance.loadMore();
      this.hideSkeleton();

      movies.forEach((movie) => {
        const movieElement = document.createElement("li");
        const thumbnail = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
        movieElement.innerHTML = /*html */ `
              <a href="#">
                  <div class="item-card">
                      <img class="item-thumbnail" loading="lazy" src="${thumbnail}" alt="${movie.title}">
                      <p class="item-title">${movie.title}</p>
                      <p class="item-score">
                        <img src=${starFilled} alt="별점" />
                        ${movie.vote_average}
                      </p>
                  </div>
              </a>
          `;
        this.itemList.appendChild(movieElement);
      });

      if (!this.movieInstance.hasMore) {
        this.loadMoreButton.style.display = "none";
      }
    } catch {
      this.hideSkeleton();
    }
  }
}
