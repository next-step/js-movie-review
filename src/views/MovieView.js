import { InternetServerError, UnauthorizedError } from "../api/error";
import starFilled from "../assets/star_filled.png";
import { ModalView } from "./ModalView";

export class MovieView {
  constructor(movieInstance) {
    this.setup();

    this.movieInstance = movieInstance;
    this.itemList = document.querySelector(".item-list");
    this.loadMoreButton = document.querySelector(".load-more");
    this.modal = new ModalView();

    this.loadMoreButton.addEventListener("click", async () => {
      await this.loadMore();
    });
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
    const fragment = document.createDocumentFragment();
    Array.from({ length: 20 }).forEach(() => {
      const li = document.createElement("li");
      li.className = "skeleton-item";

      const itemCard = document.createElement("div");
      itemCard.className = "item-card";

      const thumbnail = document.createElement("div");
      thumbnail.className = "item-thumbnail skeleton";

      const title = document.createElement("div");
      title.className = "item-title skeleton";

      const score = document.createElement("div");
      score.className = "item-score skeleton";

      itemCard.appendChild(thumbnail);
      itemCard.appendChild(title);
      itemCard.appendChild(score);
      li.appendChild(itemCard);
      fragment.appendChild(li);
    });

    this.itemList.appendChild(fragment);
  }

  hideSkeleton() {
    this.itemList.querySelectorAll(".skeleton-item").forEach((skeleton) => {
      skeleton.remove();
    });
  }

  async loadMore() {
    try {
      this.showSkeleton();
      const list = await this.movieInstance.loadMore();
      this.hideSkeleton();

      const fragment = document.createDocumentFragment();
      list.forEach((movie) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "#";

        const itemCard = document.createElement("div");
        itemCard.className = "item-card";

        const img = document.createElement("img");
        img.className = "item-thumbnail";
        img.loading = "lazy";
        img.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
        img.alt = `${movie.title}`;

        const title = document.createElement("p");
        title.className = "item-title";
        title.textContent = movie.title;

        const score = document.createElement("p");
        score.className = "item-score";
        const starImg = document.createElement("img");
        starImg.src = starFilled;
        starImg.alt = "별점";
        score.appendChild(starImg);
        score.append(` ${movie.vote_average}`);

        itemCard.appendChild(img);
        itemCard.appendChild(title);
        itemCard.appendChild(score);
        a.appendChild(itemCard);
        li.appendChild(a);

        fragment.appendChild(li);
      });

      this.itemList.appendChild(fragment);

      if (!this.movieInstance.hasMore) {
        this.loadMoreButton.style.display = "none";
      }
    } catch (error) {
      this.hideSkeleton();
      if (error instanceof UnauthorizedError) {
        this.modal.show("Unauthorized: 접근이 거부되었습니다.");
      } else if (error instanceof InternetServerError) {
        this.modal.show("Internal Server Error: 서버 오류가 발생했습니다.");
      }
    }
  }
}
