import { fetchApi, fetchApiWithPagination } from "./api";

export const withErrorHandling = async (fn) => {
  try {
    const result = await fn();
    return result;
  } catch (error) {
    alert(error.message);
  }
};

export const safeFetch = async (url, headers) => {
  return withErrorHandling(() => fetchApi(url, headers));
};

export const safeFetchWithPagination = async (url, options) => {
  const result = await withErrorHandling(
    async () => await fetchApiWithPagination(url, options)
  );

  const { fetchNextPage, ...rest } = result;

  const safeFetchNextPage = () => withErrorHandling(fetchNextPage);

  return { ...rest, fetchNextPage: safeFetchNextPage };
};
