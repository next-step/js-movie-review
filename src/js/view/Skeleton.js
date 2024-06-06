import { createElement } from "../../utils/dom.js";

const Skeleton = {
  NUM_SKELETON_CARDS: 10,
  selectors: {
    SKELETON_CARD: ".skeleton-card",
  },

  generateSkeletonCard() {
    const card = createElement("li");
    card.classList.add("skeleton-card");

    card.innerHTML = /* html */ `
              <a href="#">
                <div class="item-card">
                  <div class="item-thumbnail skeleton"></div>
                  <div class="item-title skeleton"></div>
                  <div class="item-score skeleton"></div>
                </div>
              </a>
            `;
    return card;
  },

  get skeletonCards() {
    const skeletonCards = Array.from(
      { length: Skeleton.NUM_SKELETON_CARDS },
      () => this.generateSkeletonCard()
    );

    return skeletonCards;
  },
};

export default Skeleton;
