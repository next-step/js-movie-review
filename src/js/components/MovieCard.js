import StarFilled from "../../images/star_filled.png";
import { createComponent } from "../createComponent";
import { Modal } from "./Modal";

export async function MovieCard({
  index,
  title,
  score,
  thumbnailUrl,
  overview,
}) {
  const modal = await createComponent(Modal, {
    title,
    score,
    thumbnailUrl,
    overview,
  });

  const bindEvents = () => {
    const $movieCard = document.querySelector(`[id='${index}']`);
    const $modal = document.querySelector(`[id='${index}'] > .modal`);

    $movieCard.addEventListener("click", () => {
      if ($modal.style.display !== "none") {
        $modal.style.display = "none";
      } else {
        $modal.style.display = "block";
      }
    });
  };

  return {
    element: /* html */ `
        <li id=${index}>
            <a href="#">
                <div class="item-card">
                    <img
                        class="item-thumbnail"
                        src="${thumbnailUrl}"
                        loading="lazy"
                        alt="${title}"
                    />
                    <p class="item-title">${title}</p>
                    <p class="item-score">
                        <img src="${StarFilled}" alt="별점" /> ${score}
                    </p>
                </div>
            </a>
            ${modal.element}
        </li>
    `,
    bindEvents,
  };
}
