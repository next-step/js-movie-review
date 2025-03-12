import { safeFetchWithPagination } from "src/shared/apis/lib";

/**
 * API 제한사항: 페이지는 1부터 시작하며 최대 500까지만 가능합니다.
 * 500을 초과하는 페이지 요청 시 API 에러 발생: "Invalid page: Pages start at 1 and max at 500. They are expected to be an integer."
 */
export const MAX_PAGE = 500;

export const fetchPopularMovies = async () => {
  return await safeFetchWithPagination("/movie/popular?language=ko-KO", {});
};
