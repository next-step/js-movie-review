import { InternetServerError, UnauthorizedError } from "../api/error";
import starFilled from "../assets/star_filled.png";

export class MovieView {
  constructor(movieInstance) {
    this.setup();

    this.movieInstance = movieInstance;
    this.itemList = document.querySelector(".item-list");
    this.loadMoreButton = document.querySelector(".load-more");

    this.loadMoreButton.addEventListener("click", async () => {
      await this.loadMore();
    });

    this.loadMore();
  }

  setup() {
    const mainElement = document.createElement("main");

    mainElement.innerHTML = /*html */ `
      <section class="item-view">
        <h2>지금 인기 있는 영화</h2>
        <ul class="item-list"></ul>
        <button class="btn primary full-width load-more">더 보기</button>
      </section>
    `;

    document.getElementById("app").appendChild(mainElement);
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

      movies?.forEach((movie) => {
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
    } catch (error) {
      this.hideSkeleton();
      if (error instanceof UnauthorizedError) {
        alert("401");
      } else if (error instanceof InternetServerError) {
        alert("500");
      }
    }
  }
}
