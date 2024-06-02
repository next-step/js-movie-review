import { $, $$ } from "../../utils/querySelector";

class Skeleton {
  constructor() {
    this.element = this.element();
  }

  element() {
    const li = document.createElement("li");
    li.classList.add("skeleton-box");
    const a = document.createElement("a");
    const itemCardDiv = document.createElement("div");
    const itemThumbnailDiv = document.createElement("div");
    const itemTitleDiv = document.createElement("div");
    const itemScoreDiv = document.createElement("div");
    itemCardDiv.classList.add("item-card");
    itemThumbnailDiv.classList.add("item-thumbnail", "skeleton");
    itemTitleDiv.classList.add("item-title", "skeleton");
    itemScoreDiv.classList.add("item-score", "skeleton");
    itemCardDiv.appendChild(itemThumbnailDiv);
    itemCardDiv.appendChild(itemTitleDiv);
    itemCardDiv.appendChild(itemScoreDiv);
    a.appendChild(itemCardDiv);
    li.appendChild(a);

    return li;
  }

  remove() {
    $$("li.skeleton-box").forEach((skeleton) => $("ul").removeChild(skeleton));
  }

  renderSkeletons() {
    const fragment = document.createDocumentFragment();

    const skeletons = Array.from({ length: 12 }, () => new Skeleton().element);
    skeletons.forEach((skeleton) => fragment.appendChild(skeleton));

    $("ul").appendChild(fragment);
  }
}

export default Skeleton;
