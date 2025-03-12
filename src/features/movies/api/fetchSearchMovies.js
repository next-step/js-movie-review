import { fetchApiWithPagination } from "src/shared/apis/api";

export const fetchSearchMovies = async ({ query = "" }) => {
  try {
    return await fetchApiWithPagination(
      `/search/movie?language=ko-KO&query=${query}`
    );
  } catch (error) {
    return null;
  }
};
