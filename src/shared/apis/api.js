class CustomFetchError extends Error {
  constructor(errorMessage, status) {
    super(errorMessage);
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

    if (!response.ok) {
      throw new CustomFetchError(response.statusText, response.status);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof CustomFetchError) {
      throw error;
    }

    throw new CustomFetchError("알 수 없는 오류가 발생했습니다.", 500);
  }
};

export const fetchApiWithPagination = async (
  url,
  { headers = defaultHeaders, defaultPage = 1 } = {}
) => {
  let currentPage = defaultPage;

  const fetchNextPage = async () => {
    const response = await fetchApi(`${url}&page=${currentPage}`, headers);

    currentPage += 1;

    return { data: response };
  };

  const { data: initialData } = await fetchNextPage();

  return {
    initialData,
    fetchNextPage,
  };
};
