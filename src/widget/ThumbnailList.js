import { Movie } from "../entity/Movie";

export const ThumbnailList = (list) =>
  `<ul class="thumbnail-list">
    ${list
      ?.map((result) => {
        const {
          title,
          poster_path: posterPath,
          vote_average: voteAverage,
        } = result;
        return Movie({
          title,
          posterPath,
          voteAverage,
        });
      })
      .join("")}</ul>`;
