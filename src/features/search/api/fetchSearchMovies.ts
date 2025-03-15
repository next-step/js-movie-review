import { safeFetchWithPagination } from "src/shared/apis/lib";

import { GetSearchMoviesResponse } from "./model";

export const fetchSearchMovies = async ({ query = "" }) => {
  return await safeFetchWithPagination<GetSearchMoviesResponse>({
    url: `/search/movie?language=ko-KO&query=${query}`,
  });
};
