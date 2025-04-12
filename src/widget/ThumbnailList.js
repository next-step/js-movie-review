import { Movie } from "../entity/Movie";
import { eventEmitter } from "../shared/state-manager";
import { toElement } from "../shared/ui";

export const ThumbnailList = (list) => {
  const render = () => {
    const container = toElement(`<div>
      <ul id="test" class="thumbnail-list">
      ${list
        ?.map((result) => {
          const {
            id,
            title,
            poster_path: posterPath,
            vote_average: voteAverage,
          } = result;
          return Movie({
            id,
            title,
            posterPath,
            voteAverage,
          }).outerHTML;
        })
        .join("")}</ul>
        </div>
      `);

    const handleDetail = (e) => {
      const detailEvent = new CustomEvent("app-detail-info", {
        detail: {
          id: e.target.closest(".item").id,
        },
      });
      eventEmitter.dispatchEvent(detailEvent);
    };
    container.addEventListener("click", handleDetail);
    return container;
  };

  const rootContainer = render();

  return rootContainer;
};
