import Movie from "../entity/Movie";
import { toElement } from "../shared/ui";

export const ThumbnailList = ({ mainState }) =>
  toElement({
    domString: `<ul class="thumbnail-list">
    ${mainState.value
      ?.map((result) => {
        const {
          title,
          poster_path: posterPath,
          vote_average: voteAverage,
        } = result;
        return new Movie({
          title,
          posterPath,
          voteAverage,
        }).render();
      })
      .join("")}</ul>`,
  });
