import StarFilled from "../../images/star_filled.png";

export function Modal({ title, score, thumbnailUrl, overview }) {
  return {
    element: /* html */ `
        <div class="modal" style="display: none">
            <p class="item-title">${title}</p>
            <p class="item-score">
                <img src="${StarFilled}" alt="별점" /> ${score}
            </p>
            <img
                class="item-thumbnail"
                src="${thumbnailUrl}"
                loading="lazy"
                alt="${title}"
            />
            <span>${overview}</span>
        </div>
    `,
  };
}
