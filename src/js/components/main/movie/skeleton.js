export const skeleton = {
  render() {
    const item = document.createElement("li");
    item.classList.add("skeleton-card");
    item.insertAdjacentHTML(
      "afterbegin",
      /*html */ `
      <a href="#">
            <div class="item-card">
            <div class="item-thumbnail skeleton"></div>
            <div class="item-title skeleton"></div>
            <div class="item-score skeleton"></div>
            </div>
        </a>`
    ); /*html*/
    return item;
  },

  load() {
    const itemList = document.querySelector(".item-list");

    const fragment = document.createDocumentFragment();

    const skeletons = Array.from({ length: 20 }, () => this.render());

    skeletons.forEach((skeleton) => fragment.appendChild(skeleton));

    itemList.appendChild(fragment);
  },

  remove() {
    const itemList = document.querySelector(".item-list");
    const skeletons = document.querySelectorAll(".skeleton-card");

    skeletons.forEach((skeleton) => itemList.removeChild(skeleton));
  },
};
