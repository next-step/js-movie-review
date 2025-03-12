import { safeFetchWithPagination } from "src/shared/apis/lib";

export const fetchSearchMovies = async ({ query = "" }) => {
  return await safeFetchWithPagination(
    `/search/movie?language=ko-KO&query=${query}`
  );
};
