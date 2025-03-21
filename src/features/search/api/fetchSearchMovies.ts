import { safeFetchWithPagination } from "src/shared/apis/lib";
import { LANGUAGE } from "src/shared/config/language";

import { GetSearchMoviesResponse } from "./model";

export const fetchSearchMovies = async ({
  query = "",
  language = LANGUAGE,
}) => {
  return await safeFetchWithPagination<GetSearchMoviesResponse>({
    url: `/search/movie?language=${language}&query=${query}`,
  });
};
