class CustomFetchError extends Error {
  constructor(errorMessage, status) {
    super("데이터를 불러오는데 실패했습니다.");

    this.errorMessage = errorMessage;
    this.status = status;
  }
}

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
  } catch ({ message, status }) {
    throw new CustomFetchError(message, status);
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
