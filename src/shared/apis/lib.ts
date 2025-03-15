import { FetchApiOptions, FetchApiWithPaginationOptions } from "./model";
import { fetchApi, fetchApiWithPagination } from "./api";

export const withErrorHandling = async <T>(fn: () => Promise<T>) => {
  try {
    const result = await fn();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }

    alert("알 수 없는 오류가 발생했습니다.");

    throw error;
  }
};

export const safeFetch = async <T>({ url, headers }: FetchApiOptions) => {
  return withErrorHandling(() => fetchApi<T>({ url, headers }));
};

export const safeFetchWithPagination = <T>({
  options = { defaultPage: 1, fn: safeFetch },
  ...rest
}: FetchApiWithPaginationOptions<T>) => {
  return fetchApiWithPagination({ options, ...rest });
};
