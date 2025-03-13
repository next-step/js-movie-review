import { safeFetchWithPagination } from "src/shared/apis/lib";

export const fetchSearchMovies = async ({ query = "" }) => {
  return await safeFetchWithPagination({
    url: `/search/movie?language=ko-KO&query=${query}`,
  });
};
