import { $ } from "../../utils/querySelector";

class Skeleton {
  constructor() {
    this.element = this.element();
  }

  element() {
    const li = document.createElement("li");
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
    $("ul").innerHTML = "";
  }

  renderSkeletons() {
    const skeletons = Array.from({ length: 12 }, () => new Skeleton().element);
    skeletons.forEach((skeleton) => $("ul").appendChild(skeleton));
  }
}

export default Skeleton;
