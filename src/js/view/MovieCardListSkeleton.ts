import { createElement } from "../../utils/dom";

const MovieCardListSkeleton = {
  NUM_SKELETON_CARDS: 10 as const,
  selectors: {
    SKELETON_CARD: ".skeleton-card" as const,
  },

  generateSkeletonCard() {
    const card = createElement("li");
    card.classList.add("skeleton-card");

    card.innerHTML = /* html */ `
                <div class="item-card">
                  <div class="item-thumbnail skeleton"></div>
                  <div class="item-title skeleton"></div>
                  <div class="item-score skeleton"></div>
                </div>
            `;
    return card;
  },

  get skeletonCards() {
    const skeletonCards = Array.from<void, HTMLElement>(
      { length: MovieCardListSkeleton.NUM_SKELETON_CARDS },
      this.generateSkeletonCard
    );

    return skeletonCards;
  },
};

export default MovieCardListSkeleton;
