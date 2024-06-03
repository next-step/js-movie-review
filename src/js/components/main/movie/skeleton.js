export const skeleton =  {
    render() {
        const item = document.createElement("li");
        item.classList.add("skeleton-card");
        item.innerHTML  = /*html*/ `
        <a href="#">
            <div class="item-card">
            <div class="item-thumbnail skeleton"></div>
            <div class="item-title skeleton"></div>
            <div class="item-score skeleton"></div>
            </div>
        </a>
        `
        return item;
    },

    load() {
        const itemList = document.querySelector(".item-list");

        const skeletons = Array.from({ length: 20 }, () => this.render());

        skeletons.forEach((skeleton) => itemList.appendChild(skeleton));
    },

    remove() {
        const itemList = document.querySelector(".item-list");
        const skeletons = document.querySelectorAll(".skeleton-card");

        skeletons.forEach((skeleton) => itemList.removeChild(skeleton));
    }
}