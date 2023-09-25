import { $createElement } from "../utils/dom";

class SkeletonUI {
  constructor(count) {
    const $ul = $createElement("ul", this.renderSkeleton(count));
    $ul.classList.add("skeleton-cards", "item-list", "absolute");
    this.$ul = $ul;
  }

  renderSkeleton(count) {
    const skeletonCard = `
      <li>
        <a href="#"> 
          <div class="item-card"> 
            <div class="item-thumbnail skeleton"></div> 
            <div class="item-title skeleton"></div> 
            <div class="item-score skeleton"></div> 
          </div> 
        </a> 
      </li>`.repeat(count);

    return skeletonCard;
  }

  showSkeleton() {
    this.$ul.classList.remove("hidden");
  }

  hideSkeleton() {
    this.$ul.classList.add("hidden");
  }
}

export default SkeletonUI;
