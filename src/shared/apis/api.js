const defaultHeaders = {
  Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
  "Content-Type": "application/json",
};

export const fetchApi = async (url, headers = defaultHeaders) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_TMDB_API_BASE_URL}${url}`,
      { headers }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchApiWithPagination = async (
  url,
  {
    headers = defaultHeaders,
    defaultPage = 1,
    getItems = (response) => response,
  } = {}
) => {
  let currentPage = defaultPage;
  let totalItems = [];

  const fetchNextPage = async () => {
    const response = await fetchApi(`${url}&page=${currentPage}`, headers);

    currentPage += 1;

    const newItems = getItems(response);
    totalItems = [...totalItems, ...newItems];

    return { data: response, totalItems };
  };

  const { data: initialData } = await fetchNextPage();

  return {
    initialData,
    fetchNextPage,
  };
};

// 단, 페이지 끝에 도달한 경우에는 더보기 버튼을 화면에 출력하지 않는다.
